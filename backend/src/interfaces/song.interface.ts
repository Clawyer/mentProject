import mongoose from "mongoose";
import { UserDocument } from "./user.interface";
import { ArtistDocument } from "./artist.interface";


export interface SongInput {
    user: UserDocument["_id"];
    title: string;
    artists: ArtistDocument;
}

export interface SongDocument extends SongInput, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
}