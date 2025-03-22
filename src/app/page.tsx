"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

const Home = () => {

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

      <Link href="/2gik" className="glass py-3 px-3 w-full flex flex-col items-center justify-center gap-3">
        <Image src="/inter2gik.jpg" className="w-full rounded-lg" width={500} height={500} alt="제2긱" />
        <p className="text-white font-bold text-xl text-center">국제캠퍼스 - 제2기숙사</p>
      </Link>
      
      <p className="text-white">순차적으로 지원하는 식당을 확대할 예정입니다!</p>
    </div>
  );
};

export default Home;