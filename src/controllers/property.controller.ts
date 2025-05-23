/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAccessToken } from "@/helpers/getCookies";
import { verifyJwt } from "@/helpers/jwtHelpers";
import { uploadImageToCloudinary } from "@/lib/imageUpload";
import PropertyModel from "@/models/Property";
import { fetchProperties } from "@/services/property.service";
import { StatusCodes } from "http-status-codes";
import { NextRequest, NextResponse } from "next/server";

export const Get_Property = async (request: NextRequest) => {
    try {
        const data = await fetchProperties();
        return NextResponse.json({
            status: StatusCodes.OK,
            message: "Properties are fetched",
            data
        });
    } catch (error: any) {
        return NextResponse.json({
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            message: "Internal server error"
        })
    }
}

export const Add_Property = async (request: NextRequest, propertyData: any) => {
    try {

        if (!propertyData) {
            return NextResponse.json({
                status: StatusCodes.BAD_REQUEST,
                message: "All fields are required"
            });
        }

        const res = await getAccessToken();
        const accessToken = res?.value;

        if (!accessToken) {
            return NextResponse.json({
                status: StatusCodes.UNAUTHORIZED,
                message: "User is not authorized"
            });
        }

        const user = await verifyJwt(accessToken, "access");

        if (user.id !== propertyData.owner) {
            return NextResponse.json({
                status: StatusCodes.UNAUTHORIZED,
                message: "User is not authorized"
            });
        }

        const { images } = propertyData;
        console.log("images", images);

        const imageUrl = await uploadImageToCloudinary(images);
        console.log("imageUrl", imageUrl);

        const newProperty = new PropertyModel({
            ...propertyData,
            image: imageUrl,
        });

        await newProperty.save();

        return NextResponse.json({
            status: StatusCodes.CREATED,
            message: "Property is Added",
            property: {
                title: newProperty.title,
                location: newProperty.location,
            }
        });

    } catch (err: any) {
        return NextResponse.json({
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            message: err?.message || "Internal Server Error"
        })
    }
}