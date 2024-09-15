import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";
import useAuth from "./useAuth";


const usePaymentHistory = () => {
   //useAxios and useAuth hook
   const axios = useAxios()
   const {user} = useAuth()


   const {data:paymentHistory=[] ,isLoading,refetch} = useQuery({
    queryKey: ['payment_history',user?.email],
    queryFn: async () => {
      const response = await axios.get(`/payments/${user?.email}`)
      return response.data;
    }
  })

   return [paymentHistory,isLoading,refetch]
};

export default usePaymentHistory;