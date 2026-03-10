import { GoogleGenAI } from "@google/genai";
import * as fs from "fs";

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_AI_API_KEY });

const prompt = process.argv[2];
const outputPath = process.argv[3];

if (!prompt || !outputPath) {
  console.error("Usage: node gen-image.mjs 'prompt' 'output/path.png'");
  process.exit(1);
}

async function generate() {
  console.log(`Generating: ${outputPath}`);
  console.log(`Prompt: ${prompt.substring(0, 100)}...`);

  const response = await ai.models.generateContent({
    model: "gemini-3.1-flash-image-preview",
    contents: prompt,
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
