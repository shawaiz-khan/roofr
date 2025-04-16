/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import PropertyModel from "@/models/Property";

export const fetchProperties = async () => {
    try {
        const properties = await PropertyModel.find();

        return properties;
    } catch (error: any) {
        throw new Error("Error fetching properties");
    }
}