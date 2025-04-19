import fs from "fs";
import path from "path";

class MarkdownGenerator {
  generate(item, collectionName, basePath) {
    const content = this.createMarkdown(item);
    const folder = path.join("docs", collectionName + basePath);
    const filePath = path.join(
      folder,
      `${this.sanitizeFileName(item.name)}.md`
    );

    fs.mkdirSync(folder, { recursive: true });
    fs.writeFileSync(filePath, content, "utf8");
  }

  sanitizeFileName(name) {
    return name.replace(/[<>:"/\\|?*\x00-\x1F]/g, "_");
  }

  createMarkdown(item) {
    const { name, request, response = [], description = "" } = item;
    const method = request?.method || "GET";
    const url =
      typeof request?.url === "string" ? request.url : request?.url?.raw || "";
    const headers = request?.header || [];
    const body = request?.body?.raw?.trim() || "{}";

    const headerList = headers.length
      ? headers.map((h) => `- \`${h.key}\``).join("\n")
      : "Nenhum.";

    const curlHeaders = headers
      .map((h) => `--header '${h.key}: ${h.value || "SEU_VALOR"}'`)
      .join(" \\\n");

    const curlData =
      body && method !== "GET"
        ? ` \\\n--data-raw '${body.replace(/'/g, "\\'")}'`
        : "";

    const exampleResponse =
      response[0]?.body?.trim() || '{\n  "status": 200\n}';
    const statusCode = response[0]?.code || 200;

    return `# 📘 ${name}

> Documentação técnica para o endpoint **${name}**.

---

## 🎯 Objetivo

${description || "_Descreva aqui o objetivo desta requisição._"}

---

## 🔗 Endpoint

- **Método:** \`${method}\`
- **URL:** \`${url}\`

---

## 📨 Corpo da Requisição

\`\`\`json
${body}
\`\`\`

---

## 🧾 Cabeçalhos Necessários

${headerList}

---

## 🧪 Exemplo com cURL

\`\`\`bash
curl --location '${url}' \\
${curlHeaders}${curlData}
\`\`\`

---

## 📬 Exemplo de Resposta

- **Status:** \`${statusCode}\`

\`\`\`json
${exampleResponse}
\`\`\`

---

## 🆘 Contato

Dúvidas ou suporte técnico, entre em contato com: [api-support@exemplo.com](mailto:api-support@exemplo.com)

---
`;
  }
}

export { MarkdownGenerator };
