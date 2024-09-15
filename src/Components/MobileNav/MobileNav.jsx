import {
  AiOutlineHome,
  AiOutlineShop,
  AiOutlineShopping,
  AiTwotoneFolderAdd,
} from "react-icons/ai";
import { NavLink } from "react-router-dom";
import useAuth from "../../Hook/useAuth";
import useAdmin from "../../Hook/useAdmin";
import "./MobileNavCSS/MobileNav.css"
const MobileNav = () => {
  //useAuth and useAdmin hooks
  const { user } = useAuth();
  const [isAdmin] = useAdmin();

  return (
    <div className="btm-nav  z-20 lg:hidden">
      <button>
        <NavLink to={"/"}>
          <AiOutlineHome className="text-2xl"></AiOutlineHome>
          <span className="btm-nav-label">Home</span>
        </NavLink>
      </button>
      <button className="">
        <NavLink to={"/menu"}>
          <AiOutlineShop className="text-2xl"></AiOutlineShop>
          <span className="btm-nav-label">menu</span>
        </NavLink>
      </button>
      <button>
        <NavLink to={"/order/salad"}>
          <AiOutlineShopping className="text-2xl"></AiOutlineShopping>
          <span className="btm-nav-label">Orders</span>
        </NavLink>
      </button>
      {user && isAdmin && (
        <button>
          <NavLink to={"/dashboard/admin-home"}>
            <AiTwotoneFolderAdd className="text-2xl"></AiTwotoneFolderAdd>
            <span className="btm-nav-label">Dashboard</span>
          </NavLink>
        </button>
      )}

      {user && !isAdmin && (
        <button>
        <NavLink to={"/dashboard"}>
          <AiTwotoneFolderAdd className="text-2xl"></AiTwotoneFolderAdd>
          <span className="btm-nav-label">Dashboard</span>
        </NavLink>
      </button>
      )}
    </div>
  );
};

export default MobileNav;
