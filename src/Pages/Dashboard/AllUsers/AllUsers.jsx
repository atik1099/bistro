import { FaUserAlt } from "react-icons/fa";
import Heading from "../../../Components/Heading/Heading";
import useUsers from "../../../Hook/useUsers";
import { AiOutlineDelete } from "react-icons/ai";
import useAxios from "../../../Hook/useAxios";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const AllUsers = () => {
  //useUsers hook
  const [users, isLoading, refetch] = useUsers();

  //axios hook
  const axios = useAxios();

  //loading
  if (isLoading) {
    return (
      <p className="flex justify-center items-center min-h-screen">
        <span className="loading loading-infinity loading-lg"></span>
      </p>
    );
  }

  //handleAdmin
  const handleAdmin = (email) => {
    axios.patch(`/users/${email}`, { role: "Admin" }).then((res) => {
      if (res.data?.modifiedCount > 0) {
        toast.success("User has been made admin");
        refetch();
      }
    });
  };

  //handlelete functionality
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this user!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`/users/${id}`)
        .then((result) => {
          if (result?.data?.deletedCount>0) {
            console.log(result);
            Swal.fire({
              title: "Deleted!",
              text: "Your user has been deleted.",
              icon: "success",
              timer: 1200,
            });
            refetch();
          }
        })
      }
    });
  };


  return (
    <div className="space-y-5">
      <Heading subHeading="All users" Heading="Manage Users"></Heading>
      <h1 className="text-3xl font-bold">Total Users : {users.length}</h1>
      <div className="overflow-x-auto">
        <table className="table table-auto min-w-max text-center">
          {/* head */}
          <thead>
            <tr className="bg-orange-400">
              <th>SL</th>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Last Logged</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {users?.map((user, index) => (
              <tr className="" key={user._id}>
                <th>{index + 1}</th>
                <td className="flex justify-center">
                  <img
                    className="w-12 rounded-full"
                    src={user?.photo}
                    alt={`${user?.name} image`}
                  />
                </td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user?.logged}</td>
                <td>
                  <button
                    onClick={() => handleAdmin(user?.email)}
                    className="btn btn-outline bg-orange-500 text-white"
                  >
                    {user.role === "Admin" ? (
                      <>{user.role}</>
                    ) : (
                      <>
                        <FaUserAlt></FaUserAlt>
                      </>
                    )}
                  </button>
                </td>
                <td>
                  <button
                    onClick={() =>handleDelete(user?._id)}
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

export default AllUsers;
