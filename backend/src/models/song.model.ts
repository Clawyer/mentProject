import mongoose from "mongoose";
import { customAlphabet } from "nanoid";
import { UserDocument } from "../interfaces/user.interface";
import { SongDocument } from "../interfaces/song.interface";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);



const songSchema = new mongoose.Schema(
    {
        songId: {
            type: String,
            required: true,
            unique: true,
            default: () => `song_${nanoid()}`,
        },
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        title: { type: String, required: true },
        artists: { type: mongoose.Schema.Types.String,required: true, ref: "Artist" },
    },
    {
        timestamps: true,
    }
);

const SongModel = mongoose.model<SongDocument>("Song", songSchema);

export default SongModel;
