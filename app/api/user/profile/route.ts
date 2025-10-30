import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import prisma from '@/lib/prisma';

/**
 * @swagger
 * /api/user/profile:
 *   get:
 *     summary: YOur Info
 *     tags:
 *       - Users
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response
 */
export async function GET(req: NextRequest) {
  try {
    // This will throw an error if token is missing/invalid
  
    const tokenData: any = requireAuth(req);

    // Fetch the full user data from DB
    const user = await prisma.user.findUnique({
      where: { id: tokenData.userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        phone: true,
        address: true,
        profileImage: true,
      },
    });

    return NextResponse.json({ user });
  } catch (err) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
}
