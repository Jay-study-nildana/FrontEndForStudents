import { formatDate, generateId } from "./utils/helpers.js";
import { getChatCompletion } from "./utils/chatHelper.js";
import dotenv from "dotenv";
import readline from "readline";

// Load environment variables from .env file
dotenv.config();

const app = async () => {
  console.log("Application has started.");

  const id = generateId();
  console.log(`Generated ID: ${id}`);

  const date = formatDate(new Date());
  console.log(`Current Date: ${date}`);

  // Retrieve the API key from environment variables
  const apiKey = process.env.HF_API_KEY;

  try {
    const message = await getChatCompletion(
      apiKey,
      "microsoft/phi-4",
      [
        {
          role: "user",
          content: "What is the capital of France?",
        },
      ],
      "nebius",
      500
    );

    console.log(message);
  } catch (error) {
    console.error("Error during chat completion:");
  }

  //Begin an interactive chat session by collecting input from user
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const interactiveChat = async () => {
    console.log("Interactive chat session started. Type 'exit' to quit.");

    const askQuestion = () => {
      rl.question("You: ", async (userInput) => {
        if (userInput.toLowerCase() === "exit") {
          console.log("Exiting chat session. Goodbye!");
          rl.close();
          return;
        }

        try {
          const response = await getChatCompletion(
            apiKey,
            "microsoft/phi-4",
            [
              {
                role: "user",
                content: userInput,
              },
            ],
            "nebius",
            500
          );

          // Access the AI's response message
          //console.log(response);
          //console.log(`AI: ${response.content}`);
          // Check if the response contains the specific text
          if (
            response.content.includes(
              "You have exceeded your monthly included credits for Inference Providers"
            )
          ) {
            console.log("API endpoint has run out of credits");
          } else {
            console.log(`AI: ${response.content}`);
          }
        } catch (error) {
          console.error("Error during chat completion:");
        }

        askQuestion(); // Continue the chat loop
      });
    };

    askQuestion();
  };

  interactiveChat();
};

app();
