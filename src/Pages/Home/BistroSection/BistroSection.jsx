import service from "../../../assets/home/chef-service.jpg"

const BistroSection = () => {
    return (
        <div className="bg-cover bg-no-repeat h-[60vh] relative my-16 rounded-lg object-cover" style={{ backgroundImage: `url(${service})` }}>
            <div className="bg-base-100 shadow-lg p-5 lg:p-10 space-y-5 rounded-lg text-center  absolute top-[5%] w-[80%] left-[10%] bg-opacity-70">
                <h2 className="text-3xl font-bold">Bistro Boss</h2>
                <p className="text-xl font-semibold">Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, libero accusamus laborum deserunt ratione dolor officiis praesentium! Deserunt magni aperiam dolor eius dolore at, nihil iusto ducimus incidunt quibusdam nemo.</p>
            </div>
        </div>
    );
};

export default BistroSection;