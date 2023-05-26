import { jwtVerify } from "jose";

export async function verifyJwtToken(token) {
  try {
    const { payload } = await jwtVerify(token, process.env.JWT_SECRET);
    return payload;
  } catch (error) {
    return null;
  }
}
