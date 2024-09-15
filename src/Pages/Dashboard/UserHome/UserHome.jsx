import { useState } from "react";
import useAuth from "../../../Hook/useAuth";
import useAxios from "../../../Hook/useAxios";
import usePaymentHistory from "../../../Hook/usePaymentHistory";

const UserHome = () => {
    //state
    const [reviewCount, setReviewCount] = useState(0)
    // hooks 
    const { user } = useAuth()
    const [paymentHistory] = usePaymentHistory()
    const axios = useAxios()
    //total payment
    const total = paymentHistory.reduce((prev, item) => prev + item.amount, 0)


    //review count
    axios.get(`reviews/${user?.email}`)
        .then(result => {
            setReviewCount(result.data.length)
        })
    return (
        <div className="my-16">
            <h2 className="text-xl ">
                Hi! Welcome {''}
                <span className="text-green-500 font-bold">{user?.displayName}. </span>
            </h2>
            <div className="stats w-full my-3 stats-vertical lg:stats-horizontal shadow-md py-5">

                <div className="stat space-y-2">
                    <div className="stat-title font-bold">Completed Orders</div>
                    <div className="stat-value text-yellow-500">{paymentHistory.length} order</div>
                </div>


                <div className="stat space-y-2">
                    <div className="stat-title font-bold">Total Payment</div>
                    <div className="stat-value text-green-500">{total} $</div>
                </div>

                <div className="stat space-y-2">
                    <div className="stat-title font-bold">Reviews</div>
                    <div className="stat-value text-orange-400">{reviewCount} review</div>
                </div>

            </div>

            <div className="max-w-lg mx-auto mt-5 h-74 rounded-lg space-y-4 p-5 bg-orange-400">
                <h2 className="text-xl font-semibold text-white text-center">{user?.displayName}</h2>
                <div className="avatar flex justify-center">
                    <div className="w-32 mask mask-hexagon">
                        <img src={user?.photoURL} />
                    </div>
                </div>
                <p className="text-white font-bold text-center ">Your last orders :</p>
                <p className="text-green-500 font-bold text-center  bg-white  px-2 py-1 rounded-lg"> {paymentHistory[0]?.date || 'nothing'}</p>

            </div>
        </div>
    );
};

export default UserHome;