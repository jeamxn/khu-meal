"use client";

import "dayjs/locale/ko";

import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import React from "react";

import LoadingSpinner from "@/components/loadingSpinner";
import Meal, { MealData } from "@/components/meal";
import { removeCookie, setCookie } from "@/utils/cookie";
import instance from "@/utils/instance";

dayjs.locale("ko");

const List = ({
  title,
  images,
  meal,
  dateInserted,
}: {
  title: string;
  images: string[];
  meal: string;
  dateInserted?: string;
  }) => {
  const router = useRouter();

  React.useEffect(() => { 
    setCookie("meal", meal, 100);
  }, [meal]);
  
  const [date, setDate] = React.useState(dateInserted ? dayjs(dateInserted, "YYYY-MM-DD") : dayjs());
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const itemRef = React.useRef<HTMLDivElement>(null);
  const [width, setWidth] = React.useState(0);
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    const element = scrollRef.current;
    if (!element) {
      return;
    }
    const scrollEvent = () => {
      setCurrent((element.scrollLeft) / (width + 12));
    };
    scrollEvent();
    element.addEventListener("scroll", scrollEvent);
    return () => {
      element.removeEventListener("scroll", scrollEvent);
    };
  }, [width]);

  React.useEffect(() => {
    const item = itemRef.current;
    if (!item) {
      return;
    }
    const resizeEvent = () => {
      setWidth(item.getBoundingClientRect().width);
    };
    resizeEvent();
    item.addEventListener("resize", resizeEvent);
    return () => {
      item.removeEventListener("resize", resizeEvent);
    };
  }, []);

  const [loading, setLoading] = React.useState(true);
  const { data } = useQuery<{
    breakfast: MealData[];
    lunch: MealData[];
    dinner: MealData[];
  }>({
    queryKey: ["meal", meal, date.format("YYYY-MM-DD")],
    queryFn: async () => { 
      setLoading(true);
      const res = await instance.get(`/meal/${meal}/${date.format("YYYY-MM-DD")}`);
      setLoading(false);
      return res.data;
    },
    initialData: {
      breakfast: [],
      lunch: [],
      dinner: [],
    },
  });

  return (
    <>
      <div className="w-full h-full fixed top-0 left-0 z-50 flex flex-col items-center justify-center pointer-events-none">
        <LoadingSpinner show={loading} size={50} />
      </div>
      <div className="w-full h-full fixed top-0 left-0">
        <div className="min-md:hidden">
          {
            images.map((e, i) => {
              const thisOpacity = current - i + 1;

              return (
                <div
                  key={i}
                  className="bg-cover bg-center w-screen h-screen fixed top-0 left-0"
                  style={{
                    backgroundPosition: "50% 90%",
                    backgroundImage: `url(${e})`,
                    backgroundSize: "cover",
                    backgroundAttachment: "fixed",
                    opacity: thisOpacity > 1 ? (i === 2 ? 1 : 2 - thisOpacity) : i === 0 ? 1 : thisOpacity,
                  }}
                >
                  <div className="w-full h-full bg-black/30" />
                </div>
              );
            })
          }
        </div>
        <div
          className="bg-cover bg-center w-screen h-screen fixed top-0 left-0 max-md:hidden"
          style={{
            backgroundImage: `url(${images[0]})`,
          }}
        >
          <div className="w-full h-full bg-black/30" />
        </div>
      </div>

      <div className="w-full h-[100dvh] flex flex-col items-center justify-center m-0 p-0">
        <div
          className="w-full max-w-[1500px] min-md:max-h-[1000px] min-md:p-4 flex min-md:flex-col max-md:flex-col-reverse items-center justify-center gap-3"
          style={{
            height: "calc(100% - env(safe-area-inset-top) )",
            paddingTop: "calc(env(safe-area-inset-top) / 2)",
          }}
        >
          <div className="h-1 w-full max-md:hidden">.</div>
          <div className="w-full flex justify-center items-center gap-3 max-md:p-4 max-md:pt-0">
            <div
              className="glass flex flex-row items-center justify-center h-14 cursor-pointer w-[calc(1/3*100%-5px)] max-md:hidden"
              onClick={() => {
                removeCookie("meal");
                router.push("/");
              }}
            >
              <p className="text-white font-bold text-xl text-center">
                {title}
              </p>
            </div>
            <div className="flex flex-row items-center justify-center gap-3 min-md:w-2/3 max-md:w-full">
              <div className="glass flex flex-row items-center justify-center h-14 w-full cursor-pointer order-1" onClick={() => {
                setDate(dayjs());
                router.push(`/${meal}?date=${dayjs().format("YYYY-MM-DD")}`);
              }}>
                <p className="text-white font-bold text-xl text-center">
                  {date.format("M월 D일 dddd")}
                </p>
              </div>
              <div className="glass flex flex-row items-center justify-center h-14 px-2 cursor-pointer order-2 max-md:-order-1" onClick={() => {
                setDate(date.add(-1, "day"));
                router.push(`/${meal}?date=${date.add(-1, "day").format("YYYY-MM-DD")}`);
              }}>
                <div className="bg-[url(/arrow_back.svg)] bg-contain bg-center w-8 h-8" />
              </div>
              <div className="glass flex flex-row items-center justify-center h-14 px-2 cursor-pointer order-3" onClick={() => {
                setDate(date.add(1, "day"));
                router.push(`/${meal}?date=${date.add(1, "day").format("YYYY-MM-DD")}`);
              }}>
                <div className="bg-[url(/arrow_forward.svg)] bg-contain bg-center w-8 h-8" />
              </div>
            </div>
          </div>
      
          <div className="w-full h-full max-md:overflow-x-auto snap scrollbar-hide max-md:p-4 max-md:py-0" ref={scrollRef}>
            <div className="w-full h-full flex flex-row min-md:items-center min-md:justify-center gap-3 max-md:whitespace-nowrap" ref={itemRef}>
              <Meal
                type="아침"
                data={data.breakfast}
              />
              <Meal
                type="점심"
                data={data.lunch}
              />
              <Meal
                type="저녁"
                data={data.dinner}
              />
              <div className="max-md:block hidden h-full w-4 opacity-0">.</div>
            </div>
          </div>

          <div className="w-full p-4 pb-0 min-md:hidden">
            <div
              className="glass flex flex-row items-center justify-center h-14 cursor-pointer w-full"
              onClick={() => {
                removeCookie("meal");
                router.push("/");
              }}
            >
              <p className="text-white font-bold text-xl text-center">
                {title}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default List;