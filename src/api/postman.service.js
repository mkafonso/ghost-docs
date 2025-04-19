import axios from "axios";
import { env } from "../config/env.js";
import {
  collectionDetailSchema,
  collectionListSchema,
} from "../schemas/postman.schemas.js";

class PostmanService {
  constructor() {
    this.baseUrl = env.get("POSTMAN_API_BASE_URL");
    this.headers = { "X-Api-Key": env.get("POSTMAN_API_KEY") };
  }

  async fetchCollections() {
    const response = await axios.get(`${this.baseUrl}/collections`, {
      headers: this.headers,
    });
    const parsed = collectionListSchema.safeParse(response.data);
    if (!parsed.success) throw new Error("Invalid collections schema");
    return parsed.data.collections;
  }

  async fetchCollectionDetails(uid) {
    const response = await axios.get(`${this.baseUrl}/collections/${uid}`, {
      headers: this.headers,
    });
    const parsed = collectionDetailSchema.safeParse(response.data);
    if (!parsed.success) throw new Error("Invalid collection details schema");
    return parsed.data.collection;
  }
}

export { PostmanService };
