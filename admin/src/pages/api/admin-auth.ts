import { NextApiRequest, NextApiResponse } from "next";
import { getAuth } from "@clerk/nextjs/server";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Here you would implement logic to:
    // 1. Verify the user is an admin in Clerk
    // 2. Get or create a corresponding admin token for your backend
    // 3. Return the backend token

    // For now, let's use your environment-based admin credentials
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      return res
        .status(500)
        .json({ error: "Admin credentials not configured" });
    }

    // Call your backend login endpoint
    const loginResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: adminEmail,
          password: adminPassword,
        }),
      }
    );

    if (loginResponse.ok) {
      const loginData = await loginResponse.json();
      res.status(200).json({
        success: true,
        token: loginData.token,
        user: loginData.user,
      });
    } else {
      res.status(400).json({ error: "Failed to authenticate with backend" });
    }
  } catch (error) {
    console.error("Error in admin auth:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
