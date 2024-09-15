import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./Css/Navbar.css";
import toast from "react-hot-toast";
import useCart from "../../Hook/useCart";
import { AiOutlineShoppingCart } from "react-icons/ai";
import useAuth from "../../Hook/useAuth";
import useAdmin from "../../Hook/useAdmin";

const Navbar = () => {
  //useAuth and useAdmin hooks
  const { user, logOut } = useAuth();
  const [isAdmin] = useAdmin();

  //useCart hook
  const [carts] = useCart();

  //handleLogOut
  const handleLogOut = () => {
    logOut().then((res) => {
      console.log(res);
      toast.success("logout Successfull");
    });
  };
  //links
  const links = (
    <>
      <li>
        <NavLink to={"/"}>Home</NavLink>
      </li>

      <li>
        <NavLink to={"/menu"}>Menus</NavLink>
      </li>
      <li>
        <NavLink to={"/order/salad"}>Order</NavLink>
      </li>

      {user && isAdmin && (
        <li>
          <NavLink to={"/dashboard/admin-home"}>Dashboard</NavLink>
        </li>
      )}

      {user && !isAdmin && (
        <li>
          <NavLink to={"/dashboard"}>Dashboard</NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="navbar fixed z-20 bg-black bg-opacity-70 justify-between items-center lg:px-10">
      <div className="">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost text-white lg:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {links}
          </ul>
        </div>
        
        <Link to={"/"}>
          <img src={logo} alt="logo" className="w-14" />
        </Link>
      </div>
      <div className=" hidden lg:flex">
        <ul className="menu menu-horizontal space-x-5 px-1">{links}</ul>
      </div>
      <div className="">
        {user ? (
          <div className="flex justify-center items-center gap-5">
            {user && !isAdmin && (
              <NavLink to={"dashboard/cart"}>
                <div className="text-md flex justify-center items-center  btn-sm btn">
                  <AiOutlineShoppingCart></AiOutlineShoppingCart>-
                  <p>{carts.length}</p>
                </div>
              </NavLink>
            )}

            <img
              className="w-12 rounded-full"
              src={user?.photoURL}
              alt={`${user?.displayName} image`}
            />
            <Link
              to={"/"}
              onClick={handleLogOut}
              className="btn btn-outline text-white"
            >
              Logout
            </Link>
          </div>
        ) : (
          <Link to={"/login"} className="btn btn-outline text-white">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
