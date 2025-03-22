
import React from "react";

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
  
  return (
    <List meal={meal} dateInserted={date} />
  );
};

export default Home;