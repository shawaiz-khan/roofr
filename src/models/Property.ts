import mongoose from "mongoose";

const PropertySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    images: {
        type: [String],
        required: true,
        default: [],
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    bedrooms: {
        type: Number,
        required: true
    },
    bathrooms: {
        type: Number,
        required: true
    },
    area: {
        type: Number,
        required: true
    },
    keyFeatures: {
        type: [String],
        required: true
    },
    category: {
        type: String,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    }
}, { timestamps: true });

const PropertyModel = mongoose.models.Property || mongoose.model("Property", PropertySchema);

export default PropertyModel;