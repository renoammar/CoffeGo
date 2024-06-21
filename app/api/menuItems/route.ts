// app/api/menuItems/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "../../db";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search") || "";

  const items = await db.menuItem.findMany({
    where: {
      OR: [
        { category: { contains: search, mode: "insensitive" } },
        { name: { contains: search, mode: "insensitive" } },
      ],
    },
  });

  return NextResponse.json(items);
}
