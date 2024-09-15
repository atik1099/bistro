import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../Firebase/firebase.config";
import usePublicAxios from "../Hook/usePublicAxios";

export const AuthContext = createContext(null);

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  //state
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //axios hook
  const axios = usePublicAxios();

  //create user
  const signUp = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //login user
  const login = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  //logout user
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  //googleLogin
  const googleLogin = () => {
    return signInWithPopup(auth, googleProvider);
  };

  //user unsubscribe by useEffect
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      
      console.log("current user", currentUser);
     
      if (currentUser) {
        const user = { email: currentUser?.email }
        console.log(user);
        axios.post("/jwt",user ).then((res) => {
          console.log(res.data);
          setLoading(false);
        });

      }
     
    });
    return () => unsubscribe();
  }, [axios,user]);

  //object
  const authValue = {
    user,
    loading,
    signUp,
    login,
    logOut,
    googleLogin,
  };
  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
