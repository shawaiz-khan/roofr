/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import stars from "@/assets/svg/Stars.svg";
import React, { useState } from "react";
import useUser from "@/hooks/useUser";
import axiosInstance from "@/lib/axios";

interface IPropertyForm {
    owner: string;
    title: string;
    description: string;
    location: string;
    bedrooms: number;
    bathrooms: number;
    area: number;
    keyFeatures: string;
    category: string;
    totalPrice: number;
    images: string;
}

const PostProperty: React.FC = () => {
    const { user } = useUser();

    const [formData, setFormData] = useState<IPropertyForm>({
        owner: user?._id || "",
        title: "",
        description: "",
        location: "",
        bedrooms: 0,
        bathrooms: 0,
        area: 0,
        keyFeatures: "",
        category: "",
        totalPrice: 0,
        images: "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev, [name]: name === "bedrooms" || name === "bathrooms" || name === "area" || name === "totalPrice" ? Number(value) : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!user?._id) {
            alert("User not authenticated.");
            return;
        }

        const {
            title,
            description,
            location,
            bedrooms,
            bathrooms,
            area,
            keyFeatures,
            category,
            totalPrice,
            images
        } = formData;

        if (
            !title.trim() ||
            !description.trim() ||
            !location.trim() ||
            !category.trim() ||
            !keyFeatures.trim()
        ) {
            alert("Please fill in all required fields.");
            return;
        }

        if (
            bedrooms <= 0 ||
            bathrooms <= 0 ||
            area <= 0 ||
            totalPrice <= 0
        ) {
            alert("Bedrooms, bathrooms, area, and price must be greater than 0.");
            return;
        }

        const payload = {
            ...formData,
            owner: user._id,
            images: images.split(',').map((img) => img.trim()),
            keyFeatures: keyFeatures.split(',').map((feature) => feature.trim()),
        };

        try {
            const res = await axiosInstance.post("api/properties/add", payload) as any;
            console.log(payload);

            setFormData({
                owner: user._id,
                title: "",
                description: "",
                location: "",
                bedrooms: 0,
                bathrooms: 0,
                area: 0,
                keyFeatures: "",
                category: "",
                totalPrice: 0,
                images: "",
            });

            console.log(res.data.property);
        } catch (error) {
            console.error("Submission failed:", error);
            alert("Something went wrong while submitting the property.");
        }
    };

    return (
        <main className="min-h-screen bg-black-primary text-text-light">
            <div className="p-5 flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                    <Image src={stars} alt="Featured Properties" />
                    <h1 className="text-2xl">Let&apos;s Make This Happen!</h1>
                    <p className="text-sm text-gray-quaternary">
                        Provide the details for your property listing. Make it shine.
                    </p>
                </div>
                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-1 border border-black-tertiary rounded-lg p-5 gap-4"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="title" className="text-sm">Title</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Elegant 3BR Apartment"
                                className="bg-black-secondary border border-black-tertiary text-gray-tertiary w-full py-3 px-4 rounded-md placeholder:text-sm placeholder:text-gray-primary outline-none"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="location" className="text-sm">Location</label>
                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                placeholder="Gulberg, Lahore"
                                className="bg-black-secondary border border-black-tertiary text-gray-tertiary w-full py-3 px-4 rounded-md placeholder:text-sm placeholder:text-gray-primary outline-none"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="bedrooms" className="text-sm">Bedrooms</label>
                            <input
                                type="number"
                                name="bedrooms"
                                value={formData.bedrooms}
                                onChange={handleChange}
                                placeholder="3"
                                className="bg-black-secondary border border-black-tertiary text-gray-tertiary w-full py-3 px-4 rounded-md placeholder:text-sm placeholder:text-gray-primary outline-none"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="bathrooms" className="text-sm">Bathrooms</label>
                            <input
                                type="number"
                                name="bathrooms"
                                value={formData.bathrooms}
                                onChange={handleChange}
                                placeholder="2"
                                className="bg-black-secondary border border-black-tertiary text-gray-tertiary w-full py-3 px-4 rounded-md placeholder:text-sm placeholder:text-gray-primary outline-none"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="area" className="text-sm">Area (sq ft)</label>
                            <input
                                type="number"
                                name="area"
                                value={formData.area}
                                onChange={handleChange}
                                placeholder="1200"
                                className="bg-black-secondary border border-black-tertiary text-gray-tertiary w-full py-3 px-4 rounded-md placeholder:text-sm placeholder:text-gray-primary outline-none"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="category" className="text-sm">Category</label>
                            <input
                                type="text"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                placeholder="Residential / Commercial"
                                className="bg-black-secondary border border-black-tertiary text-gray-tertiary w-full py-3 px-4 rounded-md placeholder:text-sm placeholder:text-gray-primary outline-none"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="totalPrice" className="text-sm">Total Price (PKR)</label>
                            <input
                                type="number"
                                name="totalPrice"
                                value={formData.totalPrice}
                                onChange={handleChange}
                                placeholder="15000000"
                                className="bg-black-secondary border border-black-tertiary text-gray-tertiary w-full py-3 px-4 rounded-md placeholder:text-sm placeholder:text-gray-primary outline-none"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="description" className="text-sm">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="A beautiful 3 bedroom apartment located in the heart of Lahore..."
                            className="bg-black-secondary border border-black-tertiary text-gray-tertiary md:min-h-40 w-full py-3 px-4 rounded-md placeholder:text-sm placeholder:text-gray-primary outline-none resize-none"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="keyFeatures" className="text-sm">Key Features (comma separated)</label>
                        <input
                            type="text"
                            name="keyFeatures"
                            value={formData.keyFeatures}
                            onChange={handleChange}
                            placeholder="Parking, Balcony, Near Park"
                            className="bg-black-secondary border border-black-tertiary text-gray-tertiary w-full py-3 px-4 rounded-md placeholder:text-sm placeholder:text-gray-primary outline-none"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="images" className="text-sm">Image URLs (comma separated)</label>
                        <input
                            type="text"
                            name="images"
                            value={formData.images}
                            onChange={handleChange}
                            placeholder="https://img1.jpg, https://img2.jpg"
                            className="bg-black-secondary border border-black-tertiary text-gray-tertiary w-full py-3 px-4 rounded-md placeholder:text-sm placeholder:text-gray-primary outline-none"
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-purple-primary w-full py-3 px-4 rounded-md text-white mt-4"
                    >
                        Submit Property
                    </button>
                </form>
            </div>
        </main>
    );
};

export default PostProperty;