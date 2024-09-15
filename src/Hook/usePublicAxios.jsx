import axios from "axios";

const instance = axios.create({
  baseURL: "https://bistro-boss-server-seven-lake.vercel.app/api/v1",
  withCredentials: true,
});
const usePublicAxios = () => {
  return instance;
};

export default usePublicAxios;
