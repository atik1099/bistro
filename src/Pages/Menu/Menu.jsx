import Heading from "../../Components/Heading/Heading";
import Hero from "../../Components/Hero/Hero";
import MenuCard from "../../Components/menuCard/menuCard";
import useMenu from "../../Hook/useMenu";
import menuBgImg from "../../assets/menu/banner3.jpg";
import pizzaimg from "../../assets/menu/pizza-bg.jpg";
import saladImg from "../../assets/menu/salad-bg.jpg";
import soupImg from "../../assets/menu/soup-bg.jpg";
import dessertImg from "../../assets/menu/dessert-bg.jpeg";
import MenuCategory from "./MenuCategory/MenuCategory";

const Menu = () => {
  //get all menu from custom hooks
  const [menus, isLoading,] = useMenu();
  

  //filtered featured menu
  const offered = menus.filter((menu) => menu.category === "offered");
  const pizza = menus.filter((menu) => menu.category === "pizza");
  const salad = menus.filter((menu) => menu.category === "salad");
  const soup = menus.filter((menu) => menu.category === "soup");
  const dessert = menus.filter((menu) => menu.category === "dessert");

  //loading
  if (isLoading) {
    return (
      <p className="flex justify-center items-center min-h-screen">
        <span className="loading loading-infinity loading-lg"></span>
      </p>
    );
  }

  return (
    <div>
      <Hero
        img={menuBgImg}
        title="Our Menu"
        subTitle="Would you like to try a dish?"
      ></Hero>
      <div
        className="container mx-auto px-5 lg:px-0 
      "
      >
        <Heading subHeading="Don't miss" Heading="Today's Offer"></Heading>

        {/* today's offered section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 my-16">
          {offered?.map((item) => (
            <MenuCard key={item._id} menu={item}></MenuCard>
          ))}
        </div>

        {/* dessert section */}
        <MenuCategory
          img={dessertImg}
          title="dessert"
          subTitle="Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
          item={dessert}
        ></MenuCategory>

        {/* pizza section */}
        <MenuCategory
          img={pizzaimg}
          title="pizza"
          subTitle="Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
          item={pizza}
        ></MenuCategory>

        {/* salad section */}
        <MenuCategory
          img={saladImg}
          title="salad"
          subTitle="Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
          item={salad}
        ></MenuCategory>

        {/* soup section */}
        <MenuCategory
          img={soupImg}
          title="soup"
          subTitle="Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
          item={soup}
        ></MenuCategory>
      </div>
    </div>
  );
};

export default Menu;
