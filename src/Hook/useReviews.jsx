import { useQuery } from "@tanstack/react-query";
import usePublicAxios from "./usePublicAxios";




const useReviews = () => {
    
    //axis hook
    const axios = usePublicAxios()

    const {data:reviews=[],isLoading,refetch} = useQuery({
        queryKey:["reviews"],
        queryFn: async()=>{
            const response = await axios.get("/reviews");
            return response.data;
        }
    })

    return [reviews,isLoading,refetch]
};

export default useReviews;