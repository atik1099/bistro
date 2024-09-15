import { Link } from "react-router-dom";
import Hero from "../../../Components/Hero/Hero";
import MenuCard from "../../../Components/menuCard/menuCard";

const MenuCategory = ({ img, item, subTitle, title }) => {
  return (
    <div>
      <Hero img={img} title={title} subTitle={subTitle}></Hero>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 my-16">
        {item.slice(0, 6)?.map((item) => (
          <MenuCard key={item._id} menu={item}></MenuCard>
        ))}
      </div>
      <div className="text-center my-16">
        <Link to={`/order/${title}`} className="btn btn-outline w-[30%]  border-0 border-b-4">
          Order now
        </Link>
      </div>
    </div>
  );
};

export default MenuCategory;
