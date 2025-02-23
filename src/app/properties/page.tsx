import CTA from "@/components/block/CTA";
import SearchFilter from "@/components/block/SearchFilter";
import Image from "next/image";
import stars from "@/assets/svg/Stars.svg";

const Properties: React.FC = () => {
    return (
        <main className="min-h-screen bg-black-primary text-text-light flex flex-col gap-10">
            <div className="bg-gradient-to-r from-black-secondary via-black-primary to-black-primary p-5 flex flex-col justify-center items-start gap-3 min-h-64 md:w-4/5">
                <h1 className="text-2xl md:text-3xl">Find Your Dream Property</h1>
                <p className="text-sm md:text-md text-gray-quaternary">
                    Welcome to Roofr, where your dream property awaits in every corner of our beautiful world. Explore our
                    curated selection of properties, each offering a unique story and a chance to redefine your life. With
                    categories to suit every dreamer, your journey
                </p>
            </div>
            <SearchFilter />
            <div className="p-5 flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                    <Image src={stars} alt="Featured Properties" />
                    <h1 className="text-2xl">Let&apos;s Make This Happen!</h1>
                    <p className="text-sm text-gray-quaternary">
                        Explore our handpicked selection of featured properties. Each listing offers a glimpse into exceptional
                        homes and investments available through Roofr.
                    </p>
                </div>
                <form action="#" className="grid grid-cols-1 border border-black-tertiary rounded-lg p-5 gap-4">
                    {/* Input G1  */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="First Name"
                                className="text-sm"
                            >
                                First Name
                            </label>
                            <input
                                type="text"
                                className="bg-black-secondary border border-black-tertiary text-gray-tertiary w-full py-3 px-4 rounded-md placeholder:text-sm placeholder:text-gray-primary outline-none focus:ring-2 focus:ring-inset focus:ring-black-tertiary"
                                placeholder="First Name"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="Last Name"
                                className="text-sm"
                            >
                                Last Name
                            </label>
                            <input
                                type="text"
                                className="bg-black-secondary border border-black-tertiary text-gray-tertiary w-full py-3 px-4 rounded-md placeholder:text-sm placeholder:text-gray-primary outline-none focus:ring-2 focus:ring-inset focus:ring-black-tertiary"
                                placeholder="Last Name"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="Email"
                                className="text-sm"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                className="bg-black-secondary border border-black-tertiary text-gray-tertiary w-full py-3 px-4 rounded-md placeholder:text-sm placeholder:text-gray-primary outline-none focus:ring-2 focus:ring-inset focus:ring-black-tertiary"
                                placeholder="Email"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="Phone"
                                className="text-sm"
                            >
                                Phone
                            </label>
                            <input
                                type="text"
                                className="bg-black-secondary border border-black-tertiary text-gray-tertiary w-full py-3 px-4 rounded-md placeholder:text-sm placeholder:text-gray-primary outline-none focus:ring-2 focus:ring-inset focus:ring-black-tertiary"
                                placeholder="Phone"
                            />
                        </div>
                    </div>

                    {/* Input G2  */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="Preferred Location"
                                className="text-sm"
                            >
                                Preferred Location
                            </label>
                            <input
                                type="text"
                                className="bg-black-secondary border border-black-tertiary text-gray-tertiary w-full py-3 px-4 rounded-md placeholder:text-sm placeholder:text-gray-primary outline-none focus:ring-2 focus:ring-inset focus:ring-black-tertiary"
                                placeholder="Preferred Location"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="Property Type"
                                className="text-sm"
                            >
                                Property Type
                            </label>
                            <input
                                type="text"
                                className="bg-black-secondary border border-black-tertiary text-gray-tertiary w-full py-3 px-4 rounded-md placeholder:text-sm placeholder:text-gray-primary outline-none focus:ring-2 focus:ring-inset focus:ring-black-tertiary"
                                placeholder="Property Type"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="No. of Bathrooms"
                                className="text-sm"
                            >
                                No. of Bathrooms
                            </label>
                            <input
                                type="number"
                                className="bg-black-secondary border border-black-tertiary text-gray-tertiary w-full py-3 px-4 rounded-md placeholder:text-sm placeholder:text-gray-primary outline-none focus:ring-2 focus:ring-inset focus:ring-black-tertiary"
                                placeholder="No. of Bathrooms"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="No. of Bedrooms"
                                className="text-sm"
                            >
                                No. of Bedrooms
                            </label>
                            <input
                                type="number"
                                className="bg-black-secondary border border-black-tertiary text-gray-tertiary w-full py-3 px-4 rounded-md placeholder:text-sm placeholder:text-gray-primary outline-none focus:ring-2 focus:ring-inset focus:ring-black-tertiary"
                                placeholder="No. of Bedrooms"
                            />
                        </div>
                    </div>

                    {/* Input G3  */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="flex flex-col md:col-span-2 gap-2">
                            <label
                                htmlFor="Budget"
                                className="text-sm"
                            >
                                Budget
                            </label>
                            <input
                                type="text"
                                className="bg-black-secondary border border-black-tertiary text-gray-tertiary w-full py-3 px-4 rounded-md placeholder:text-sm placeholder:text-gray-primary outline-none focus:ring-2 focus:ring-inset focus:ring-black-tertiary"
                                placeholder="Budget"
                            />
                        </div>
                        <div className="flex flex-col md:flex-row md:col-span-2 gap-4">
                            <div className="flex flex-col gap-2 w-full">
                                <label
                                    htmlFor="Preferred Contact Method"
                                    className="text-sm"
                                >
                                    Preferred Contact Method
                                </label>
                                <input
                                    type="text"
                                    className="bg-black-secondary border border-black-tertiary text-gray-tertiary w-full py-3 px-4 rounded-md placeholder:text-sm placeholder:text-gray-primary outline-none focus:ring-2 focus:ring-inset focus:ring-black-tertiary"
                                    placeholder="Phone Number"
                                />
                            </div>
                            <div className="flex flex-col gap-2 w-full">
                                <label
                                    htmlFor="Email"
                                    className="text-sm"
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    className="bg-black-secondary border border-black-tertiary text-gray-tertiary w-full py-3 px-4 rounded-md placeholder:text-sm placeholder:text-gray-primary outline-none focus:ring-2 focus:ring-inset focus:ring-black-tertiary"
                                    placeholder="Email"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <label
                            htmlFor="Message"
                            className="text-sm"
                        >
                            Message
                        </label>
                        <textarea
                            name="Message"
                            id="message"
                            placeholder="Message"
                            className="bg-black-secondary border border-black-tertiary text-gray-tertiary md:min-h-60 w-full py-3 px-4 rounded-md placeholder:text-sm placeholder:text-gray-primary outline-none focus:ring-2 focus:ring-inset focus:ring-black-tertiary resize-none"
                        ></textarea>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 md:justify-between md:items-center gap-4">
                        <div className="flex items-center gap-2 md:col-span-3 text-gray-quaternary">
                            <label className="flex items-center space-x-2 cursor-pointer">
                                <input type="checkbox" className="peer hidden" />
                                <div className="w-5 h-5 border-2 border-gray-400 rounded-md peer-checked:bg-purple-primary"></div>
                            </label>
                            <label htmlFor="I agree with Terms and Conditions">I agree with Terms and Conditions</label>
                        </div>
                        <button className="bg-purple-primary w-full py-3 px-4 rounded-md">Send Your Message</button>
                    </div>
                </form>
            </div>
            <CTA />
        </main>
    );
}

export default Properties;