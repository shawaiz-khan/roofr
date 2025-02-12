import { TestimonialProps } from "@/types/testimonial.types";
import RatingStarProvider from "./RatingProvider";
import userPlaceholder from "@/assets/images/userPlaceholder.png";
import Image from "next/image";

const TestimonialBlock: React.FC<TestimonialProps> = ({ name, city, title, testimonial, stars }) => {
    return (
        <div className="border border-black-tertiary p-5 space-y-6 rounded-md">
            <RatingStarProvider rating={stars} />
            <div className="space-y-1">
                <h1 className="text-lg font-semibold">{title}</h1>
                <p className="text-sm">{testimonial}</p>
            </div>
            <div className="flex items-center space-x-3">
                <Image
                    src={userPlaceholder}
                    alt={`Review by ${name}`}
                    className="max-w-12"
                />
                <div className="flex flex-col gap-0">
                    <p className="text-md">{name}</p>
                    <span className="text-gray-quaternary text-xs">{city}</span>
                </div>
            </div>
        </div>
    );
}

export default TestimonialBlock;