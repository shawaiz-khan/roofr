interface IPriceRanges {
    label: string;
    min: number;
    max: number;
}

export const priceRanges: IPriceRanges[] = [
    { label: "All Prices", min: 0, max: Infinity },
    { label: "₨0 - ₨1M", min: 0, max: 1000000 },
    { label: "₨1M - ₨5M", min: 1000000, max: 5000000 },
    { label: "₨5M - ₨10M", min: 5000000, max: 10000000 },
    { label: "₨10M+", min: 10000000, max: Infinity },
];