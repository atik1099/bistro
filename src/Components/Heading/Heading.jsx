

const Heading = ({subHeading,Heading}) => {
    return (
        <div className="text-center space-y-5 my-16">
            <p className="text-[#D99904] text-xl font-semibold">---{subHeading}---</p>
            <h2 className="text-3xl font-bold border-y-2  py-5  uppercase w-[60%] mx-auto">{Heading}</h2>
        </div>
    );
};

export default Heading;