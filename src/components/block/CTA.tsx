import bottomImg from "@/assets/svg/cta_top.svg";
import topImg from "@/assets/svg/cta_bottom.svg";
import Image from "next/image";

const CTA: React.FC = () => {
    return (
        <main className="relative overflow-hidden min-h-60 flex items-center justify-center px-5 py-10 text-white border-t border-black-tertiary">
            <Image
                src={topImg}
                alt="CTA image"
                className="absolute top-0 left-0 z-0"
            />

            <Image
                src={bottomImg}
                alt="CTA image"
                className="absolute bottom-0 right-0 z-0"
            />

            <div className="relative z-10 text-start flex flex-col md:flex-row justify-between items-center gap-6 md:gap-10 max-w-6xl w-full">
                <div className="w-full md:w-3/4">
                    <h1 className="text-2xl md:text-3xl font-semibold">
                        Start Your Real Estate Journey Today
                    </h1>
                    <p className="text-sm md:text-sm text-gray-quaternary mt-2">
                        Your dream property is just a click away. Whether you are looking for a new home, a strategic investment,
                        or expert real estate advice, Roofr is here to assist you every step of the way. Take the first step
                        towards your real estate goals and explore our available properties or get in touch with our team for
                        personalized assistance.
                    </p>
                </div>
                <button className="bg-purple-primary w-full md:w-auto max-h-fit px-6 py-3 flex justify-center items-center rounded-md font-medium">
                    Explore Properties
                </button>
            </div>
        </main>
    );
}

export default CTA;