import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import SongModel from "../models/song.model";
import {
    SongDocument,
    SongInput,
} from "../interfaces/song.interface";
import { databaseResponseTimeHistogram } from "../utils/metrics";

export async function createSong(input: SongInput) {
    const metricsLabels = {
        operation: "createSong",
    };

    const timer = databaseResponseTimeHistogram.startTimer();
    try {
        const result = await SongModel.create(input);
        timer({ ...metricsLabels, success: "true" });
        return result;
    } catch (e) {
        timer({ ...metricsLabels, success: "false" });
        throw e;
    }
}

export async function findSong(
    query: FilterQuery<SongDocument>,
    options: QueryOptions = { lean: true }
) {
    const metricsLabels = {
        operation: "findSong",
    };

    const timer = databaseResponseTimeHistogram.startTimer();
    try {
        const result = await SongModel.findOne(query, {}, options);
        timer({ ...metricsLabels, success: "true" });
        return result;
    } catch (e) {
        timer({ ...metricsLabels, success: "false" });

        throw e;
    }
}

export async function findAndUpdateSong(
    query: FilterQuery<SongDocument>,
    update: UpdateQuery<SongDocument>,
    options: QueryOptions
) {
    return SongModel.findOneAndUpdate(query, update, options);
}

export async function deleteSong(query: FilterQuery<SongDocument>) {
    return SongModel.deleteOne(query);
}
