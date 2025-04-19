import { z } from "zod";

const collectionListSchema = z.object({
  collections: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      uid: z.string(),
      updatedAt: z.string(),
    })
  ),
});

const collectionDetailSchema = z.object({
  collection: z.object({
    info: z.object({
      name: z.string(),
      _postman_id: z.string(),
    }),
    item: z.array(z.any()),
  }),
});

export { collectionDetailSchema, collectionListSchema };
