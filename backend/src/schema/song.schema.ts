import { object, number, string, TypeOf } from "zod";

/**
 * @openapi
 * components:
 *   schema:
 *     Song:
 *       type: object
 *       required:
 *        - title
 *        - description
 *        - price
 *        - image
 *       properties:
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         price:
 *           type: number
 *         image:
 *           type: string
 */

const payload = {
    body: object({
        title: string({
            required_error: "Title is required",
        }),
        artists: string({
            required_error: "Image is required",
        }),
    }),
};

const params = {
    params: object({
        songId: string({
            required_error: "songId is required",
        }),
    }),
};

export const createSongSchema = object({
    ...payload,
});

export const updateSongSchema = object({
    ...payload,
    ...params,
});

export const deleteSongSchema = object({
    ...params,
});

export const getSongSchema = object({
    ...params,
});

export type CreateSongInput = TypeOf<typeof createSongSchema>;
export type UpdateSongInput = TypeOf<typeof updateSongSchema>;
export type ReadSongInput = TypeOf<typeof getSongSchema>;
export type DeleteSongInput = TypeOf<typeof deleteSongSchema>;
