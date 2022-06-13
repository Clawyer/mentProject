import { object, number, string, TypeOf } from "zod";

/**
 * @openapi
 * components:
 *   schema:
 *     Artist:
 *       type: object
 *       required:
 *        - title
 *        - description
 *        - price
 *        - image
 *       properties:
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         image:
 *           type: string
 */

const payload = {
    body: object({
        name: string({
            required_error: "Name is required",
        }),
        description: string({
            required_error: "Description is required",
        }),
        image: string({
            required_error: "Image is required",
        }),
    }),
};

const params = {
    params: object({
        artistId: string({
            required_error: "artistId is required",
        }),
    }),
};

export const createArtistSchema = object({
    ...payload,
});

export const updateArtistSchema = object({
    ...payload,
    ...params,
});

export const deleteArtistSchema = object({
    ...params,
});

export const getArtistSchema = object({
    ...params,
});

export type CreateArtistInput = TypeOf<typeof createArtistSchema>;
export type UpdateArtistInput = TypeOf<typeof updateArtistSchema>;
export type ReadArtistInput = TypeOf<typeof getArtistSchema>;
export type DeleteArtistInput = TypeOf<typeof deleteArtistSchema>;
