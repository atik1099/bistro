import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";


const instance = axios.create({
  baseURL: "https://bistro-boss-server-seven-lake.vercel.app/api/v1",
  withCredentials: true,
});


const useAxios = () => {
  //logout from useAuth
  const { logOut } = useAuth();
  //navigate
  const navigate = useNavigate();

  //axios instance response for 401 || 403
  instance.interceptors.response.use(
    function (response) {
      return response;
    },
    async (error) => {
      const status = error.response?.status;
      if (status === 401 || status === 403) {
        try {
          // Log out logic
          await logOut();
          // Redirecting to login page after logout
          navigate("/login");
        } catch (logoutError) {
          console.error("Error during logout:", logoutError);
        }
      }
      return Promise.reject(error);
    }
  );

  return instance;
};


export default useAxios;
