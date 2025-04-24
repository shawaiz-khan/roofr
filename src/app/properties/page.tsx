"use client"

import CTA from "@/components/block/CTA";
import SearchFilter from "@/components/block/SearchFilter";
import { useRouter } from "next/navigation";
import useUser from "@/hooks/useUser";

const Properties: React.FC = () => {
    const router = useRouter();
    const { user } = useUser();

    return (
        <main className="min-h-screen bg-black-primary text-text-light flex flex-col gap-10">
            <div className="bg-gradient-to-r from-black-secondary via-black-primary to-black-primary p-5 flex flex-col justify-center items-start gap-3 min-h-64 md:w-4/5">
                <h1 className="text-2xl md:text-3xl">Find Your Dream Property</h1>
                <p className="text-sm md:text-md text-gray-quaternary">
                    Welcome to Roofr, where your dream property awaits in every corner of our beautiful world. Explore our
                    curated selection of properties, each offering a unique story and a chance to redefine your life. With
                    categories to suit every dreamer, your journey
                </p>
                {user && user?.userType === "Seller" && (
                    <button
                        className="bg-purple-primary px-3 py-2 rounded-md cursor-pointer"
                        onClick={() => router.push("/properties/post-property")}
                    >
                        Post a Property
                    </button>
                )}
            </div>
            <SearchFilter />
            <CTA />
        </main>
    );
}

export default Properties;