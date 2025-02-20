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
        location: "Lakeview Estate, California",
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
        location: "Maplewood Subdivision, Texas",
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
        location: "Downtown Metro, New York",
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
    },
    {
        title: "Modern Suburban House",
        images: [Img_1, Img_2],
        description: "A stylish 5-bedroom house with an open floor plan and green surroundings.",
        location: "Greenwood Estate, Florida",
        bedrooms: 5,
        bathrooms: 4,
        area: 4000,
        category: "House",
        keyFeatures: ["Open Floor Plan", "Green Belt Access", "Energy Efficient", "Double Garage"],
        pricing: {
            additionalFees: {
                transferTax: 8000,
                legalFees: 5000,
                homeInspection: 750,
                propertyInsurance: 1800
            },
            monthlyCosts: {
                propertyTaxes: 400,
                homeOwnerAssociationFees: 250
            },
            totalInitialCosts: {
                listingPrice: 800000,
                downPayment: 80000
            },
            monthlyExpenses: {
                propertyInsurance: 150,
                downPayment: 4000
            }
        },
        totalPrice: 800000 + 8000 + 5000 + 750 + 1800
    },
    {
        title: "Penthouse Suite",
        images: [Img_3, Img_4],
        description: "A high-end penthouse with breathtaking skyline views and exclusive amenities.",
        location: "Skyline Tower, Los Angeles",
        bedrooms: 3,
        bathrooms: 3,
        area: 2800,
        category: "Penthouse",
        keyFeatures: ["Rooftop Terrace", "Luxury Finishes", "Private Elevator", "Smart Home Technology"],
        pricing: {
            additionalFees: {
                transferTax: 9000,
                legalFees: 5500,
                homeInspection: 800,
                propertyInsurance: 2000
            },
            monthlyCosts: {
                propertyTaxes: 450,
                homeOwnerAssociationFees: 300
            },
            totalInitialCosts: {
                listingPrice: 950000,
                downPayment: 95000
            },
            monthlyExpenses: {
                propertyInsurance: 180,
                downPayment: 4750
            }
        },
        totalPrice: 950000 + 9000 + 5500 + 800 + 2000
    }
];

export default estates;