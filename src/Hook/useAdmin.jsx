import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";
import useAuth from "./useAuth";

const useAdmin = () => {
  const axios = useAxios();
  const { user, loading } = useAuth();

  //ten-stack query
  const { data: isAdmin, isPending } = useQuery({
    enabled:  !!user && !loading,
    queryKey: ["admin", user?.email],
    queryFn: async () => {
      const result = await axios.get(`admin/${user?.email}`);
      return result?.data?.isAdmin;
    },
  });

  return [isAdmin, isPending];
};

export default useAdmin;
