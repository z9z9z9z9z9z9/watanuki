import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import config from "../config/config";

const API_BASE_URL = config.localUrl;

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
    retry: 2,
    refetchOnWindowFocus: false,
  });
};
