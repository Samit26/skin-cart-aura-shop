import { NextApiRequest, NextApiResponse } from "next";
import { createClerkClient } from "@clerk/nextjs/server";

const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { userId, role } = req.body;

  if (!userId || !role) {
    return res.status(400).json({ error: "User ID and role are required" });
  }

  try {
    // Update user metadata in Clerk
    await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: {
        role: role,
      },
    });

    res
      .status(200)
      .json({ success: true, message: "User role updated successfully" });
  } catch (error) {
    console.error("Error updating user role in Clerk:", error);
    res.status(500).json({ error: "Failed to update user role in Clerk" });
  }
}
