import { NextApiRequest, NextApiResponse } from "next";
import { getLogin } from "@/utils/api/authApi";
import { serialize } from "cookie";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { email, password } = req.body;
      const response = await getLogin({ email, password });
      // Set-Cookie 헤더를 통해 accessToken 쿠키를 클라이언트에게 전달
      res.setHeader(
        "Set-Cookie",
        serialize("accessToken", response.accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          sameSite: "strict",
          maxAge: 3600,
          path: "/",
        })
      );

      res.status(200).json({ user: response.user });
    } catch (error) {
      res.status(401).json({ message: "Authentication failed" });
      console.error("Login failed:", error);
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
