import OpenAI from "openai";
import { buildReviewPrompt } from "./prompts";

const client = new OpenAI({
  apiKey: process.env.AZURE_OPENAI_API_KEY,

  baseURL: `${process.env.AZURE_OPENAI_ENDPOINT}/openai/deployments/${process.env.AZURE_OPENAI_DEPLOYMENT}`,

  defaultQuery: {
    "api-version":
      process.env.AZURE_OPENAI_API_VERSION,
  },

  defaultHeaders: {
    "api-key":
      process.env.AZURE_OPENAI_API_KEY,
  },
});

export async function generateReviews(
  businessName: string,
  keywords: string[],
  rating: number
) {
  try {
    const prompt = buildReviewPrompt(
      businessName,
      keywords,
      rating
    );

    const response =
      await client.chat.completions.create({
        model:
          process.env
            .AZURE_OPENAI_DEPLOYMENT!,

        messages: [
          {
            role: "system",
            content:
              "You generate realistic Google reviews for businesses. The reviews must sound natural, human-written, and not robotic.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],

        temperature: 0.9,
        max_tokens: 400,
      });

    const text =
      response.choices[0].message.content || "";

    const reviews = text
      .split("\n")
      .filter(
        (line) => line.trim() !== ""
      )
      .map((line) =>
        line
          .replace(/^\d+\.\s*/, "")
          .trim()
      )
      .filter((line) => line.length > 20);

    return reviews.slice(0, 3);
  } catch (error) {
    console.error(
      "AI Review Generation Error:",
      error
    );

    return [
      "Amazing experience and great service. Highly recommended.",
      "Very satisfied with the quality and professionalism.",
      "Loved the overall experience. Will definitely return again.",
    ];
  }
}