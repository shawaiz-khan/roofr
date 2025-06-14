import { StaticImageData } from "next/image";

export default interface EstateTypes {
    _id: string;
    title: string;
    owner: string;
    images?: string[] | StaticImageData[] | string | StaticImageData;
    image?: string | StaticImageData;
    description: string;
    location: string;
    bedrooms: number;
    bathrooms: number;
    area: number;
    keyFeatures: string[];
    category: string;
    pricing: {
        additionalFees: {
            transferTax: number;
            legalFees: number;
            homeInspection: number;
            propertyInsurance: number;
        };
        monthlyCosts: {
            propertyTaxes: number;
            homeOwnerAssociationFees: number;
        };
        totalInitialCosts: {
            listingPrice: number;
            downPayment: number;
        };
        monthlyExpenses: {
            propertyInsurance: number;
            downPayment: number;
        };
    };
    totalPrice: number;
}