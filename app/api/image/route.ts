// Import required modules and libraries.
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";

// Create an instance of Configuration for the OpenAI API and pass the API key from the environment.
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

// Create an instance of OpenAIApi using the above configuration.
const openai = new OpenAIApi(configuration);

// Define the main function that handles the POST request.
export async function POST(req: Request) {
  try {
    // Extract the userId from the request using the auth() function from the "@clerk/nextjs" library.
    const { userId } = auth();

    // Parse the JSON data from the request body using await req.json().
    const body = await req.json();

    // Extract the 'messages' property from the parsed JSON data.
    const { prompt, amount = 1, resolution = "512x512" } = body;

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
    if (!prompt) {
      return new NextResponse("Prompt is necessary!", { status: 400 });
    }

    if (!amount) {
      return new NextResponse("Amount is required", { status: 400 });
    }

    if (!resolution) {
      return new NextResponse("Resolution is required", { status: 400 });
    }

    // Call the OpenAI API
    const response = await openai.createImage({
      prompt,
      n: parseInt(amount, 10),
      size: resolution,
    });

    // Return the API response as a JSON response.
    return NextResponse.json(response.data.data);
  } catch (error) {
    // If any error occurs during the process, log the error and return a 500 Internal Server Error response.
    console.log("[IMAGE ERROR]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
