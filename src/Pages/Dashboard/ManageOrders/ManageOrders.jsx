import toast from "react-hot-toast";
import useAxios from "../../../Hook/useAxios";
import useOrders from "../../../Hook/useOrders";
import Heading from "../../../Components/Heading/Heading";

const ManageOrders = () => {
  //useOrders hook and useAxios hook
  const [Orders, , refetch] = useOrders();
  const axios = useAxios();
  //update user order status form admin
  const handleUpdateStatus = async (id) => {
    const result = await axios.patch(`/payments/${id}`, { status: "accepted" });
    console.log(result);
    if (result.data.modifiedCount > 0) {
      toast.success("order accepted successfully");
      refetch();
    }
  };

  return (
    <div>
      <Heading subHeading="Bistro Boss" Heading="Manage Orders"></Heading>
      <h2 className="text-3xl font-semibold">
        Total Payments : {Orders.length}
      </h2>
      <div className="overflow-x-auto">
        <table className="table table-auto min-w-max text-center">
          {/* head */}
          <thead>
            <tr className="bg-orange-400">
              <th>Sl</th>
              <th>Name</th>
              <th>email</th>
              <th>Date</th>
              <th>Items</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {Orders.map((order, index) => (
              <tr key={order._id}>
                <th>{index + 1}</th>
                <td>{order.name}</td>
                <td>{order.email}</td>
                <td>{order.date}</td>
                <td>{order.menuNames.join(",")}</td>
                <td>{order.amount} $</td>
                <td>
                  <button
                    onClick={() => handleUpdateStatus(order._id)}
                    className={`btn btn-sm  text-white ${order.status === 'pending' ? 'bg-red-600' : 'bg-green-500'}`}
                  >
                    {order.status}
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

export default ManageOrders;
