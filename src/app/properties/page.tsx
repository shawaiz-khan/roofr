import CTA from "@/components/block/CTA";
import SearchFilter from "@/components/block/SearchFilter";
import { Search } from "lucide-react";

const Properties: React.FC = () => {
    return (
        <main className="min-h-screen bg-black-primary text-text-light flex flex-col gap-10">
            <div className="bg-gradient-to-r from-black-secondary via-black-primary to-black-primary p-5 flex flex-col justify-center items-start gap-3 min-h-64">
                <h1 className="text-2xl">Find Your Dream Property</h1>
                <p className="text-sm text-gray-quaternary">
                    Welcome to Roofr, where your dream property awaits in every corner of our beautiful world. Explore our
                    curated selection of properties, each offering a unique story and a chance to redefine your life. With
                    categories to suit every dreamer, your journey
                </p>
            </div>
            <div className='p-5 md:p-10 flex flex-col justify-center items-center gap-10 md:gap-16'>
                <div className="relative w-full">
                    <input type="text" placeholder="Search For A Property" className="bg-transparent border border-black-tertiary text-gray-tertiary w-full pl-5 py-4 rounded-md placeholder:text-sm placeholder:text-gray-primary outline-none focus:ring-2 focus:ring-inset focus:ring-black-tertiary" />
                    <button className="absolute top-1/2 right-3 transform -translate-y-1/2 bg-purple-primary text-white px-3 py-2 rounded-md hover:bg-purple-700 transition duration-200">
                        <Search size={20} />
                    </button>
                </div>
                <SearchFilter />
            </div>
            <CTA />
        </main>
    );
}

export default Properties;