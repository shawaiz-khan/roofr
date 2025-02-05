import { StaticImport } from "next/dist/shared/lib/get-img-props";

export default interface FeatureBlockProps {
    title: string,
    icon: string | StaticImport;
}