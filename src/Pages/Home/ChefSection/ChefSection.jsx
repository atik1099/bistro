import { useEffect, useState } from "react";
import Card from "../../../Components/Card/Card";

const ChefSection = () => {
    //state
    const [offered, setOffered] = useState([])


    //fetch from menu json
    useEffect(() => {
        fetch("/menu.json")
            .then(res => res.json())
            .then(data => setOffered(data))
    }, [])

    const filterOffered = offered.filter(menu => menu.category === 'offered')
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-7 my-16">
            {
                filterOffered?.map(item => <Card key={item._id} item={item}></Card>)
            }
        </div>
    );
};

export default ChefSection;