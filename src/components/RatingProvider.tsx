import Image from "next/image";
import fullRatingStar from "@/assets/svg/rating_star.svg";
import halfRatingStar from "@/assets/svg/half_rating_star.svg";

const RatingStarProvider: React.FC<{ rating: number }> = ({ rating }) => {
    const hasHalfStar = rating % 1 !== 0;
    const fullStars = Math.floor(rating);

    return (
        <div className="flex gap-2">
            {[...Array(fullStars)].map((_, index) => (
                <Image
                    key={index}
                    src={fullRatingStar}
                    alt={`Full Rating Star ${index + 1}`}
                />
            ))}

            {hasHalfStar && (
                <Image
                    key="half-star"
                    src={halfRatingStar}
                    alt="Half Rating Star"
                />
            )}
        </div>
    );
}

export default RatingStarProvider;