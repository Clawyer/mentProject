import mongoose from "mongoose";
import { UserDocument } from "../interfaces/user.interface";
import { ArtistDocument } from "../interfaces/artist.interface";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);




export const artistSchema = new mongoose.Schema(
    {
        artistId: {
            type: String,
            required: true,
            unique: true,
            default: () => `artist_${nanoid()}`,
        },
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        name: { type: String, required: true },
        description: { type: String, required: true },
        image: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);

const ArtistModel = mongoose.model<ArtistDocument>("Artist", artistSchema);

export default ArtistModel;
