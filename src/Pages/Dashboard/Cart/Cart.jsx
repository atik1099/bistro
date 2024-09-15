import { AiOutlineDelete } from "react-icons/ai";
import Heading from "../../../Components/Heading/Heading";
import useCart from "../../../Hook/useCart";
import useAxios from "../../../Hook/useAxios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const Cart = () => {
  //useCart hook
  const [carts, isLoading, refetch] = useCart();
  const total = carts.reduce((a, b) => a + b.price, 0).toFixed(2) ;

  //useAxios hook
  const axios = useAxios();


  //loading
  if (isLoading) {
    return (
      <p className="flex justify-center items-center min-h-screen">
        <span className="loading loading-infinity loading-lg"></span>
      </p>
    );
  }

  //handlelete functionality
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this item!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`/carts/${id}`).then((result) => {
          if (result?.data?.deletedCount > 0) {
            console.log(result);
            Swal.fire({
              title: "Deleted!",
              text: "Your item has been deleted.",
              icon: "success",
              timer: 1200,
            });
            refetch();
          }
        });
      }
    });
  };
  refetch()
  return (
    <div className="space-y-5">
      <Heading subHeading="My cart" Heading="Wanna Add More"></Heading>
      <div className="flex justify-around  items-center">
        <h2 className="text-xl font-bold">Total Order: {carts.length}</h2>
        <h2 className="text-xl font-bold">Total Price: {total} $</h2>
        {total >0  && (
          <Link to={"/dashboard/payments"}>
            <button className="btn lg:w-32 btn-outline text-white bg-[#D1A054]">
              Pay
            </button>
          </Link>
        )}
      </div>

      <div className="overflow-x-auto lg:px-5 ">
        <table className="table min-w-max table-auto text-center">
          {/* head */}
          <thead className="bg-[#D1A054]  text-white">
            <tr>
              <th>Sl</th>
              <th>Item Image</th>
              <th>Item Name</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {carts?.map((item, index) => (
              <tr className="" key={item._id}>
                <th>{index + 1}</th>
                <td className="flex justify-center">
                  <img
                    className="w-12 h-12 rounded-lg object-cover"
                    src={item.imageUrl}
                    alt={`${item.name} image`}
                  />
                </td>
                <td>{item.name}</td>
                <td>{item.price} $</td>
                <td>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="btn-sm rounded-lg text-white bg-red-600 btn-outline"
                  >
                    <AiOutlineDelete className="text-xl"></AiOutlineDelete>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Cart;
