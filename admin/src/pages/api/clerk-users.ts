import { NextApiRequest, NextApiResponse } from "next";
import { createClerkClient } from "@clerk/nextjs/server";

const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Get all users from Clerk
    const users = await clerkClient.users.getUserList({
      limit: 100, // Adjust as needed
    });

    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users from Clerk:", error);
    res.status(500).json({ error: "Failed to fetch users from Clerk" });
  }
}
