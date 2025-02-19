import abt_cover from '@/assets/svg/about_cover.svg';
import abt_bg_cover from '@/assets/svg/Background Graphics.svg';
import stars from "@/assets/svg/Stars.svg";
import { AboutFeatureList } from '@/components/block/AboutFeaturesList';
import AchievementBlock from '@/components/block/AchievementBlock';
import CTA from '@/components/block/CTA';
import ExperienceBlock from '@/components/block/ExperienceBlock';
import RatingBlock from '@/components/block/RatingBlock';
import TeamBlock from '@/components/block/TeamBlock';
import Image from 'next/image';

const About: React.FC = () => {
    return (
        <main className="min-h-screen bg-black-primary text-text-light flex flex-col gap-10">
            <div className='p-5 md:p-10 flex flex-col justify-center items-center gap-10 md:gap-16'>
                {/* About Hero  */}
                <div className='md:grid md:grid-cols-2 flex flex-col justify-center items-center gap-10'>
                    <div className='w-full md:order-2 flex justify-end items-center'>
                        <div className='border border-black-tertiary rounded-xl relative overflow-hidden md:max-w-96'>
                            <Image
                                src={abt_cover}
                                alt='About Roofr'
                                className='relative z-10'
                            />

                            <Image
                                src={abt_bg_cover}
                                alt='About Roofr'
                                layout='fill'
                                className='absolute inset-0 object-cover opacity-60'
                            />
                        </div>
                    </div>
                    {/* Journey  */}
                    <div className='flex flex-col gap-10 md:gap-16'>
                        <div className="flex flex-col gap-2">
                            <Image src={stars} alt="What our client says" />
                            <h1 className="text-2xl md:text-3xl">Our Journey</h1>
                            <p className="text-sm md:text-md text-gray-quaternary md:w-[90%]">
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
                    </div>
                </div>
                {/* Values  */}
                <div className='w-full md:grid md:grid-cols-2 flex flex-col justify-center items-center gap-10'>
                    <div className="flex flex-col gap-2">
                        <Image src={stars} alt="What our client says" />
                        <h1 className="text-2xl md:text-3xl">Our Values</h1>
                        <p className="text-sm md:text-md text-gray-quaternary md:w-[80%]">
                            Our story is one of continuous growth and evolution. We started as a small team with big dreams,
                            determined to create a real estate platform that transcended the ordinary.
                        </p>
                    </div>
                    <div className='bg-black-primary flex flex-col md:grid md:grid-cols-2 md:grid-rows-2 md:p-8 p-5 rounded-md shadow-[0_0_10px_#262626] custom-divider'>
                        <AboutFeatureList />
                    </div>
                </div>
                {/* Achievements  */}
                <div className='w-full flex flex-col gap-10 md:gap-16'>
                    <div className="flex flex-col gap-2">
                        <Image src={stars} alt="What our client says" />
                        <h1 className="text-2xl md:text-3xl">Our Achievements</h1>
                        <p className="text-sm md:text-md text-gray-quaternary md:w-[80%]">
                            Our story is one of continuous growth and evolution. We started as a small team
                            with big dreams, determined to create a real estate platform that transcended the ordinary.
                        </p>
                    </div>
                    <AchievementBlock />
                </div>
                {/* Experience  */}
                <div className='w-full flex flex-col gap-10 md:gap-16'>
                    <div className="flex flex-col gap-2">
                        <Image src={stars} alt="What our client says" />
                        <h1 className="text-2xl">Navigating the Roofr Experience</h1>
                        <p className="text-sm text-gray-quaternary md:w-[80%]">
                            At Roofr, we have designed a straightforward process to help you find and purchase your dream property with ease.
                            Here is a step-by-step guide to how it all works.
                        </p>
                    </div>
                    <ExperienceBlock />
                </div>
                {/* Developer  */}
                <div className='w-full flex flex-col gap-10 md:gap-16'>
                    <div className="flex flex-col gap-2">
                        <Image src={stars} alt="What our client says" />
                        <h1 className="text-2xl">Meet the Developer</h1>
                        <p className="text-sm text-gray-quaternary md:w-[80%]">
                            At Roofr, our success is driven by the dedication and expertise of our team. Get to know the people behind our
                            mission to make your real estate dreams a reality.
                        </p>
                    </div>
                    <TeamBlock />
                </div>
            </div>
            {/* CTA  */}
            <CTA />
        </main>
    );
}

export default About;