import { AboutFeatureBlockTypes, FeatureBlockTypes } from '@/types/feature.types';
import HomeIcon from "@/assets/svg/Home.svg";
import LockIcon from "@/assets/svg/Lock.svg";
import PropertyIcon from "@/assets/svg/Property.svg";
import SunIcon from "@/assets/svg/Sun.svg";

export const Features: FeatureBlockTypes[] = [
    {
        title: "Find Your Dream Home",
        icon: HomeIcon,
    },
    {
        title: "Unlock Property Value",
        icon: LockIcon,
    },
    {
        title: "Effortless Property Management",
        icon: PropertyIcon,
    },
    {
        title: "Smart Investments, Informed Decisions",
        icon: SunIcon,
    },
];

import abt_star from '@/assets/svg/abt_star.svg';
import abt_client from '@/assets/svg/client.svg';
import abt_excellence from '@/assets/svg/excellence.svg';

export const AboutFeatures: AboutFeatureBlockTypes[] = [
    { title: "Trust", description: "Trust is the cornerstone of every successful real estate transaction.", icon: abt_star },
    { title: "Excellence", description: "We set the bar high for ourselves. From the properties we provide.", icon: abt_excellence },
    { title: "Client-Centric", description: "Your dreams and needs are at the center of our universe. We listen, understand.", icon: abt_client },
    { title: "Our Commitment", description: "We are dedicated to providing you with the highest level of service, professionalism", icon: abt_star },
]