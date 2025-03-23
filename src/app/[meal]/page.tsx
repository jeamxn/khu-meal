
import React from "react";

import List from "./list";
import instance from "@/utils/instance";

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
  console.log(response.data.title);
  
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