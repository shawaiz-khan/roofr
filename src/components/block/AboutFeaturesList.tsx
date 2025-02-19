import { AboutFeatures } from "@/data/features";
import Image from "next/image";

export const AboutFeatureList: React.FC = () => {
    return (
        <>
            {AboutFeatures.map((feature) => (
                <div key={feature.title} className='flex flex-col justify-start items-center my-2 md:p-3 gap-3'>
                    <div className='flex gap-3 items-center w-full'>
                        <div className='bg-transparent border border-purple-primary rounded-full w-12 h-12 flex justify-center items-center'>
                            <Image
                                src={feature.icon}
                                alt={`${feature.title} Icon`}
                            />
                        </div>
                        <h1>{feature.title}</h1>
                    </div>
                    <p className='text-sm text-gray-quaternary'>{feature.description}</p>
                    <span className='w-[95%] border border-black-tertiary my-2 md:hidden'></span>
                </div>
            ))}
        </>
    );
}