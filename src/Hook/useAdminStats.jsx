import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";


const useAdminStats = () => {
    //useAxios hook
    const axios = useAxios()
   const {data : adminStats=[],isLoading,refetch} = useQuery({
    queryKey:[ "adminStats"] ,  // the key used to cache this request
    queryFn: async()=>{
        const result = await axios.get("/admin-stats")
        return result.data;
    }
   })
   return [adminStats, isLoading, refetch]
};

export default useAdminStats;