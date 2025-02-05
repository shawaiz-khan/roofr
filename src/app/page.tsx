import Image from "next/image";
import React from "react";
import heroImg from '@/assets/images/hero.jpg';
import RoundTextSvg from "@/components/ui/RoundTextSvg";

const Home: React.FC = () => {
  return (
    <main className="p-5 min-h-screen bg-black-primary text-text-light">
      <div className="relative h-80">
        <Image
          src={heroImg}
          alt="Hero Image"
          fill
          priority
          className="absolute inset-0 object-cover overflow-hidden rounded-xl"
        />
        <RoundTextSvg className="absolute bottom-0 -translate-x-[15%] translate-y-1/4" />
      </div>
    </main>
  );
}

export default Home;