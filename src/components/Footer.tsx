import Logo from '@/assets/svg/logo.svg';
import SendIcon from '@/assets/svg/Send.svg';
import MailIcon from '@/assets/svg/Mail.svg';
import Image from 'next/image';

const Footer: React.FC = () => {
    return (
        <div className="p-5 bg-black-primary border-t border-black-tertiary flex flex-col gap-10">
            <div className="flex flex-col gap-5">
                <div className="flex items-end gap-2">
                    <Image src={Logo} alt="Roofr Logo" className="w-10" />
                    <h1 className="text-2xl text-text-light leading-none">Roofr</h1>
                </div>
                <div className='relative flex w-full'>
                    <Image src={MailIcon} alt="Mail Image" className="absolute left-4 top-1/2 -translate-y-1/2 w-5" />
                    <input
                        type="text"
                        placeholder='Enter Your Email'
                        className='bg-transparent border border-black-tertiary w-full pl-11 pr-10 py-3 rounded-md placeholder:text-sm placeholder:text-gray-tertiary outline-none focus:ring-2 focus:ring-inset focus:ring-gray-quaternary'
                    />
                    <button className='absolute right-4 top-1/2 -translate-y-1/2'>
                        <Image src={SendIcon} alt="Send Message" className="w-5" title='Send Message' />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Footer;