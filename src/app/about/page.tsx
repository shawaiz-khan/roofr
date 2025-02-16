import abt_cover from '@/assets/svg/about_cover.svg';
import abt_bg_cover from '@/assets/svg/Background Graphics.svg';
import stars from "@/assets/svg/Stars.svg";
import RatingBlock from '@/components/RatingBlock';
import { AboutFeatures } from '@/data/features';
import Image from 'next/image';

const About: React.FC = () => {
    return (
        <main className="min-h-screen bg-black-primary text-text-light flex flex-col items-center px-5 py-10 gap-10">
            <div className='border border-black-tertiary rounded-xl relative overflow-hidden'>
                <Image
                    src={abt_cover}
                    alt='About Roofr'
                    className='relative'
                />

                <Image
                    src={abt_bg_cover}
                    alt='About Roofr'
                    layout='fill'
                    className='absolute inset-0 object-cover opacity-60'
                />
            </div>
            <div className="flex flex-col gap-2">
                <Image src={stars} alt="What our client says" />
                <h1 className="text-2xl">Our Journey</h1>
                <p className="text-sm text-gray-quaternary md:w-[90%]">
                    Our story is one of continuous growth and evolution. We started as a small team with big dreams,
                    determined to create a real estate platform that transcended the ordinary. Over the years, we have
                    expanded our reach, forged valuable partnerships, and gained the trust of countless clients.
                </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 w-full">
                <RatingBlock count={200} text="Happy Customers" />
                <RatingBlock count="10k" text="Properties For Clients" />
                <div className="col-span-2 md:col-span-1">
                    <RatingBlock count={16} text="Years of Experience" />
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <Image src={stars} alt="What our client says" />
                <h1 className="text-2xl">Our Values</h1>
                <p className="text-sm text-gray-quaternary md:w-[90%]">
                    Our story is one of continuous growth and evolution. We started as a small team with big dreams,
                    determined to create a real estate platform that transcended the ordinary.
                </p>
            </div>
            <div className='bg-black-primary flex flex-col p-5 gap-3 rounded-md shadow-[0_0_10px_#262626]'>
                <AboutFeatureList />
            </div>
        </main>
    );
}

export default About;


const AboutFeatureList: React.FC = () => {
    return (
        <>
            {AboutFeatures.map((feature) => (
                <div key={feature.title} className='flex flex-col justify-start items-center gap-3'>
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
                    <span className='w-[95%] border border-black-tertiary my-2'></span>
                </div>
            ))}
        </>
    );
}