import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Menu from "../Pages/Menu/Menu";
import Order from "../Pages/Order/Order";
import Login from "../Pages/Login/Login";
import Signup from "../Pages/Signup/Signup";
import Dashboard from "../Layout/Dashboard";
import UserHome from "../Pages/Dashboard/UserHome/UserHome";
import Cart from "../Pages/Dashboard/Cart/Cart";
import AllUsers from "../Pages/Dashboard/AllUsers/AllUsers";
import ManageItems from "../Pages/Dashboard/ManageItems/ManageItems";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import AddItems from "../Pages/Dashboard/AddItems/AddItems";
import Payments from "../Pages/Dashboard/Payments/Payments";
import UpdateItem from "../Pages/Dashboard/UpdateItem/UpdateItem";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory/PaymentHistory";
import ManageOrders from "../Pages/Dashboard/ManageOrders/ManageOrders";
import AdminHome from "../Pages/Dashboard/AdminHome/AdminHome";
import UserReview from "../Pages/Dashboard/userReview/userReview";

const myCreatedRoute = createBrowserRouter([
    {
        path:"/",
        element:<Main></Main>,
        children:[
            {
                path:"/",
                element:<Home></Home>
            },
            {
                path:"/menu",
                element:<Menu></Menu>
            },
            {
                path:"/order/:category",
                element:<Order></Order>
            },
            {
                path:"/login",
                element:<Login></Login>
            },
            {
                path:"/signup",
                element:<Signup></Signup>
            },
        ]
    },
    {
        path:"dashboard",
        element:<PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children:[

            //user route
            {
                path:"/dashboard",
                element:<UserHome></UserHome>
            },
            {
                path:"cart",
                element:<Cart></Cart>
            },
            {
                path:"payments",
                element:<Payments></Payments>
            },
            {
                path:"payments-history",
                element:<PaymentHistory></PaymentHistory>
            },
            {
                path:"add-review",
                element:<UserReview></UserReview>
            },

            //admin router
            {
                path:"admin-home",
                element:<AdminRoute><AdminHome></AdminHome></AdminRoute>
            },
            {
                path:"all-users",
                element:<AdminRoute><AllUsers></AllUsers></AdminRoute>
            },
            {
                path:"add-items",
                element:<AdminRoute><AddItems></AddItems></AdminRoute>
            },
            {
                path:"update-items/:id",
                element:<AdminRoute><UpdateItem></UpdateItem></AdminRoute>,
                loader:({params})=> fetch(`https://bistro-boss-server-seven-lake.vercel.app/api/v1/menus/${params.id}`)
            },
            {
                path:"manage-items",
                element:<AdminRoute><ManageItems></ManageItems></AdminRoute>
            },
            {
                path:"manage-orders",
                element:<AdminRoute><ManageOrders></ManageOrders></AdminRoute>
            },
        ]
    }
])

export default myCreatedRoute;