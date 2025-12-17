
import { GoogleGenAI, Type } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // This is a fallback for development, but the app expects the key to be set in the environment.
  console.error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

const triviaSchema = {
    type: Type.ARRAY,
    items: {
        type: Type.OBJECT,
        properties: {
            question: {
                type: Type.STRING,
                description: "The trivia question. Should be engaging and clear."
            },
            options: {
                type: Type.ARRAY,
                description: "An array of 4 strings, representing the multiple-choice options.",
                items: { type: Type.STRING }
            },
            correctAnswer: {
                type: Type.STRING,
                description: "The correct answer, which must be one of the strings from the `options` array."
            },
            explanation: {
                type: Type.STRING,
                description: "A brief, one-sentence explanation for why the correct answer is right."
            }
        },
        required: ["question", "options", "correctAnswer", "explanation"]
    }
};

export const fetchTriviaQuestions = async (category: string, count: number = 5) => {
  try {
    const prompt = `Generate ${count} challenging trivia questions about ${category}. The questions should be unique and cover a range of difficulties. Ensure the correct answer is always one of the provided options.`;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: triviaSchema
        }
    });
    
    const jsonText = response.text.trim();
    if (!jsonText) {
        throw new Error("API returned an empty response.");
    }

    const questions = JSON.parse(jsonText);
    
    // Validate that we received an array
    if (!Array.isArray(questions)) {
      throw new Error("API response is not an array.");
    }
    
    return questions;

  } catch (error) {
    console.error("Error fetching trivia questions:", error);
    throw new Error("Failed to generate trivia questions. The AI might be busy, or there was a configuration error.");
  }
};
