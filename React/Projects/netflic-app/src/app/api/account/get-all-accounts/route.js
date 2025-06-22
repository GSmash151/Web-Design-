// src/app/api/account/get-all-account/route.js

import connectToDB from "@/database";
import Account from "@/models/Account";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    await connectToDB();

    const { searchParams } = new URL(req.url);
    const uid = searchParams.get("uid"); // Assuming the ID passed will be the user's UID

    // 1. Check if UID is provided
    if (!uid) {
      return NextResponse.json(
        {
          success: false,
          message: "User ID (uid) is required to fetch accounts.",
        },
        { status: 400 }
      ); // Bad request status
    }

    // 2. Find all accounts belonging to this UID
    const accounts = await Account.find({ uid });

    // 3. Return the accounts
    if (accounts) {
      return NextResponse.json(
        {
          success: true,
          data: accounts,
        },
        { status: 200 }
      ); // OK status
    } else {
      // This else block might be redundant as find() usually returns an empty array if no match
      return NextResponse.json(
        {
          success: false,
          message: "No accounts found for this user.",
          data: [], // Return an empty array to be consistent
        },
        { status: 404 }
      ); // Not Found status if no accounts
    }
  } catch (e) {
    console.error("Error fetching accounts:", e); // Use console.error for errors
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong on the server while fetching accounts.",
        // For debugging in development, you might temporarily add:
        // error: e.message,
        // stack: e.stack,
      },
      { status: 500 }
    ); // Internal Server Error status
  }
}
