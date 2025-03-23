import Image from "next/image";
import Link from "next/link";
import React from "react";

import instance from "@/utils/instance";

const Home = async () => {
  const { data } = await instance.get<{
    key: string;
    title: string;
    images: string[];
  }[]>("/meal/list");

  return (
    <div
      className="w-full flex flex-col items-center justify-center gap-5 px-4"
      style={{
        height: "calc(100svh - env(safe-area-inset-bottom) )",
      }}
    >
      <div className="bg-[url('/main.jpeg')] bg-cover bg-center w-screen h-screen fixed top-0 left-0 -z-10">
        <div className="w-full h-full bg-black/30 backdrop-blur-xs" />
      </div>
      
      <div className="glass py-3 px-8">
        <h1 className="text-2xl font-bold text-center text-white">경희대학교 학식 알리미</h1>
      </div>

      {
        data.map((e, i) => (
          <Link key={i} href={`/${e.key}`} className="glass py-3 px-3 w-full max-w-96 flex flex-col items-center justify-center gap-3">
            <Image src={e.images[0]} className="w-full rounded-lg aspect-video" width={1920} height={1080} alt={e.title} />
            <p className="text-white font-bold text-xl text-center">{e.title}</p>
          </Link>
        ))
      }

      <p className="text-white">순차적으로 지원하는 식당을 확대할 예정입니다!</p>
    </div>
  );
};

export default Home;