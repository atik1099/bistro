import { loadStripe } from "@stripe/stripe-js";
import Heading from "../../../Components/Heading/Heading";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "./CheckOutForm";
import useCart from "../../../Hook/useCart";

//stripe key
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_KEY)

const Payments = () => {
  //useCart hook
  const [cart] = useCart()
  //toatal price
  const totalPrice = cart.reduce((prev,item)=> prev+item.price,0)
  return (
    <div>
        <Heading subHeading="Pay first to eat" Heading="Payment"></Heading>
        <div className="flex items-center justify-between max-w-5xl mx-auto my-5">
          <h2 className="text-2xl font-bold">You will pay:</h2>
          <p className="text-lg font-semibold">Price : ${totalPrice}</p>
        </div>
        <div className="max-w-5xl mx-auto bg-green-200 p-10 rounded-lg shadow-lg">
            <Elements stripe={stripePromise}>
              <CheckOutForm></CheckOutForm>
            </Elements>
        </div>
    </div>
  );
};

export default Payments;