import { StaticImport } from "next/dist/shared/lib/get-img-props";

export default interface FeatureBlockTypes {
    title: string,
    icon: string | StaticImport;
}