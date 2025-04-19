# 👻 Ghost Docs

Ghost Docs is an automated documentation generator that reads your Postman collections and turns each request into a clean, standardized Markdown file

---

### Why was this project created?

Currently, we don’t have a reliable and automated way to document our APIs.

We often create or update requests in Postman, but **the documentation (local or in Confluence)** doesn’t follow these changes — causing rework, miscommunication, and inconsistencies between the code and the docs.

---

### How does it work?

1. **Reads the Postman Collection**

   - Uses the Postman API to fetch a selected collection.
   - Each request in the collection is processed individually.

2. **Avoids unnecessary processing**

   - A `.cache/meta.json` file stores a **hash** of each request.
   - If a request **has not changed** since the last run, its documentation is **not regenerated**.

3. **Generates documentation**

   - Each request becomes a full Markdown doc using a **standard technical template** (Objective, URI, Headers, cURL, etc.).
   - Content is extracted directly from Postman (URL, headers, body, etc.).

---

### Benefits

- Always up-to-date documentation based on real API requests
- Standardized formatting with no manual effort
- Seamless integration with tools already in use (Postman + Confluence)
- Reduced human error and less overhead for dev teams
  _(assets still need to be uploaded manually if necessary)_

---

### Customizing the Output

If you'd like to tweak the style, structure, or sections of the generated Markdown files, you can edit the template logic in:

```bash
src/core/markdown.generator.js
```

---

### 🚀 Coming Soon

**Native Confluence Integration**: automatically publish and update pages in your Confluence workspace straight from Ghost Docs.

---
