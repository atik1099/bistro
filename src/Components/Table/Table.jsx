import usePaymentHistory from "../../Hook/usePaymentHistory";

const Table = () => {

    //paymentHistory routes
    const [paymentHistory, isLoading, refetch] = usePaymentHistory();
    refetch()
    return (
        <div className="">
            <table className="table-sm  text-center my-5 min-w-max table-auto">
                {/* head */}
                <thead>
                    <tr className="bg-orange-400 text-white">
                        <th>Sl</th>
                        <th>Name</th>
                        <th>Date</th>
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
                            <td>{payment.date}</td>
                            <td>{payment.amount} $</td>
                            <td >{payment.transaction_id}</td>
                            <td className="text-red-600 font-bold">{payment.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>);
};

export default Table;