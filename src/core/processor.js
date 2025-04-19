class Processor {
  constructor(generator, hashService, cacheService) {
    this.generator = generator;
    this.hashService = hashService;
    this.cacheService = cacheService;
  }

  processCollection(collection) {
    const collectionId = collection.info._postman_id;
    const cache = this.cacheService.load();
    cache[collectionId] = cache[collectionId] || {};
    const updated = [];

    this._processItems(
      collection,
      collection.item,
      "",
      cache[collectionId],
      updated,
      collection.info.name
    );

    this.cacheService.save(cache);
    return updated;
  }

  _processItems(collection, items, basePath, cache, updated, collectionName) {
    for (const item of items) {
      if (item.item) {
        this._processItems(
          collection,
          item.item,
          `${basePath}/${item.name}`,
          cache,
          updated,
          collectionName
        );
      } else if (item.request) {
        const key = `${basePath}/${item.name}`;
        const hash = this.hashService.hashRequest(item);
        const previousHash = cache[key];

        if (hash !== previousHash) {
          this.generator.generate(item, collectionName, basePath);
          cache[key] = hash;
          updated.push(key);
        }
      }
    }
  }
}

export { Processor };
