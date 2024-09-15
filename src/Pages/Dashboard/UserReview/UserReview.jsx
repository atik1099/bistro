import { useForm } from "react-hook-form";
import { FaMortarPestle } from "react-icons/fa";
import useAxios from "../../../Hook/useAxios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import useAuth from "../../../Hook/useAuth";

const UserReview = () => {
  const { register, handleSubmit, reset } = useForm();
  //useAuth hook
  const {user} = useAuth()

  //navigate
  const navigate = useNavigate()
  //axiosSecure
  const axios = useAxios();

  const onSubmit = async (data) => {
    //console.log(data.name);
    const review = {
      name: user?.displayName,
      email: user?.email,
      date : moment().format('MMMM Do YYYY'),
      rating: parseInt(data.rating),
      details: data.details,
    };

    const result = await axios.post("/reviews", review);
    console.log(result.data);
    if (result.data?.insertedId) {
      toast.success("reviews  added successfully");
      reset();
      navigate("/")
    }
  };
  return (
    <div className="my-16">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
        <div className="form-control">
          <label className="label">
            <span className="label-text">
              Your name <span className="text-red-600">*</span>
            </span>
          </label>
          <input
            {...register("name")}
            type="text"
            disabled
            placeholder="name"
            defaultValue={user?.displayName || ""}
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">
              Your email <span className="text-red-600">*</span>
            </span>
          </label>
          <input
            {...register("email")}
            type="email"
            disabled
            placeholder="email"
            defaultValue={user?.email || ""}
            className="input input-bordered"
            required
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">
              Your rating <span className="text-red-600">*</span>
            </span>
          </label>
          <select
            {...register("rating")}
            defaultValue={"default"}
            className="select select-bordered w-full"
          >
            <option disabled value="default">
              Select rating
            </option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3 </option>
            <option value="4">4 </option>
            <option value="5">5</option>
          </select>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">
              Your feedback <span className="text-red-600">*</span>
            </span>
          </label>
          <textarea
            className="textarea textarea-bordered"
            {...register("details")}
            placeholder="Details"
            rows={5}
          ></textarea>
        </div>

        <div className="text-center">
          <button className="btn btn-outline w-72">
            Add Review <FaMortarPestle></FaMortarPestle>
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserReview;
