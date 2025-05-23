import EstateType from "@/types/estate.types";
import Image from "next/image";
import { Bath, BedDouble, Building2 } from "lucide-react";
import estate_placeholder from "@/assets/images/es_1.jpg";

const EstateBlock: React.FC<{ estate: EstateType }> = ({ estate }) => {
    return (
        <div className="border border-black-tertiary p-5 gap-5 flex flex-col justify-start rounded-lg">
            <Image
                src={estate.image || estate_placeholder}
                alt="Estate Image"
                width={400}
                height={250}
                className="rounded-md object-cover"
            />
            <div className="space-y-1">
                <h1 className="text-xl">{estate.title}</h1>
                <p className="text-sm text-gray-quaternary">{estate.description.length > 100 ? estate.description.slice(0, 100) + "..." : estate.description}</p>
            </div>
            <div className="grid grid-cols-2 grid-rows-2 gap-3">
                <span className="text-sm text-text-light bg-black-secondary rounded-full flex gap-2 justify-center items-center px-3 py-2">
                    <BedDouble />{estate.bedrooms}-Bedroom
                </span>
                <span className="text-sm text-text-light bg-black-secondary rounded-full flex gap-2 justify-center items-center px-3 py-2">
                    <Bath />{estate.bathrooms}-Bathroom
                </span>
                <span className="text-sm text-text-light bg-black-secondary rounded-full flex gap-2 justify-center items-center px-3 py-2">
                    <Building2 />{estate.category}
                </span>
            </div>
            <div className="flex justify-between items-center gap-3">
                <div className="relative h-full pr-3 flex justify-start items-center">
                    <span className="text-sm absolute top-0 text-gray-quaternary">Price</span>
                    <h1 className="mt-4 text-lg">${estate.totalPrice.toLocaleString()}</h1>
                </div>
                <button className="w-full bg-purple-primary px-3 py-3 md:py-4 rounded-md text-sm">
                    View Property Details
                </button>
            </div>
        </div>
    );
};

export default EstateBlock;