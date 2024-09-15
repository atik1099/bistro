import {  AiFillInteraction, AiOutlineAlipay, AiOutlineHome, AiOutlineShoppingCart } from "react-icons/ai";
import { FaFirstOrder, FaList, FaMortarPestle, FaUsers } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import useAdmin from "../../Hook/useAdmin";
import useCart from "../../Hook/useCart";

const DashNav = () => {

    //useAdmin and useCart hook
    const [isAdmin] = useAdmin()
    const [cart] = useCart() 

  // admin links
  const adminSidebar = (
    <>
      <button>
        <NavLink to={"admin-home"}>
          <AiOutlineHome className="text-2xl"></AiOutlineHome>Home
        </NavLink>
      </button>
      <button>
        <NavLink to={"add-items"}>
          <FaMortarPestle className="text-2xl"></FaMortarPestle>Add item
        </NavLink>
      </button>
      <button>
        <NavLink to={"manage-items"}>
          <FaList className="text-2xl"></FaList> items
        </NavLink>
      </button>
      <button>
        <NavLink to={"manage-orders"}>
          <FaFirstOrder className="text-2xl"></FaFirstOrder> orders
        </NavLink>
      </button>
      <button>
        <NavLink to={"all-users"}>
          <FaUsers className="text-2xl"></FaUsers> users
        </NavLink>
      </button>
    </>
  );

  //user links
  const userSidebar = (
    <>
      <button>
        <NavLink to={"/dashboard"}>
          <AiOutlineHome className="text-2xl"></AiOutlineHome>Home
        </NavLink>
      </button>
      <button>
        <NavLink to={"cart"}>
          <AiOutlineShoppingCart className="text-2xl"></AiOutlineShoppingCart>
          Cart - {cart.length}
        </NavLink>
      </button>
    
      <button>
        <NavLink to={"payments-history"}>
          <AiOutlineAlipay className="text-2xl"></AiOutlineAlipay> Payment
          
        </NavLink>
      </button>
      <button>
        <NavLink to={"add-review"}>
          <AiFillInteraction className="text-2xl"></AiFillInteraction> Review
        </NavLink>
      </button>
     
    </>
  );

  return <div className="btm-nav z-20 lg:hidden">
    {
        isAdmin ? adminSidebar : userSidebar
    }
    </div>;
};

export default DashNav;
