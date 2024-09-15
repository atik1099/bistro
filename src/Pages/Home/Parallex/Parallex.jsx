import Heading from "../../../Components/Heading/Heading";
import bgImage from "../../../assets/home/featured.jpg"

const Parallex = () => {
    return (
        <div className="bg-cover bg-fixed bg-no-repeat relative h-[100vh]  my-16 rounded-lg" style={{ backgroundImage: `url(${bgImage})`, objectFit: 'cover' }}>
            <div className="w-full bg-black h-full bg-opacity-55">
                <div className="text-white absolute left-[10%]  right-[10%]">
                    <Heading subHeading="Check it Out" Heading="From our menu"></Heading>
                    <div className="flex flex-col items-center justify-center gap-10 lg:flex-row">
                        <img src={bgImage} className="w-96 rounded-lg" alt="featured Image" />
                        <div>
                            <p className="text-lg">
                                March 20, 2023 <br />
                                WHERE CAN I GET SOME?<br />
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Error voluptate facere, deserunt dolores maiores quod nobis quas quasi. Eaque repellat recusandae ad laudantium tempore consequatur consequuntur omnis ullam maxime tenetur.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Parallex;