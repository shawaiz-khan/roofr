import { StaticImport } from "next/dist/shared/lib/get-img-props";

export interface FeatureBlockTypes {
    title: string,
    icon: string | StaticImport;
}
export interface AboutFeatureBlockTypes {
    title: string,
    description: string,
    icon: string | StaticImport;
}