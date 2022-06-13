import { Request, Response } from "express";
import {
    CreateSongInput,
    UpdateSongInput,
} from "../schema/song.schema";
import {
    createSong,
    deleteSong,
    findAndUpdateSong,
    findSong,
} from "../service/song.service";
import log from "../utils/logger";

export async function createSongHandler(
    req: Request<{}, {}, CreateSongInput["body"]>,
    res: Response
) {

    const userId = res.locals.user._id;


    const body = req.body;

    const song = await createSong({ ...body, user: userId});

    return res.send(song);
}

export async function updateSongHandler(
    req: Request<UpdateSongInput["params"]>,
    res: Response
) {
    const userId = res.locals.user._id;

    const songId = req.params.songId;
    const update = req.body;

    const song = await findSong({ songId });

    if (!song) {
        return res.sendStatus(404);
    }

    if (String(song.user) !== userId) {
        return res.sendStatus(403);
    }

    const updatedSong = await findAndUpdateSong({ songId }, update, {
        new: true,
    });

    return res.send(updatedSong);
}

export async function getSongHandler(
    req: Request<UpdateSongInput["params"]>,
    res: Response
) {
    const songId = req.params.songId;
    const song = await findSong({ songId });

    if (!song) {
        return res.sendStatus(404);
    }

    return res.send(song);
}

export async function deleteSongHandler(
    req: Request<UpdateSongInput["params"]>,
    res: Response
) {
    const userId = res.locals.user._id;
    const songId = req.params.songId;

    const song = await findSong({ songId });

    if (!song) {
        return res.sendStatus(404);
    }

    if (String(song.user) !== userId) {
        return res.sendStatus(403);
    }

    await deleteSong({ songId });

    return res.sendStatus(200);
}
