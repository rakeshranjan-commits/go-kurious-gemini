import { copyFile, writeFile } from "node:fs/promises";

await copyFile("Go-Kurious-Gemini-Source.pdf", "docs/Go-Kurious-Gemini-Source.pdf");
await writeFile("docs/.nojekyll", "");
