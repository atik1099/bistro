import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxios from "./useAxios";
import useAdmin from "./useAdmin";

const useOrders = () => {
  const axios = useAxios();
  const { user } = useAuth();
  const [isAdmin] = useAdmin();
  
  const {data:Orders =[],isLoading,refetch} = useQuery({
    queryKey:['orders',user?.email],
    queryFn: async()=>{
        if(isAdmin){
            const result = await axios.get(`/orders/${user?.email}`)
            return result.data;
        }
    }
  })

  return [Orders,isLoading,refetch]
};

export default useOrders;
