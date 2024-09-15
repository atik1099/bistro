import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";

const useUsers = () => {
  //axios hook
  const axios = useAxios();


  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await axios.get("/users");
      return response.data;
    },
  });

  return [users, isLoading, refetch];
};

export default useUsers;
