/* eslint-disable @next/next/no-img-element */
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
      className="w-full flex flex-col items-center justify-center gap-10 overflow-hidden"
      style={{
        height: "calc(100% - env(safe-area-inset-bottom) )",
        paddingTop: "calc(env(safe-area-inset-top))",
      }}
    >
      <div className="bg-[url('/main.webp')] bg-cover bg-center w-screen h-screen fixed top-0 left-0 -z-10">
        <div className="w-full h-full bg-black/70 backdrop-blur-xs" />
      </div>
      
      <div className="flex flex-col items-center justify-center gap-3">
        <div className="flex flex-row items-center justify-center gap-3">
          <img src="/khu.svg" className="w-10 h-10" alt="logo" />
          <p className="text-white font-light">X</p>
          <img src="/icons/icon-192.png" className="w-8 h-8 rounded-lg" alt="logo" />
        </div>
        <h1 className="text-2xl font-bold text-center text-white">경희대학교 학식</h1>
      </div>

      <div className="w-full max-w-[700px] overflow-x-auto snap scrollbar-hide">
        <div className="flex flex-row w-full items-center justify-start gap-3 px-4">
          {
            data.map((e, i) => (
              <Link key={i} href={`/${e.key}`}>
                <div className="glass py-3 px-3 w-[calc(100vw-2rem)] min-md:max-w-[650px] snap-item">
                  <div className="flex flex-col items-center justify-center gap-3">
                    <img src={e.images[0]} className="w-full rounded-lg aspect-video" alt={e.title} />
                    <p className="text-white font-bold text-xl text-center">{e.title}</p>
                  </div>
                </div>
              </Link>
            ))
          }
          <div className="h-full w-4 opacity-0">.</div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-1">
        <p className="text-white/50">순차적으로 지원하는 식당을 확대할 예정입니다!</p>
        <p className="text-white/50">옆으로 슬라이드하여 선택하세요!</p>
      </div>
    </div>
  );
};

export default Home;