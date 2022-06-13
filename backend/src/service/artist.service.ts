import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import ArtistModel from "../models/artist.model";
import {
    ArtistDocument,
    ArtistInput,
} from "../interfaces/artist.interface";
import { databaseResponseTimeHistogram } from "../utils/metrics";

export async function createArtist(input: ArtistInput) {
    const metricsLabels = {
        operation: "createArtist",
    };

    const timer = databaseResponseTimeHistogram.startTimer();
    try {
        const result = await ArtistModel.create(input);
        timer({ ...metricsLabels, success: "true" });
        return result;
    } catch (e) {
        timer({ ...metricsLabels, success: "false" });
        throw e;
    }
}

export async function findArtist(
    query: FilterQuery<ArtistDocument>,
    options: QueryOptions = { lean: true }
) {
    const metricsLabels = {
        operation: "findArtist",
    };

    const timer = databaseResponseTimeHistogram.startTimer();
    try {
        const result = await ArtistModel.findOne(query, {}, options);
        timer({ ...metricsLabels, success: "true" });
        return result;
    } catch (e) {
        timer({ ...metricsLabels, success: "false" });

        throw e;
    }
}

export async function findAndUpdateArtist(
    query: FilterQuery<ArtistDocument>,
    update: UpdateQuery<ArtistDocument>,
    options: QueryOptions
) {
    return ArtistModel.findOneAndUpdate(query, update, options);
}

export async function deleteArtist(query: FilterQuery<ArtistDocument>) {
    return ArtistModel.deleteOne(query);
}
