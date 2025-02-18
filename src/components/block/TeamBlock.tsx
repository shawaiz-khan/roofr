import DevImg from '@/assets/images/devImage.jpg';
import { Instagram, Send } from 'lucide-react';
import Image from "next/image";

const TeamBlock: React.FC = () => {
    return (
        <main className='border border-black-tertiary w-full p-5 flex flex-col items-center justify-center rounded-lg gap-5'>
            <div className='relative'>
                <Image
                    src={DevImg}
                    alt='Meet the Developer - Shawaiz Khan'
                    className='rounded-md max-w-72'
                />
                <button className='bg-purple-primary px-5 py-2 rounded-full absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2'>
                    <Instagram />
                </button>
            </div>
            <div className='text-center mt-4'>
                <h1 className='text-xl'>Shawaiz Khan</h1>
                <p className='text-sm text-gray-quaternary'>Developer</p>
            </div>
            <div className='relative w-full'>
                <input
                    type="text"
                    placeholder='Say Hello'
                    className='bg-transparent border border-black-tertiary text-gray-tertiary w-full py-5 px-4 pr-16 rounded-full placeholder:text-sm placeholder:text-gray-primary outline-none focus:ring-2 focus:ring-inset focus:ring-black-tertiary'
                />
                <div className='absolute right-2 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center'>
                    <span className='bg-purple-primary w-full h-full rounded-full'></span>
                    <Send className='absolute text-white' size={22} />
                </div>
            </div>
        </main>
    );
}

export default TeamBlock;