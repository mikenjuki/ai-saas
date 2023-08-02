// Import required modules and libraries.
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai";

import { incrementApiLimit, checkApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

// Create an instance of Configuration for the OpenAI API and pass the API key from the environment.
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

// Create an instance of OpenAIApi using the above configuration.
const openai = new OpenAIApi(configuration);

const instructionMessage: ChatCompletionRequestMessage = {
  role: "system",
  content:
    "From now on, you are a code generator. You must answer only in markdown code snippets. Use code comments for explanations.",
};

// Define the main function that handles the POST request.
export async function POST(req: Request) {
  try {
    // Extract the userId from the request using the auth() function from the "@clerk/nextjs" library.
    const { userId } = auth();

    // Parse the JSON data from the request body using await req.json().
    const body = await req.json();

    // Extract the 'messages' property from the parsed JSON data.
    const { messages } = body;

    // Check if the user is authenticated. If not, return a 401 Unauthorized response.
    if (!userId) {
      return new NextResponse("Unauthorized access", { status: 401 });
    }

    // Check if the OpenAI API key is configured. If not, return a 500 Internal Server Error response.
    if (!configuration.apiKey) {
      return new NextResponse("OpenAI API Key not configured.", {
        status: 500,
      });
    }

    // Check if the 'messages' property is present. If not, return a 400 Bad Request response.
    if (!messages) {
      return new NextResponse("Messages are required", { status: 400 });
    }

    const freeTrial = await checkApiLimit();
    const isPro = await checkSubscription();

    if (!freeTrial && !isPro) {
      return new NextResponse(
        "Free trial has expired. Please upgrade to pro.",
        { status: 403 }
      );
    }

    // Call the OpenAI API to create a chat-based completion using the GPT-3.5 Turbo model
    // and the provided 'messages'.
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [instructionMessage, ...messages],
    });

    if (!isPro) {
      await incrementApiLimit();
    }

    // Return the API response's message content as a JSON response.
    return NextResponse.json(response.data.choices[0].message);
  } catch (error) {
    // If any error occurs during the process, log the error and return a 500 Internal Server Error response.
    console.log("[CODE ERROR]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
