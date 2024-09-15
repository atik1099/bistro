import { useQuery } from "@tanstack/react-query";
import usePublicAxios from "./usePublicAxios";



const useMenu = () => {
  
  //axios hook
  const axios = usePublicAxios()

  const {data:menus=[] ,isLoading,refetch} = useQuery({
    queryKey: ['menus'],
    queryFn: async () => {
      const response = await axios.get("/menus")
      return response.data;
    }
  })

  return [menus,isLoading,refetch]
};

export default useMenu
