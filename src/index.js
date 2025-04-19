import { PostmanService } from "./api/postman.service.js";
import { CacheService } from "./cache/cache.service.js";
import { CollectionCli } from "./cli/collection.js";
import { HashService } from "./core/hash.service.js";
import { MarkdownGenerator } from "./core/markdown.generator.js";
import { Processor } from "./core/processor.js";

const postmanService = new PostmanService();
const cacheService = new CacheService();
const generator = new MarkdownGenerator();
const processor = new Processor(generator, HashService, cacheService);
const cli = new CollectionCli(postmanService, processor);

cli.run().catch((err) => console.error("💥 Deu ruim:", err.message));
