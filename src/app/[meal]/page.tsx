
import dayjs from "dayjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
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
  try {
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
  }
  catch {
    return redirect("/");
  }
};

export default Home;