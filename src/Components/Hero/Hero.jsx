import { Parallax } from "react-parallax";


const Hero = ({ title,img,subTitle }) => {
  return (
    <div>
      <Parallax
        className="h-[50vh] mb-10 bg-fixed"
        blur={{ min: -15, max: 15 }}
        style={{ backgroundImage: `url(${img})` }}
        bgImageAlt="hero image"
        strength={500}
      >
        <div className="absolute top-20 lg:top-0 lg:mt-20 left-[5%]  w-[90%] text-white text-center ">
          <div className=" bg-black px-5 bg-opacity-55 py-8 rounded-lg ">
            <h1 className="mb-5 text-5xl font-bold">{title}</h1>
            <p className="mb-5 lg:w-[50%] mx-auto ">{subTitle}</p>
          </div>
        </div>
      </Parallax>
    </div>
  );
};

export default Hero;
