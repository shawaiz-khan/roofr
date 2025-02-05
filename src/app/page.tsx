import Image from "next/image";
import React from "react";
import heroImg from '@/assets/images/hero.jpg';
import RoundTextSvg from "@/components/RoundTextSvg";
import RatingBlock from "@/components/RatingBlock";

const Home: React.FC = () => {
  return (
    <main className="p-5 min-h-screen bg-black-primary text-text-light flex flex-col gap-10">
      <div className="relative h-80">
        <Image
          src={heroImg}
          alt="Hero Image"
          fill
          priority
          className="absolute inset-0 object-cover overflow-hidden rounded-xl border border-black-tertiary"
        />
        <RoundTextSvg className="absolute bottom-0 -translate-x-[15%] translate-y-1/4" />
      </div>
      <div className="flex flex-col gap-3">
        <h1 className="text-2xl font-semibold">Discover Your Dream Property with Roofr</h1>
        <p className="text-gray-quaternary">Your journey to finding the perfect property begins here. Explore our listings to find the home that matches your dreams.</p>
      </div>
      <div className="grid grid-rows-2 gap-3 w-full">
        <button className="bg-black-primary border border-black-tertiary py-3 w-full rounded-md">Learn More</button>
        <button className="bg-purple-primary border border-purple-secondary py-3 w-full rounded-md">Browse Properties</button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        <RatingBlock count={200} text="Happy Customers" />
        <RatingBlock count="10k" text="Properties For Clients" />
        <div className="col-span-2">
          <RatingBlock count={16} text="Years of Experience" />
        </div>
      </div>
    </main>
  );
}

export default Home;