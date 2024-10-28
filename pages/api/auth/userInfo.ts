import { NextApiRequest, NextApiResponse } from "next";
import { getUserInfo } from "@/utils/api/authApi";
import { parse } from "cookie";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const cookies = parse(req.headers.cookie || "");
  const accessToken = cookies.accessToken;

  if (!accessToken) {
    return res.status(401).json({ message: "인증되지 않았습니다." });
  }

  try {
    const userInfo = await getUserInfo();
    res.status(200).json(userInfo);
  } catch (error) {
    console.log("사용자 정보를 가져오는데 실패했습니다:", error);
    res.status(401).json({ message: "사용자 정보를 가져오는데 실패했습니다." });
  }
}
