// app/api/menuItemsByCategory/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/app/db";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";

  const items = await db.menuItem.findMany({
    where: {
      AND: [
        category ? { category: category } : {},
        {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
      ],
    },
  });

  return NextResponse.json(items);
}
