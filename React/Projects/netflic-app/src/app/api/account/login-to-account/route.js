// src/app/api/account/login-to-account/route.js

import connectToDB from "@/database";
import Account from "@/models/Account";
import { NextResponse } from "next/server";
import { compare } from "bcryptjs"; // Import the compare function from bcryptjs

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    await connectToDB();

    const { uid, name, pin } = await req.json(); // Get uid, name, and pin from the request body

    // 1. Find the account by uid and name
    const findAccount = await Account.findOne({ uid, name });

    // 2. Check if the account exists
    if (!findAccount) {
      return NextResponse.json(
        {
          success: false,
          message: "Account not found.",
        },
        { status: 404 }
      ); // Not Found status
    }

    // 3. Compare the provided PIN with the hashed PIN in the database
    const isPinCorrect = await compare(pin, findAccount.pin);

    // 4. Return response based on PIN comparison
    if (isPinCorrect) {
      return NextResponse.json(
        {
          success: true,
          message: "Logged in successfully!",
          data: {
            _id: findAccount._id, // Return account ID
            name: findAccount.name, // Return account name
            uid: findAccount.uid, // Return user ID
          },
        },
        { status: 200 }
      ); // OK status
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "Incorrect PIN. Please try again.",
        },
        { status: 401 }
      ); // Unauthorized status
    }
  } catch (e) {
    console.error("Error logging into account:", e); // Use console.error for errors
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong on the server while logging in.",
        // For debugging in development, you might temporarily add:
        // error: e.message,
        // stack: e.stack,
      },
      { status: 500 }
    ); // Internal Server Error status
  }
}
