import useAuth from "@/hooks/useAuth";
import useUser from "@/hooks/useUser";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

const TestimonialPopup: React.FC<{ onClick: () => void }> = ({ onClick }) => {
    const router = useRouter();
    const { isLoggedIn } = useAuth();
    const { user } = useUser();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("user: ", user);
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-[#000] bg-opacity-60 z-50">
            <main className="bg-black-secondary p-6 rounded-lg shadow-lg w-80 md:w-1/2 h-fit md:p-10 text-text-light">
                {isLoggedIn ? (
                    <div className="flex flex-col gap-5">
                        <button onClick={onClick} className="w-full relative"><X className="absolute top-0 md:-top-2 right-0" /></button>
                        <form onSubmit={handleSubmit}>
                            <div className="flex flex-col gap-3 md:gap-4">
                                <h1 className="text-2xl md:text-3xl text-center md:text-left">Add your Review</h1>
                                <input type="text" placeholder="name" className="bg-transparent border border-black-tertiary text-gray-tertiary w-full p-3 rounded-md placeholder:text-sm placeholder:text-gray-primary outline-none focus:ring-2 focus:ring-inset focus:ring-black-tertiary" />
                                <input type="text" placeholder="location" className="bg-transparent border border-black-tertiary text-gray-tertiary w-full p-3 rounded-md placeholder:text-sm placeholder:text-gray-primary outline-none focus:ring-2 focus:ring-inset focus:ring-black-tertiary" />
                                <input type="text" placeholder="title" className="bg-transparent border border-black-tertiary text-gray-tertiary w-full p-3 rounded-md placeholder:text-sm placeholder:text-gray-primary outline-none focus:ring-2 focus:ring-inset focus:ring-black-tertiary" />
                                <input type="text" placeholder="review" className="bg-transparent border border-black-tertiary text-gray-tertiary w-full p-3 rounded-md placeholder:text-sm placeholder:text-gray-primary outline-none focus:ring-2 focus:ring-inset focus:ring-black-tertiary" />
                                <input type="number" max={5} min={1} placeholder="stars (max 5)" className="bg-transparent border border-black-tertiary text-gray-tertiary w-full p-3 rounded-md placeholder:text-sm placeholder:text-gray-primary outline-none focus:ring-2 focus:ring-inset focus:ring-black-tertiary" />
                            </div>
                            <button
                                className="bg-purple-secondary text-white py-2.5 px-4 rounded-md w-full md:w-80 mt-5 text-base font-normal transition hover:bg-opacity-90"
                            >
                                Submit
                            </button>
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