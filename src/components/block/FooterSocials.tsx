import { Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';
import Link from 'next/link';

const FooterSocials: React.FC = () => {
    const newDate = new Date().getFullYear().toString();

    return (
        <div className="bg-black-secondary py-5 md:py-3 px-10 max-h-48 flex flex-col md:flex-row-reverse items-center justify-center md:justify-between gap-5">
            <div className='flex items-center justify-center gap-3'>
                <Link href={'/'} className="relative w-14 h-14 md:w-12 md:h-12 flex items-center justify-center hover:scale-105 duration-300 ease-in">
                    <span className="bg-black-primary absolute inset-0 m-auto h-14 w-14 md:w-12 md:h-12 rounded-full"></span>
                    <Instagram className="relative z-10 text-text-light" />
                </Link>
                <Link href={'/'} className="relative w-14 h-14 md:w-12 md:h-12 flex items-center justify-center hover:scale-105 duration-300 ease-in">
                    <span className="bg-black-primary absolute inset-0 m-auto h-14 w-14 md:w-12 md:h-12 rounded-full"></span>
                    <Linkedin className="relative z-10 text-text-light" />
                </Link>
                <Link href={'/'} className="relative w-14 h-14 md:w-12 md:h-12 flex items-center justify-center hover:scale-105 duration-300 ease-in">
                    <span className="bg-black-primary absolute inset-0 m-auto h-14 w-14 md:w-12 md:h-12 rounded-full"></span>
                    <Facebook className="relative z-10 text-text-light" />
                </Link>
                <Link href={'/'} className="relative w-14 h-14 md:w-12 md:h-12 flex items-center justify-center hover:scale-105 duration-300 ease-in">
                    <span className="bg-black-primary absolute inset-0 m-auto h-14 w-14 md:w-12 md:h-12 rounded-full"></span>
                    <Youtube className="relative z-10 text-text-light" />
                </Link>
            </div>
            <div className='flex flex-col md:flex-row justify-center items-center text-text-light text-sm gap-2'>
                <h1>&copy; {newDate} Roofr. All Rights Reserved.</h1>
                <Link href={'/'}><span className='cursor-pointer'>Terms & Conditions</span></Link>
            </div>
        </div>
    );
}

export default FooterSocials;