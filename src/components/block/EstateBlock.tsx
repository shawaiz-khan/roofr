/* eslint-disable @typescript-eslint/no-explicit-any */
import EstateType from "@/types/estate.types";
import Image from "next/image";
import { Bath, BedDouble, Building2 } from "lucide-react";
import estate_placeholder from "@/assets/images/es_1.jpg";
import useUser from "@/hooks/useUser";
import axiosInstance from "@/lib/axios";

const EstateBlock: React.FC<{ estate: EstateType }> = ({ estate }) => {
    const { user } = useUser();

    const handleDeleteClick = async (estateId: string | number) => {
        try {
            const res = await axiosInstance.post(`/api/properties/delete/${estateId}`);
            console.log("Deleted successfully:", res.data);
            alert("Property deleted successfully!");
            window.location.reload();
        } catch (err: any) {
            console.error("Failed to delete property:", err?.response?.data || err.message);
            alert("Failed to delete property.");
        }
    };

    const isOwner = user?._id === estate.owner;

    return (
        <div className="border border-black-tertiary p-5 gap-5 flex flex-col justify-start rounded-lg overflow-hidden">
            <Image
                src={estate.image || estate_placeholder}
                alt="Estate Image"
                width={400}
                height={250}
                className="rounded-md object-cover h-60"
            />
            <div className="space-y-1">
                <h1 className="text-xl">{estate.title}</h1>
                <p className="text-sm text-gray-quaternary break-words max-w-full overflow-hidden">
                    {estate.description.length > 100
                        ? estate.description.slice(0, 100) + "..."
                        : estate.description}
                </p>
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
            <div className="space-y-1">
                <span className="text-sm top-0 text-gray-quaternary">Price</span>
                <h1 className="mt-4 text-lg">${estate.totalPrice.toLocaleString()}</h1>
            </div>

            <div className={`grid grid-cols-${isOwner ? "2" : "1"} gap-3`}>
                <button className="w-full bg-purple-primary px-3 py-3 md:py-4 rounded-md text-sm">
                    View Details
                </button>

                {isOwner && (
                    <button
                        className="w-full bg-red-600 px-3 py-3 md:py-4 rounded-md text-sm"
                        onClick={() => handleDeleteClick(estate._id)}
                    >
                        Delete Property
                    </button>
                )}
            </div>
        </div>
    );
};

export default EstateBlock;