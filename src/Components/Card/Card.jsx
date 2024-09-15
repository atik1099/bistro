import Swal from "sweetalert2";
import useAuth from "../../Hook/useAuth";
import { useNavigate } from "react-router-dom";
import useAxios from "../../Hook/useAxios";
import toast from "react-hot-toast";
import useCart from "../../Hook/useCart";

const Card = ({ item }) => {
  //user
  const { user } = useAuth();

  //axios hook
  const axios = useAxios();

  //useCart hook
  const [,,refetch] = useCart()

  //navigate
  const navigate = useNavigate();

  //handleAddToCart
  const handleAddToCart = () => {
    if (!user || !user?.email) {
      Swal.fire({
        title: "Please Login",
        text: "You are not a logged in user!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
    }

    if (user && user?.email) {
      const cartItem = {
        email: user?.email,
        menuId: item._id,
        name: item.name,
        price: item.price,
        imageUrl: item.image,
        recipe: item.recipe,
      };

      axios.post("/carts", cartItem).then((data) => {
        if (data?.data?.insertedId) {
          toast.success("item added into cart");
          refetch()
        }
      });
    }
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <figure>
        <img
          src={item.image}
          alt={`${item.name} image`}
          className="rounded-sm w-full object-cover"
        />
      </figure>
      <p className="bg-black text-white absolute right-2 mt-5 px-5 text-center rounded-lg">
        {" "}
        $ : {item.price}
      </p>
      <div className="card-body">
        <h2 className="card-title">{item.name}</h2>
        <p>{item.recipe}</p>
        <div className="card-actions justify-center">
          <button
            onClick={handleAddToCart}
            className="btn btn-outline uppercase font-bold border-yellow-500"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
