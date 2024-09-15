import Heading from "../../../Components/Heading/Heading";
import usePaymentHistory from "../../../Hook/usePaymentHistory";

const PaymentHistory = () => {
  //paymentHistory routes
  const [paymentHistory, , refetch] = usePaymentHistory();
  refetch();
  return (
    <div>
      <Heading subHeading="At a glance" Heading="Payment history"></Heading>
      <h2 className="text-3xl font-semibold">
        Total Payments : {paymentHistory.length}
      </h2>

      <div className="overflow-x-auto">
        <table className="table table-auto min-w-max text-center my-5">
          {/* head */}
          <thead>
            <tr className="bg-orange-400">
              <th>Sl</th>
              <th>Name</th>
              <th>email</th>
              <th>Date</th>
              <th>Items</th>
              <th>Amount</th>
              <th>T_ID</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {paymentHistory.map((payment, index) => (
              <tr key={payment._id}>
                <th>{index + 1}</th>
                <td>{payment.name}</td>
                <td>{payment.email}</td>
                <td>{payment.date}</td>
                <td>{payment.menuNames.join(" , ")}</td>
                <td>{payment.amount} $</td>
                <td>{payment.transaction_id}</td>
                <td>
                 
                  <button
                    className={ ` btn btn-sm font-bold text-white ${
                      payment.status === "pending"
                        ? "bg-red-600"
                        : "bg-green-500"
                    }`}
                  >
                    {payment.status}
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

export default PaymentHistory;
