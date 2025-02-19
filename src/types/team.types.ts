import { StaticImageData } from "next/image";

export default interface TeamTypes {
    name: string;
    role: string;
    image: StaticImageData | string;
}