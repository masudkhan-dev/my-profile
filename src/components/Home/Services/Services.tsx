"use client";
import React from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { axiosPublic } from "@/components/hooks/axiosPublic";
import Marquee from "react-fast-marquee";

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <figure className="relative w-72 md:w-80 h-40 md:h-48 mx-4 cursor-pointer overflow-hidden rounded-xl border border-[#0a0a0a] p-6 bg-[#0a0a0a] text-white ">
      <div className="flex flex-row items-center gap-3 -mt-3">
        <Image
          src={img}
          alt={`${name}'s profile picture`}
          width={32}
          height={32}
          className="rounded-full"
        />
        <div className="flex flex-col">
          <figcaption className="text-xs md:text-sm font-medium text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-xs md:text-sm leading-relaxed">
        {body}
      </blockquote>
    </figure>
  );
};

const Services = () => {
  const {
    data: reviews,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/services.json");
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex h-[500px] items-center justify-center bg-black">
        <div className="text-white">Loading services...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-[500px] items-center justify-center bg-black">
        <div className="text-red-500">Error loading services</div>
      </div>
    );
  }

  if (!reviews) return null;

  const firstRow = reviews.slice(0, Math.ceil(reviews.length / 2));
  const secondRow = reviews.slice(Math.ceil(reviews.length / 2));

  return (
    <div>
      <section
        id="services"
        className="relative flex h-[500px] w-full flex-col items-center justify-center gap-8 overflow-hidden bg-black min-h-screen"
      >
        <Marquee pauseOnHover direction="left" speed={40}>
          <div className="flex">
            {firstRow.map(
              (
                review: React.JSX.IntrinsicAttributes & {
                  img: string;
                  name: string;
                  username: string;
                  body: string;
                }
              ) => (
                <ReviewCard key={review.username} {...review} />
              )
            )}
          </div>
        </Marquee>
        <Marquee pauseOnHover direction="right" speed={40}>
          <div className="flex">
            {secondRow.map(
              (
                review: React.JSX.IntrinsicAttributes & {
                  img: string;
                  name: string;
                  username: string;
                  body: string;
                }
              ) => (
                <ReviewCard key={review.username} {...review} />
              )
            )}
          </div>
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-black via-black/80 to-transparent shadow-[inset_48px_0_48px_-12px_rgba(0,0,0,1)]" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-black via-black/80 to-transparent shadow-[inset_-48px_0_48px_-12px_rgba(0,0,0,1)]" />
      </section>
    </div>
  );
};

export default Services;
