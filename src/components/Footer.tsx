import Logo from '@/assets/svg/logo.svg';
import SendIcon from '@/assets/svg/Send.svg';
import MailIcon from '@/assets/svg/Mail.svg';
import Image from 'next/image';
import { FooterAboutItems, FooterContactItems, FooterHomeItems, FooterPropertiesItems, FooterServicesItems, FooterUserItems } from '@/constants/footerPaths';
import Link from 'next/link';
import FooterBlock from './FooterBlock';
import FooterSocials from './FooterSocials';

const Footer: React.FC = () => {
    return (
        <div className="pt-10 bg-black-primary border-t border-black-tertiary flex flex-col gap-10">
            <div className='grid grid-cols-1 md:grid-cols-3 gap-10'>
                <div className="px-5 flex flex-col gap-5">
                    <div className="flex items-end gap-2">
                        <Image src={Logo} alt="Roofr Logo" className="w-10" />
                        <h1 className="text-2xl text-text-light leading-none">Roofr</h1>
                    </div>
                    <div className='relative flex w-full'>
                        <Image src={MailIcon} alt="Mail Image" className="absolute left-4 top-1/2 -translate-y-1/2 w-5" />
                        <input
                            type="text"
                            placeholder='Enter Your Email'
                            className='bg-transparent border border-black-tertiary text-gray-tertiary w-full pl-11 pr-10 py-3 rounded-md placeholder:text-sm placeholder:text-gray-primary outline-none focus:ring-2 focus:ring-inset focus:ring-black-tertiary'
                        />
                        <button className='absolute right-4 top-1/2 -translate-y-1/2'>
                            <Image src={SendIcon} alt="Send Message" className="w-5" title='Send Message' />
                        </button>
                    </div>
                </div>

                <div className="px-5 grid grid-cols-2 gap-5 md:gap-3 w-full md:col-span-2">
                    <div className='flex flex-col md:flex-row gap-5 md:gap-3 border-r border-black-tertiary pr-5 md:border-none'>
                        <FooterBlock title="Home">
                            {FooterHomeItems.map((item) => (
                                <Link key={item.path} href={item.path}>
                                    <li className="text-text-light text-sm hover:text-white transition">{item.name}</li>
                                </Link>
                            ))}
                        </FooterBlock>

                        <FooterBlock title="Properties">
                            {FooterPropertiesItems.map((item) => (
                                <Link key={item.path} href={item.path}>
                                    <li className="text-text-light text-sm hover:text-white transition">{item.name}</li>
                                </Link>
                            ))}
                        </FooterBlock>

                        <FooterBlock title="Contact Us">
                            {FooterContactItems.map((item) => (
                                <Link key={item.path} href={item.path}>
                                    <li className="text-text-light text-sm hover:text-white transition">{item.name}</li>
                                </Link>
                            ))}
                        </FooterBlock>
                    </div>

                    <div className='flex flex-col md:flex-row gap-5 md:gap-3'>
                        <FooterBlock title="About Us">
                            {FooterAboutItems.map((item) => (
                                <Link key={item.path} href={item.path}>
                                    <li className="text-text-light text-sm hover:text-white transition">{item.name}</li>
                                </Link>
                            ))}
                        </FooterBlock>

                        <FooterBlock title="Services">
                            {FooterServicesItems.map((item) => (
                                <Link key={item.path} href={item.path}>
                                    <li className="text-text-light text-sm hover:text-white transition">{item.name}</li>
                                </Link>
                            ))}
                        </FooterBlock>

                        <FooterBlock title="Account">
                            {FooterUserItems.map((item) => (
                                <Link key={item.path} href={item.path}>
                                    <li className="text-text-light text-sm hover:text-white transition">{item.name}</li>
                                </Link>
                            ))}
                        </FooterBlock>
                    </div>
                </div>
            </div>

            <FooterSocials />
        </div>
    );
}

export default Footer;
