import fs from "fs";

const CACHE_FILE = ".cache/meta.json";

class CacheService {
  load() {
    if (!fs.existsSync(CACHE_FILE)) return {};
    return JSON.parse(fs.readFileSync(CACHE_FILE, "utf-8"));
  }

  save(cache) {
    fs.mkdirSync(".cache", { recursive: true });
    fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2));
  }
}

export { CacheService };
