import { StaticImageData } from "next/image";

export default interface EstateTypes {
    title: string;
    images: string[] | StaticImageData[];
    description: string;
    bedrooms: number;
    bathrooms: number;
    area: number;
    keyFeatures: string[];
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