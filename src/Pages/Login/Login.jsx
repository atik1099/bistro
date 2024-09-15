
import { Link, useLocation, useNavigate } from "react-router-dom";
import loginImg from "../../assets/others/authentication1.png";
import { AiOutlineFacebook, AiOutlineGoogle } from "react-icons/ai";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import toast from "react-hot-toast";
import useAuth from "../../Hook/useAuth";
import { useEffect, useState } from "react";
import usePublicAxios from "../../Hook/usePublicAxios";

const Login = () => {
  //state
  const [disable, setDisable] = useState(true);

  //useContext
  const { login,googleLogin } = useAuth();

  //useAxios hook
  const axios = usePublicAxios();

  //navigate
  const navigate = useNavigate();

  //location
  const location = useLocation()

  let from = location?.state?.from?.pathname || "/"

  const handleSubmit = (e) => {
    e.preventDefault();

    const toastId = toast.loading("logging in ....");
    const forms = e.target;
    const email = forms.email.value;
    const password = forms.password.value;
    //console.log(email, password);

    //login functionality
    login(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        forms.reset();
        toast.success("logged in", { id: toastId });

        //send last logged time into database
        //send to database user information
        const dataUser = {
          logged: user?.metadata?.lastSignInTime,
        };

        //api call
        axios.patch(`/users/${user?.email}`, dataUser).then((result) => {
          console.log(result.data);
        });

        navigate(from,{replace:true});
      })
      .catch((error) => {
        toast.error(error.message.slice(10, error.message.length), {
          id: toastId,
        });
      });
  };

  //social signin
  //social login
  const handleMedia = (media) => {
    const toastId = toast.loading("sign in ...");
    media()
      .then((result) => {
        const user = result.user;

        //send to database user information
        const dataUser = {
          name: user?.displayName,
          email: user?.email,
          photo: user?.photoURL,
          logged: user?.metadata?.lastSignInTime,
        };

        //api call
        axios.post("/users", dataUser).then((result) => {
          console.log(result.data);

          toast.success("signed in", { id: toastId });
          navigate("/");
        });

        //api fro update call
        axios.patch(`/users/${user?.email}`, dataUser).then((result) => {
          console.log(result.data);
        });
      })

      .catch((error) => {
        toast.error(error.message.slice(10, error.message.length), {
          id: toastId,
        });
      });
  };

  //useEffeect for captcha
  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  //captcha check
  const handleCheckCaptcha = (e) => {
    const user_captcha_value = e.target.value;
    if (validateCaptcha(user_captcha_value)) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  };

  return (
    <div className="mx-5 lg:mx-0">
      <div className="flex justify-center rounded-lg items-center bg-base-50 max-w-6xl mx-auto m-10 shadow-xl ">
        <div className="hero-content flex-col lg:flex-row p-5">
          <div className="flex-1">
            <img src={loginImg} className="w-full h-full" alt="" />
          </div>
          <div className="w-full flex-1">
            <form className="card-body" onSubmit={handleSubmit}>
              <h1 className="text-4xl font-bold text-center border-y-2 py-2">
                Login now!
              </h1>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                  name="email"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                  name="password"
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control">
                <label className="label">
                  <LoadCanvasTemplate />
                </label>
                <input
                  onBlur={handleCheckCaptcha}
                  type="text"
                  placeholder="write above text"
                  className="input input-bordered"
                  required
                  name="captcha"
                />
              </div>
              <div className="form-control mt-6">
                <button
                  disabled={disable}
                  className="btn btn-outline bg-[#D1A054] text-white"
                >
                  Login
                </button>
              </div>
            </form>

            <div className=" text-center -mt-3 space-y-2">
              <Link
                to={"/signup"}
                className="text-[#D1A054]  font-bold text-center mb-2"
              >
                New here? Create a New Account
              </Link>
              <p className="text-gray-700 font-semibold text-md text-center">
                Or sign in with
              </p>
              <div className="flex justify-center items-center gap-5 text-3xl">
                <button className="p-2 bg-blue-100 rounded-full">
                  <AiOutlineFacebook></AiOutlineFacebook>
                </button>
                <button onClick={()=> handleMedia(googleLogin)} className="p-2 bg-blue-100 rounded-full">
                  <AiOutlineGoogle></AiOutlineGoogle>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
