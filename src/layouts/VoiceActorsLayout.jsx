import React from "react";
import { useApi, useInfiniteApi } from "../services/useApi";

const VoiceActorsLayout = ({ id }) => {
  const { data, isLoading, isError, error } = useInfiniteApi(
    `/characters/${id}?page=`
  );

  console.log(data);

  return <div>{}</div>;
};

export default VoiceActorsLayout;
