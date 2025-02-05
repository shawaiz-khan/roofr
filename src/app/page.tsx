import Image from "next/image";
import React from "react";
import heroImg from '@/assets/images/hero.jpg';
import RoundTextSvg from "@/components/RoundTextSvg";
import RatingBlock from "@/components/RatingBlock";

const Home: React.FC = () => {
  return (
    <main className="p-5 md:p-0 min-h-screen bg-black-primary text-text-light">
      <div className="flex flex-col gap-10 md:grid md:grid-cols-2 md:min-h-[75vh]">
        <div className="relative h-80 md:h-full md:order-last">
          <Image
            src={heroImg}
            alt="Hero Image"
            fill
            priority
            className="absolute inset-0 object-cover overflow-hidden rounded-xl md:rounded-none border border-black-tertiary"
          />
          <RoundTextSvg className="absolute bottom-0 md:top-0 -translate-x-[15%] translate-y-1/4 md:-translate-x-1/2 md:translate-y-3/4" />
        </div>
        <div className="flex flex-col gap-10 md:justify-center md:items-start md:p-5">
          <div className="flex flex-col gap-3">
            <h1 className="text-2xl md:text-5xl font-semibold">Discover Your Dream Property with Roofr</h1>
            <p className="text-gray-quaternary">Your journey to finding the perfect property begins here. Explore our listings to find the home that matches your dreams.</p>
          </div>
          <div className="grid grid-rows-2 gap-3 w-full md:w-3/4 md:grid-rows-1 md:grid-cols-2">
            <button className="bg-black-primary border border-black-tertiary py-3 w-full rounded-md">Learn More</button>
            <button className="bg-purple-primary border border-purple-secondary py-3 w-full rounded-md">Browse Properties</button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <RatingBlock count={200} text="Happy Customers" />
            <RatingBlock count="10k" text="Properties For Clients" />
            <div className="col-span-2 md:col-span-1">
              <RatingBlock count={16} text="Years of Experience" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Home;