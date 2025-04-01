/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAccessToken } from "@/helpers/getCookies";
import { verifyJwt } from "@/helpers/jwtHelpers";
import PropertyModel from "@/models/Property";
import { StatusCodes } from "http-status-codes";
import { NextRequest, NextResponse } from "next/server";

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

        const newProperty = new PropertyModel({
            ...propertyData
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