import mongoose from "mongoose";
import { UserDocument } from "./user.interface";

export interface ArtistInput {
    user: UserDocument["_id"];
    name: string;
    description: string;
    image: string;
}
export interface ArtistDocument extends ArtistInput, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
}
