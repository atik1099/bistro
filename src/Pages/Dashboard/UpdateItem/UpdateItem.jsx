import { FaMortarPestle } from "react-icons/fa";
import Heading from "../../../Components/Heading/Heading";
import toast from "react-hot-toast";
import axios from "axios";
import useAxios from "../../../Hook/useAxios";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";



const image_hosting_key = import.meta.env.VITE_IMG_HOSTING_KEY
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateItem = () => {

  //useAxios hook
  const axiosSecure = useAxios();
  //navigate
  const navigate = useNavigate();

  //useLoader data
  const item = useLoaderData()
 

  const { register, handleSubmit, reset } = useForm();
  const onSubmit = async (data) => {
    console.log(data);
    const imageFile = { image: data.image[0] };
    //image upload to imgbb and get url
    const res = await axios.post(image_hosting_api, imageFile, {
      headers: { "content-Type": "multipart/form-data" },
    });

    console.log(res.data);
    if (res.data.success) {
      const image = res.data.data.display_url;
      const menu = {
        name: data.name,
        recipe: data.recipe,
        image,
        category: data.category,
        price: parseFloat(data.price),
      }; 

      const result = await axiosSecure.patch(`menus/${item._id}`, menu);
      console.log(result.data);
      if (result.data.modifiedCount>0) {
        navigate("/dashboard/manage-items");
        reset();
        toast.success("menu updated successfully");
      }
    }
  };

  return (
    <div>
      <Heading subHeading="What A New" Heading="Update An Item"></Heading>
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
          <div className="form-control">
            <label className="label">
              <span className="label-text">
                Recipe name <span className="text-red-600">*</span>
              </span>
            </label>
            <input
              {...register("name")}
              type="text"
              defaultValue={item?.name || ""}
              placeholder="name"
              className="input input-bordered"
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="form-control">
              <label className="label">
                <span className="label-text">
                  Category <span className="text-red-600">*</span>
                </span>
              </label>
              <select
                {...register("category")}
                defaultValue={item?.category || "default"}
                className="select select-bordered w-full"
              >
                <option disabled value="default">
                  Select Category
                </option>
                <option value="salad">Salad</option>
                <option value="soup">Soup</option>
                <option value="pizza">Pizza </option>
                <option value="dessert">Dessert </option>
                <option value="drinks">Drinks</option>
              </select>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">
                  Recipe Price <span className="text-red-600">*</span>
                </span>
              </label>
              <input
                {...register("price")}
                type="text"
                defaultValue={ item?.price || 0}
                placeholder="price"
                className="input input-bordered"
                required
              />
            </div>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">
                Recipe Details <span className="text-red-600">*</span>
              </span>
            </label>
            <textarea
              className="textarea textarea-bordered"
              {...register("recipe")}
              defaultValue={item?.recipe || ''}
              placeholder="Details"
              rows={5}
            ></textarea>
          </div>

          <div>
            <label className="label">
              <span className="label-text">
                Recipe Photo <span className="text-red-600">*</span>
              </span>
            </label>
            <input
              {...register("image")}
              type="file"
              className="file-input file-input-ghost w-full max-w-xs"
            />
          </div>

          <div className="text-center">
            <button className="btn btn-outline w-72">
              Update Items <FaMortarPestle></FaMortarPestle>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateItem;
