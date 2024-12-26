"use client";
import { RandomizedTextEffect } from "@/components/ui/text-randomized";
import { useEffect, useState } from "react";

const AutoType = () => {
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);

  const titles = ["Developer.", "Designer."];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitleIndex((prev) => (prev + 1) % titles.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [titles.length]);

  return (
    <div>
      <h1 className="font-departure relative z-10 text-center leading-tight text-[#A8D5BA] ">
        <RandomizedTextEffect text={titles[currentTitleIndex]} />
      </h1>
    </div>
  );
};

export default AutoType;
