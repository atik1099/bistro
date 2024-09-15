import Heading from "../../Components/Heading/Heading";
import Banner from "./Banner/Banner";
import BistroSection from "./BistroSection/BistroSection";
import ChefSection from "./ChefSection/ChefSection";
import FeaturedMenu from "./FeaturedMenu/FeaturedMenu";
import Slider from "./Slider/Slider";
import Parallex from "./Parallex/Parallex";
import Testimonial from "./Testimonial/Testimonial";
import useMenu from "../../Hook/useMenu";
import useReviews from "../../Hook/useReviews";

const Home = () => {
  //useMenu & useReviews from custom hooks
  const [menus, isLoading] = useMenu();
  const [reviews] = useReviews()

  if (isLoading) {
    return (
      <p className="flex justify-center items-center min-h-screen">
        <span className="loading loading-infinity loading-lg"></span>
      </p>
    );
  }

  return (
    <div className="">
      <Banner></Banner>
      <div className="container mx-auto px-5 lg:px-0">
        <Heading
          subHeading="From 11.00am to 10pm"
          Heading="Order Online"
        ></Heading>
        <Slider></Slider>
        <BistroSection></BistroSection>
        <Heading subHeading="Checkout Menu" Heading="Featured Menu"></Heading>
        <FeaturedMenu menus={menus}></FeaturedMenu>
        <Heading subHeading="Should Try" Heading="Cheff Recommends"></Heading>
        <ChefSection></ChefSection>
        <Parallex></Parallex>
        <Heading
          subHeading="What our client say"
          Heading="Testimonial"
        ></Heading>
        <Testimonial reviews={reviews}></Testimonial>
      </div>
    </div>
  );
};

export default Home;
