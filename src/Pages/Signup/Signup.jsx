import { AiOutlineFacebook, AiOutlineGoogle } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import loginImg from "../../assets/others/authentication1.png";
import toast from "react-hot-toast";
import { updateProfile } from "firebase/auth";
import useAuth from "../../Hook/useAuth";
import usePublicAxios from "../../Hook/usePublicAxios";

const Signup = () => {
  //useContext
  const { signUp, googleLogin } = useAuth();

  //useAxios hook
  const axios = usePublicAxios();

  //navigate
  const navigate = useNavigate();
  //location
  const location = useLocation();

  let from = location?.state?.from?.pathname || "/";

  //handle submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const toastId = toast.loading("sign up ...");
    const forms = e.target;
    const email = forms.email.value;
    const name = forms.name.value;
    const photo = forms.photo.value;
    const password = forms.password.value;

    //console.log(email, name, photo, password);
    //signup functionality
    signUp(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        forms.reset();
        //updateprofile
        updateProfile(user, {
          displayName: name,
          photoURL: photo,
        });

        //send to database user information
        const dataUser = {
          name: name,
          email: email,
          photo: photo,
          logged: user?.metadata?.lastSignInTime,
        };

        //api call
        axios.post("/users", dataUser).then((result) => {
          console.log(result.data);
        });

        toast.success("signed up", { id: toastId });
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message.slice(10, error.message.length), {
          id: toastId,
        });
      });
  };

  //social login
  const handleMedia = (media) => {
    const toastId = toast.loading("sign up ...");
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

          toast.success("signed up", { id: toastId });
          navigate(from, { replace: true });
        });

        //api call
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

  return (
    <div>
      <div className="mx-5 lg:mx-0">
        <div className="flex justify-center rounded-lg items-center bg-base-50 max-w-6xl mx-auto m-10 shadow-xl ">
          <div className="hero-content flex-col lg:flex-row p-5">
            <div className="flex-1">
              <img src={loginImg} className="w-full h-full" alt="" />
            </div>
            <div className="w-full flex-1">
              <form className="card-body" onSubmit={handleSubmit}>
                <h1 className="text-4xl font-bold text-center border-y-2 py-2">
                  Sign Up!
                </h1>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="name"
                    className="input input-bordered"
                    required
                    name="name"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Photo URL</span>
                  </label>
                  <input
                    type="text"
                    placeholder="imgbb/tanvir.jpg"
                    className="input input-bordered"
                    required
                    name="photo"
                  />
                </div>
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
                </div>

                <div className="form-control mt-6">
                  <button className="btn btn-outline bg-[#D1A054] text-white">
                    Signup
                  </button>
                </div>
              </form>

              <div className=" text-center -mt-3 space-y-2">
                <Link
                  to={"/login"}
                  className="text-[#D1A054]  font-bold text-center mb-2"
                >
                  Already have any account? Login
                </Link>
                <p className="text-gray-700 font-semibold text-md text-center">
                  Or sign up with
                </p>
                <div className="flex justify-center items-center gap-5 text-3xl">
                  <button className="p-2 bg-blue-100 rounded-full">
                    <AiOutlineFacebook></AiOutlineFacebook>
                  </button>
                  <button
                    onClick={() => handleMedia(googleLogin)}
                    className="p-2 bg-blue-100 rounded-full"
                  >
                    <AiOutlineGoogle></AiOutlineGoogle>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
