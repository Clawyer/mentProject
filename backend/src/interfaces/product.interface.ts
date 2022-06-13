import mongoose from "mongoose";
import { UserDocument } from "./user.interface";


export interface ProductInput {
    user: UserDocument["_id"];
    title: string;
    description: string;
    price: number;
    image: string;
}

export interface ProductDocument extends ProductInput, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
}