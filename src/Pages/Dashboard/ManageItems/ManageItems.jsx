import Heading from "../../../Components/Heading/Heading";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import useMenu from "../../../Hook/useMenu";
import Swal from "sweetalert2";
import useAxios from "../../../Hook/useAxios";
import { Link } from "react-router-dom";

const ManageItems = () => {
  //useMenus and useAxios hook
  const [menus, isLoading, refetch] = useMenu();
  const axios = useAxios()

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
      text: "You won't be able to revert this menu!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`/menus/${id}`).then((result) => {
          if (result?.data?.deletedCount > 0) {
            console.log(result);
            Swal.fire({
              title: "Deleted!",
              text: "Your user has been deleted.",
              icon: "success",
              timer: 1200,
            });
            refetch();
          }
        });
      }
    });
  };

  return (
    <div>
      <Heading subHeading="Hurry Up" Heading="Manage Items"></Heading>
      <div className="overflow-x-auto">
        <table className="table table-auto min-w-max text-center">
          {/* head */}
          <thead >
            <tr className="bg-orange-400">
              <th>SL</th>
              <th>Image</th>
              <th>Item</th>
              <th>Price</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {menus?.map((menu, index) => (
              <tr className="" key={menu._id}>
                <th>{index + 1}</th>
                <td className="flex justify-center">
                  <img
                    className="w-12 rounded-full"
                    src={menu?.image}
                    alt={`${menu?.name} image`}
                  />
                </td>
                <td>{menu.name}</td>
                <td>{menu.price}</td>

                <td>
                  <Link to={`/dashboard/update-items/${menu._id}`}
                  className="btn btn-outline bg-green-600 text-white">
                    <AiOutlineEdit></AiOutlineEdit>
                  </Link>
                </td>
                <td>
                  <button
                    onClick={()=>handleDelete(menu._id)}
                    className="btn btn-outline bg-red-600 text-white"
                  >
                    <AiOutlineDelete></AiOutlineDelete>
                  </button>
                </td>
              </tr>
            ))}
            {/* row 2 */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageItems;
