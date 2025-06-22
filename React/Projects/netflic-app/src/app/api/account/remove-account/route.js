// src/app/api/account/remove-account/route.js

import connectToDB from "@/database";
import Account from "@/models/Account";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function DELETE(req) {
  try {
    await connectToDB();

    // Get the account ID from the request body
    // For DELETE requests, the body might not always be directly available if sent via query.
    // Assuming the client sends { id: "accountId" } in the JSON body.
    const { id } = await req.json();

    // 1. Validate if ID is provided
    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "Account ID is required to remove an account.",
        },
        { status: 400 }
      ); // Bad request status
    }

    // 2. Find and delete the account by its _id
    const deletedAccount = await Account.findByIdAndDelete(id);

    // 3. Return response based on deletion result
    if (deletedAccount) {
      return NextResponse.json(
        {
          success: true,
          message: "Account removed successfully!",
        },
        { status: 200 }
      ); // OK status
    } else {
      // If deletedAccount is null, it means no document with that ID was found
      return NextResponse.json(
        {
          success: false,
          message: "Account not found or could not be removed.",
        },
        { status: 404 }
      ); // Not Found status
    }
  } catch (e) {
    console.error("Error removing account:", e); // Use console.error for errors
    return NextResponse.json(
      {
        success: false,
        message:
          "Something went wrong on the server while removing the account.",
        // For debugging in development, you might temporarily add:
        // error: e.message,
        // stack: e.stack,
      },
      { status: 500 }
    ); // Internal Server Error status
  }
}
