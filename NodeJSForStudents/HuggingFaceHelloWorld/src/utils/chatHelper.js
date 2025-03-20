import { InferenceClient } from "@huggingface/inference";

export async function getChatCompletion(
  apiKey,
  model,
  messages,
  provider,
  maxTokens
) {
  const client = new InferenceClient(apiKey);

  try {
    const chatCompletion = await client.chatCompletion({
      model,
      messages,
      provider,
      max_tokens: maxTokens,
    });

    return chatCompletion.choices[0].message;
  } catch (error) {
    console.error("Error during chat completion:", error);
    throw error;
  }
}
