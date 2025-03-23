
import dayjs from "dayjs";
import React from "react";

import instance from "@/utils/instance";

import List from "./list";

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