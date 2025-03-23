
import React from "react";

import List from "./list";
import instance from "@/utils/instance";
import dayjs from "dayjs";

const Home = async ({
  params,
  searchParams
}: {
  params: Promise<{
    meal: string;
  }>;
  searchParams: Promise<{
    date: string;
  }>;
}) => {
  const { meal } = await params;
  const { date } = await searchParams;

  const response = await instance.get(`/meal/${meal}`);
  
  return (
    <List
      title={response.data.title}
      images={response.data.images}
      meal={meal}
      dateInserted={date}
    />
  );
};

export default Home;