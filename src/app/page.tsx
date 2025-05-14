"use client"

import React from "react";
import heroImg from '@/assets/images/hero.jpg';
import RoundTextSvg from "@/components/ui/RoundTextSvg";
import RatingBlock from "@/components/block/RatingBlock";
import FeaturesBlock from "@/components/block/FeaturesBlock";
import Testimonials from "@/components/block/Testimonial";
import FAQs from "@/components/block/FAQ";
import CTA from "@/components/block/CTA";
import EstateContainer from "@/components/block/EstateContainer";
import Image from "next/image";
import stars from "@/assets/svg/Stars.svg";
import { useRouter } from 'next/navigation';

const Home: React.FC = () => {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-black-primary text-text-light flex flex-col gap-10 md:gap-0">
      <div className="p-5 md:p-0 flex flex-col gap-10 md:gap-0">
        {/* Hero */}
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
              <h1 className="text-2xl md:text-5xl">Discover Your Dream Property with Roofr</h1>
              <p className="text-gray-quaternary">Your journey to finding the perfect property begins here. Explore our listings to find the home that matches your dreams.</p>
            </div>
            <div className="grid grid-rows-2 gap-3 w-full md:w-3/4 md:grid-rows-1 md:grid-cols-2">
              <button className="bg-black-primary border border-black-tertiary py-3 w-full rounded-md">Learn More</button>
              <button
                className="bg-purple-primary border border-purple-secondary py-3 w-full rounded-md"
                onClick={() => router.push('/properties')}
              >
                Browse Properties
              </button>
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
        {/* Featured Cards  */}
        <div className="z-20">
          <FeaturesBlock />
        </div>
        {/* Estate Listings  */}
        <div className="flex justify-between items-end p-5 mt-0 md:mt-10">
          <div className="flex flex-col gap-2">
            <Image src={stars} alt="Featured Properties" />
            <h1 className="text-2xl">Featured Properties</h1>
            <p className="text-sm text-gray-quaternary">
              Explore our handpicked selection of featured properties. Each listing offers a glimpse into exceptional
              homes and investments available through Roofr.
            </p>
          </div>
          <button className="bg-black-secondary border border-black-tertiary py-3 px-4 text-sm rounded-md hidden md:block">
            View All Properties
          </button>
        </div>
        <EstateContainer />
        {/* Testimonials  */}
        <Testimonials />
        {/* FAQs  */}
        <FAQs />
      </div>
      {/* CTA  */}
      <CTA />
    </main>
  );
}

export default Home;