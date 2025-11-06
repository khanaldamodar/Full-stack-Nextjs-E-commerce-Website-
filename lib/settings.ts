// lib/settings.ts
import prisma from "@/lib/prisma";

let cachedSettings: any = null;

export async function getSettings() {
  if (cachedSettings) return cachedSettings;
  
  cachedSettings = await prisma.settings.findFirst();
  return cachedSettings;
}



export async function getProducts() {
  return await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });
}


