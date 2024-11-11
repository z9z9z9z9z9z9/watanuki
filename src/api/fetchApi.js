import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_BASE_URL = "https://hianime-api-production.up.railway.app/api/v1";

const fetchData = async (url) => {
  try {
    const { data } = await axios.get(API_BASE_URL + url);
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export const useApi = (endpoint) => {
  return useQuery({
    queryKey: [endpoint],
    queryFn: () => fetchData(endpoint),
  });
};
