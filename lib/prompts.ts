const tones = [
  "warm and genuine",
  "casual and friendly",
  "excited and emotional",
  "simple and honest",
  "natural customer style",
];

const endings = [
  "Would definitely visit again.",
  "Highly recommended.",
  "Really happy with the experience.",
  "Glad we found this place.",
  "Will surely come back.",
  "",
];

const styles = [
  "Write like a real human.",
  "Avoid robotic language.",
  "Do not sound like marketing.",
  "Keep sentences natural.",
  "Sound conversational.",
];

function randomItem(arr: string[]) {
  return arr[
    Math.floor(Math.random() * arr.length)
  ];
}

export function buildReviewPrompt(
  businessName: string,
  keywords: string[],
  rating: number
) {
  const tone = randomItem(tones);

  const ending = randomItem(endings);

  const style = randomItem(styles);

  const randomKeywords = keywords
    .sort(() => 0.5 - Math.random())
    .slice(0, Math.random() > 0.5 ? 1 : 2);

  const positivity =
    rating === 5
      ? "very positive and enthusiastic"
      : "moderately positive and realistic";

  return `
Generate 3 completely different Google reviews.

IMPORTANT:
- Each review must contain ONLY 40-50 words
- Never exceed 50 words
- Keep reviews concise
- Sound human-written
- Avoid robotic language

Business Name:
${businessName}

Important Keywords:
${randomKeywords.join(", ")}

Review Tone:
${tone}

Review Style:
${positivity}

Instructions:
- ${style}
- Reviews must feel human-written
- Every review should have different wording
- Use different sentence structures
- Avoid repetitive phrases
- Mention keywords naturally
- Do not overuse business name
- Make reviews believable
- Some reviews can be shorter
- Some can be emotional
- Avoid sounding AI-generated
- Avoid corporate language
- Do not use emojis
- Do not number the reviews
- Add natural variation
- Each review MUST stay between 40 to 50 words
- Never exceed 50 words
- Keep reviews concise and natural

Optional Ending Style:
${ending}

Generate ONLY the reviews.
`;
}