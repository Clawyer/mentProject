import { Request, Response } from "express";
import {
    CreateArtistInput,
    UpdateArtistInput,
} from "../schema/artist.schema";
import {
    createArtist,
    deleteArtist,
    findAndUpdateArtist,
    findArtist,
} from "../service/artist.service";
import log from "../utils/logger";

export async function createArtistHandler(
    req: Request<{}, {}, CreateArtistInput["body"]>,
    res: Response
) {
    const userId = res.locals.user._id;

    const body = req.body;

    const artist = await createArtist({ ...body, user: userId });

    return res.send(artist);
}

export async function updateArtistHandler(
    req: Request<UpdateArtistInput["params"]>,
    res: Response
) {
    const userId = res.locals.user._id;

    const artistId = req.params.artistId;
    const update = req.body;

    const artist = await findArtist({ artistId });

    if (!artist) {
        return res.sendStatus(404);
    }

    if (String(artist.user) !== userId) {
        return res.sendStatus(403);
    }

    const updatedArtist = await findAndUpdateArtist({ artistId }, update, {
        new: true,
    });

    return res.send(updatedArtist);
}

export async function getArtistHandler(
    req: Request<UpdateArtistInput["params"]>,
    res: Response
) {
    const artistId = req.params.artistId;
    const artist = await findArtist({ artistId });

    if (!artist) {
        return res.sendStatus(404);
    }

    return res.send(artist);
}

export async function deleteArtistHandler(
    req: Request<UpdateArtistInput["params"]>,
    res: Response
) {
    const userId = res.locals.user._id;
    const artistId = req.params.artistId;

    const artist = await findArtist({ artistId });

    if (!artist) {
        return res.sendStatus(404);
    }

    if (String(artist.user) !== userId) {
        return res.sendStatus(403);
    }

    await deleteArtist({ artistId });

    return res.sendStatus(200);
}
