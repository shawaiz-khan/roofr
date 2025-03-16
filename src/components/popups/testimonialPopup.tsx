import useAuth from "@/hooks/useAuth";
import useUser from "@/hooks/useUser";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";

export interface INewReview {
    name: string;
    location: string;
    title: string;
    review: string;
    stars: number;
}

const TestimonialPopup: React.FC<{ onClick: () => void }> = ({ onClick }) => {
    const [review, setReview] = useState<INewReview>({
        name: "",
        location: "",
        title: "",
        review: "",
        stars: 1
    });
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const router = useRouter();
    const { isLoggedIn } = useAuth();
    const { user } = useUser();

    const handleOnchange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setReview((prev) => ({
            ...prev,
            [name]: value
        }));

        setError("");
    }

    const validateInputs = () => {
        if (review.name === "" || review.location === "" || review.title === "" || review.review === "" || review.stars === undefined) {
            setError("All fields are required");
            return false;
        }

        if (review.name !== user.name || review.location !== user.location) {
            setError("Make sure the name and location are same as this account");
            return false;
        }

        if (review.stars <= 0 || review.stars > 5) {
            setError("Stars can only be between 1 - 5");
            return false;
        }

        setError("");
        return true;
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (!validateInputs()) {
                setLoading(false);
                return;
            }

            console.log(user);
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : "Issue while submitting the review";
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-[#000] bg-opacity-60 z-50">
            <main className="bg-black-secondary p-6 rounded-lg shadow-lg w-80 md:w-1/2 h-fit md:p-10 text-text-light">
                {isLoggedIn ? (
                    <div className="flex flex-col gap-5">
                        <button onClick={onClick} className="w-full relative"><X className="absolute top-0 md:-top-2 right-0" /></button>
                        <form onSubmit={handleSubmit} className="w-full">
                            <div className="flex flex-col gap-3 md:gap-4">
                                <h1 className="text-2xl md:text-3xl text-left mb-2 md:mb-auto">Add your Review</h1>
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="flex flex-col gap-1">
                                        <label
                                            htmlFor="name" className="text-text-light">Name</label>
                                        <input
                                            type="text"
                                            placeholder="name"
                                            name="name"
                                            value={review.name}
                                            className="bg-transparent border border-black-tertiary text-gray-tertiary w-full p-3 rounded-md placeholder:text-sm placeholder:text-gray-primary outline-none focus:ring-2 focus:ring-inset focus:ring-black-tertiary"
                                            onChange={(e) => handleOnchange(e)}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <label htmlFor="location" className="text-text-light">Location</label>
                                        <input
                                            type="text"
                                            placeholder="location"
                                            name="location"
                                            value={review.location}
                                            className="bg-transparent border border-black-tertiary text-gray-tertiary w-full p-3 rounded-md placeholder:text-sm placeholder:text-gray-primary outline-none focus:ring-2 focus:ring-inset focus:ring-black-tertiary"
                                            onChange={(e) => handleOnchange(e)}
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="title" className="text-text-light">Title</label>
                                    <input
                                        type="text"
                                        placeholder="title"
                                        name="title"
                                        value={review.title}
                                        className="bg-transparent border border-black-tertiary text-gray-tertiary w-full p-3 rounded-md placeholder:text-sm placeholder:text-gray-primary outline-none focus:ring-2 focus:ring-inset focus:ring-black-tertiary"
                                        onChange={(e) => handleOnchange(e)}
                                    />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <textarea
                                        placeholder="write your review here"
                                        name="review"
                                        value={review.review}
                                        className="bg-transparent resize-none border border-black-tertiary text-gray-tertiary w-full p-3 rounded-md placeholder:text-sm placeholder:text-gray-primary outline-none focus:ring-2 focus:ring-inset focus:ring-black-tertiary"
                                        onChange={(e) => handleOnchange(e)}
                                    >

                                    </textarea>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="stars" className="text-text-light">Stars</label>
                                    <input
                                        type="number"
                                        max={5}
                                        min={1}
                                        name="stars"
                                        value={review.stars}
                                        onChange={(e) => handleOnchange(e)}
                                        placeholder="stars"
                                        className="bg-transparent border border-black-tertiary text-gray-tertiary w-full p-3 rounded-md placeholder:text-sm placeholder:text-gray-primary outline-none focus:ring-2 focus:ring-inset focus:ring-black-tertiary"
                                    />
                                </div>
                            </div>
                            <button
                                className="bg-purple-secondary text-white py-2.5 px-4 rounded-md w-full md:w-80 mt-5 text-base font-normal transition hover:bg-opacity-90"
                            >
                                {loading ? "Submitting..." : "Submit"}
                            </button>
                            {error && (
                                <div className="text-xs text-red-600 w-full text-center mt-3">{error}</div>
                            )}
                        </form>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center text-center font-semibold text-3xl h-full gap-5">
                        You need to login before submitting a review
                        <button
                            className="bg-purple-secondary text-white py-2.5 px-4 rounded-md w-full max-w-40 text-base font-normal transition hover:bg-opacity-90"
                            onClick={() => router.push("/auth/login")}
                        >
                            Go to Login Page
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
};

export default TestimonialPopup;