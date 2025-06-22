//src/app/api/account/create-account/route.js

import connectToDB from "@/database";
import Account from "@/models/Account";
import { NextResponse } from "next/server";
import { hash } from "bcryptjs"; // Import the hash function

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    await connectToDB();

    const { name, pin, uid } = await req.json();

    // Check if an account with the same uid and name already exists (assuming name should be unique per user)
    // If you intend for name, pin, and uid to be a unique combination, your original query was fine
    // but the check for length > 0 is crucial.
    const existingAccounts = await Account.find({ uid, name }); // Changed to check uniqueness by uid and name
    if (existingAccounts && existingAccounts.length > 0) {
      return NextResponse.json({
        success: false,
        message:
          "An account with this name already exists for your profile. Please try with a different name.",
      });
    }

    // Check for max 4 accounts (already correct)
    const allAccountsForUser = await Account.find({ uid }); // Find accounts specific to this user
    if (allAccountsForUser && allAccountsForUser.length >= 4) {
      // Changed to >= 4 for clarity
      return NextResponse.json({
        success: false,
        message: "You can only add a maximum of 4 accounts.",
      });
    }

    // Hash the PIN
    const hashPin = await hash(pin, 12); // Use the imported hash function

    // Create the new account
    const newlyCreatedAccount = await Account.create({
      name,
      pin: hashPin,
      uid,
    });

    // Corrected success response
    if (newlyCreatedAccount) {
      return NextResponse.json({
        success: true, // Corrected to true
        message: "Account created Successfully!",
      });
    } else {
      // This else block might be redundant as create typically throws on failure
      return NextResponse.json({
        success: false,
        message: "Something went wrong during account creation.",
      });
    }
  } catch (e) {
    console.error("Error creating account:", e); // Log the error for debugging
    return NextResponse.json({
      success: false,
      message: "Something went wrong on the server.", // Generic message for client
      // For debugging in development, you might temporarily add:
      // error: e.message,
      // stack: e.stack,
    });
  }
}
