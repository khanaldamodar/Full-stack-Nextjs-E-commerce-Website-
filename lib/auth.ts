import { NextRequest } from "next/server";
import { verifyToken } from "./jwt";

export function requireAuth(req: NextRequest, allowedRoles: string[] = ['USER', 'ADMIN']) {
  const authHeader = req.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) throw new Error('Unauthorized');

  const token = authHeader.split(' ')[1];
  try {
    const payload: any = verifyToken(token); // { userId, role }
    if (!allowedRoles.includes(payload.role)) throw new Error('Forbidden');
    console.log(payload)
    return payload; 
  } catch {
    throw new Error('Unauthorized');
  }
}
