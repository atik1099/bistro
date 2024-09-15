import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import MobileNav from "../Components/MobileNav/MobileNav";


const Main = () => {

    //location 
    const location = useLocation()
    
    const noHeaderFooter = location.pathname.includes("login") || location.pathname.includes("signup")

    return (
        <div>
            {noHeaderFooter || <Navbar></Navbar>}
            {noHeaderFooter || <MobileNav></MobileNav>}
            <Outlet></Outlet>
            {noHeaderFooter || <Footer></Footer>}
        </div>
    );
};

export default Main;