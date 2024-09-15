import { useState } from "react";
import Hero from "../../Components/Hero/Hero";
import OrderImg from "../../assets/shop/banner2.jpg";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { useParams } from "react-router-dom";

import Card from "../../Components/Card/Card";



import useMenu from "../../Hook/useMenu";

const Order = () => {
  //categories array
  const categories = ["salad", "pizza", "soup", "dessert", "drinks"];
  //useParams
  const { category } = useParams();

  //initial index
  const initialIndex = categories.indexOf(category);

  //state
  const [tabIndex, setTabIndex] = useState(initialIndex);

  //get all menu from custom hooks
  const [menus, loading] = useMenu();

  //filtered featured menu
  const drinks = menus.filter((menu) => menu.category === "drinks");
  const pizza = menus.filter((menu) => menu.category === "pizza");
  const salad = menus.filter((menu) => menu.category === "salad");
  const soup = menus.filter((menu) => menu.category === "soup");
  const dessert = menus.filter((menu) => menu.category === "dessert");

  //loading
  if (loading) {
    return (
      <p className="flex justify-center items-center min-h-screen">
        <span className="loading loading-infinity loading-lg"></span>
      </p>
    );
  }

  return (
    <div>
      <Hero
        img={OrderImg}
        title="Take chances, make mistakes."
        subTitle="would you like to try a dish?"
      ></Hero>

      <div className="container mx-auto px-5 lg:px-0">
        <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
          <TabList className={"text-center space-x-5 space-y-5"}>
            {categories?.map((cat) => (
              <Tab key={cat} className="btn btn-warning">
                {cat}
              </Tab>
            ))}
          </TabList>

          <TabPanel>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-16">
              {salad?.map((item) => (
                <Card key={item._id} item={item}></Card>
              ))}
            </div>
          </TabPanel>
          <TabPanel>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-16">
              {pizza?.map((item) => (
                <Card key={item._id} item={item}></Card>
              ))}
            </div>
          </TabPanel>
          <TabPanel>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-16">
              {soup?.map((item) => (
                <Card key={item._id} item={item}></Card>
              ))}
            </div>
          </TabPanel>
          <TabPanel>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-16">
              {dessert?.map((item) => (
                <Card key={item._id} item={item}></Card>
              ))}
            </div>
          </TabPanel>
          <TabPanel>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-16">
              {drinks?.map((item) => (
                <Card key={item._id} item={item}></Card>
              ))}
            </div>
          </TabPanel>

        </Tabs>
      </div>
    </div>
  );
};

export default Order;
