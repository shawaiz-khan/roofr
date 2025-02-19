import Img_1 from '@/assets/images/es_1.jpg';
import Img_2 from '@/assets/images/es_2.jpg';
import Img_3 from '@/assets/images/es_3.jpg';
import Img_4 from '@/assets/images/es_4.jpg';
import Img_5 from '@/assets/images/es_5.jpg';
import Img_6 from '@/assets/images/es_6.jpg';

import Estate from "@/types/estate.types";

const estates: Estate[] = [
    {
        title: "Luxury Lakefront Villa",
        images: [Img_1, Img_2],
        description: "A luxurious 3-bedroom villa with a stunning lake view and modern amenities.",
        bedrooms: 3,
        bathrooms: 2,
        area: 2500,
        category: "Villa",
        keyFeatures: ["Lake View", "Swimming Pool", "Modern Kitchen", "Private Garden"],
        pricing: {
            additionalFees: {
                transferTax: 5000,
                legalFees: 3000,
                homeInspection: 600,
                propertyInsurance: 1200
            },
            monthlyCosts: {
                propertyTaxes: 250,
                homeOwnerAssociationFees: 150
            },
            totalInitialCosts: {
                listingPrice: 500000,
                downPayment: 50000
            },
            monthlyExpenses: {
                propertyInsurance: 100,
                downPayment: 2500
            }
        },
        totalPrice: 500000 + 5000 + 3000 + 600 + 1200
    },
    {
        title: "Spacious Family Home",
        images: [Img_3, Img_4],
        description: "A spacious 4-bedroom family home in a peaceful neighborhood, close to schools and parks.",
        bedrooms: 4,
        bathrooms: 3,
        area: 3200,
        category: "Home",
        keyFeatures: ["Large Backyard", "Garage", "Smart Home System", "Solar Panels"],
        pricing: {
            additionalFees: {
                transferTax: 7000,
                legalFees: 4500,
                homeInspection: 700,
                propertyInsurance: 1500
            },
            monthlyCosts: {
                propertyTaxes: 300,
                homeOwnerAssociationFees: 200
            },
            totalInitialCosts: {
                listingPrice: 650000,
                downPayment: 65000
            },
            monthlyExpenses: {
                propertyInsurance: 120,
                downPayment: 3250
            }
        },
        totalPrice: 650000 + 7000 + 4500 + 700 + 1500
    },
    {
        title: "Cozy City Apartment",
        images: [Img_5, Img_6],
        description: "A cozy 2-bedroom apartment in the city center, perfect for professionals and small families.",
        bedrooms: 2,
        bathrooms: 1,
        area: 1200,
        category: "Apartment",
        keyFeatures: ["City View", "Fitness Center", "24/7 Security", "Underground Parking"],
        pricing: {
            additionalFees: {
                transferTax: 4000,
                legalFees: 2500,
                homeInspection: 500,
                propertyInsurance: 900
            },
            monthlyCosts: {
                propertyTaxes: 180,
                homeOwnerAssociationFees: 120
            },
            totalInitialCosts: {
                listingPrice: 350000,
                downPayment: 35000
            },
            monthlyExpenses: {
                propertyInsurance: 90,
                downPayment: 1750
            }
        },
        totalPrice: 350000 + 4000 + 2500 + 500 + 900
    }
];

export default estates;