import { NextResponse } from "next/server";

import { generateReviews } from "@/lib/ai";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      businessName,
      keywords,
      rating,
    } = body;

    // Validation
    if (
      !businessName ||
      !keywords ||
      !rating
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Missing required fields",
        },
        {
          status: 400,
        }
      );
    }

    // Generate AI Reviews
    const reviews =
      await generateReviews(
        businessName,
        keywords,
        rating
      );

    return NextResponse.json({
      success: true,
      reviews,
    });
  } catch (error) {
    console.error(
      "Generate Review API Error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to generate reviews",
      },
      {
        status: 500,
      }
    );
  }
}