import React from "react";

const Meal = ({
  data,
  type,
  className,
}: {
  data: {
    title: string;
    time: string;
    menu: string[];
  }[];
  type: "아침" | "점심" | "저녁";
  className?: string;
}) => { 
  return (
    <div className={[
      "glass w-full h-full flex flex-col items-start justify-start p-4 gap-3 snap-item max-md:min-w-[100%]",
      className,
    ].join(" ")}>
      <div className="flex flex-row items-center justify-start gap-2">
        <div className={[
          "bg-contain bg-center w-8 h-8",
          type === "아침" ? "bg-[url(/light_mode.svg)]" : type === "점심" ? "bg-[url(/partly_cloudy_day.svg)]" : "bg-[url(/moon_stars.svg)]",
        ].join(" ")} />
        <p className="text-white font-bold text-3xl">{type}</p>
      </div>
      <div className="flex flex-col items-start justify-start gap-5 overflow-y-auto w-full scrollbar-hide">
        {
          data.map((e, j) => (
            <React.Fragment key={j}>
              <div className="flex flex-col items-start justify-start gap-2">
                {
                  e.title === "" ? e.time === "" ? null : (
                    <p className="text-white font-bold text-xl">{e.time}</p>
                  ) : (
                    <div className="flex flex-col items-start justify-start gap-0">
                      <p className="text-white font-bold text-xl">{e.title}</p>
                      <p className="text-white font-medium text-base">운영시간 {e.time}</p>
                    </div>
                  )
                }
                {
                  e.menu.map((_, i) => (
                    <p className="text-white font-normal text-lg" key={i}> - {_}</p>
                  ))
                }
              </div>
              {/* {
                j === data.length - 1 ? null : <div className="w-full h-[1px] bg-white/10 border-b border-white/10" />
              } */}
            </React.Fragment>
          ))
        }
      </div>
    </div>
  );
};

export default Meal;