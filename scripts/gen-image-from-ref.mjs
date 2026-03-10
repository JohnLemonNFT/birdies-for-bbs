import { GoogleGenAI } from "@google/genai";
import * as fs from "fs";

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_AI_API_KEY });

const refImagePath = process.argv[2];
const prompt = process.argv[3];
const outputPath = process.argv[4];

if (!refImagePath || !prompt || !outputPath) {
  console.error("Usage: node gen-image-from-ref.mjs 'reference.png' 'prompt' 'output.png'");
  process.exit(1);
}

async function generate() {
  console.log(`Reference: ${refImagePath}`);
  console.log(`Output: ${outputPath}`);
  console.log(`Prompt: ${prompt.substring(0, 80)}...`);

  // Read reference image
  const imageData = fs.readFileSync(refImagePath);
  const base64Image = imageData.toString("base64");
  const mimeType = refImagePath.endsWith(".png") ? "image/png" : "image/jpeg";

  const response = await ai.models.generateContent({
    model: "gemini-3.1-flash-image-preview",
    contents: [
      { text: prompt },
      { inlineData: { mimeType, data: base64Image } },
    ],
    config: {
      responseModalities: ["TEXT", "IMAGE"],
    },
  });

  // Extract image from response parts
  for (const part of response.candidates[0].content.parts) {
    if (part.inlineData) {
      const buffer = Buffer.from(part.inlineData.data, "base64");
      fs.writeFileSync(outputPath, buffer);
      console.log(`✓ Saved: ${outputPath} (${(buffer.length / 1024).toFixed(1)} KB)`);
      return;
    }
  }
  console.error("No image in response");
  process.exit(1);
}

generate().catch((e) => {
  console.error("Error:", e.message);
  process.exit(1);
});
