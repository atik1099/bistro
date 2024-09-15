
import { Link } from "react-router-dom";
import MenuCard from "../../../Components/menuCard/menuCard";

const FeaturedMenu = ({menus}) => {
 

  //filtered featured menu
  const featuredMenu = menus.filter((menu) => menu.category === "popular");

  return (
    <div>
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 my-16">
        {featuredMenu?.map((menu) => (
          <MenuCard key={menu._id} menu={menu}></MenuCard>
        ))}
      </div>

      <div className="text-center">
        <Link to={"/order/salad"} className="btn btn-outline w-[30%]  border-0 border-b-4">
          Order now
        </Link>
      </div>
    </div>
  );
};

export default FeaturedMenu;
