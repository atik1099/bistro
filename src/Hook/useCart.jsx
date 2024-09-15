import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";
import useAuth from "./useAuth";

const useCart = () => {
  //axios hook
  const axios = useAxios();
  //useAuth hook
  const { user,loading } = useAuth();

  const {
    data: carts = [],
    isLoading,
    refetch,
  } = useQuery({
    enabled: !!user  && !loading,
    queryKey: ["carts", user?.email],
    queryFn: async () => {
      if (!user?.email) {
        return []; // Return an empty array if email is undefined
      }
      const response = await axios.get(`/carts?email=${user.email}`);
      return response.data;
    },
  });

  return [carts, isLoading, refetch];
};


export default useCart;
