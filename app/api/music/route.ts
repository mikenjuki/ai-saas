// Import required modules and libraries.
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Replicate from "replicate";

// Create an instance of replicate and pass the API key from the environment.
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!,
});

// Define the main function that handles the POST request.
export async function POST(req: Request) {
  try {
    // Extract the userId from the request using the auth() function from the "@clerk/nextjs" library.
    const { userId } = auth();

    // Parse the JSON data from the request body using await req.json().
    const body = await req.json();

    // Extract the prompt property from the parsed JSON data.
    const { prompt } = body;

    // Check if the user is authenticated. If not, return a 401 Unauthorized response.
    if (!userId) {
      return new NextResponse("Unauthorized access", { status: 401 });
    }

    // Check if a prompt is present. If not, return a 400 Bad Request response status code(client error)
    if (!prompt) {
      return new NextResponse("Prompt is required", { status: 400 });
    }

    const response = await replicate.run(
      "riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05",
      {
        input: {
          prompt_a: prompt,
        },
      }
    );

    return NextResponse.json(response);
  } catch (error) {
    // If any error occurs during the process, log the error and return a 500 Internal Server Error response.
    console.log("[MUSIC ERROR]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
