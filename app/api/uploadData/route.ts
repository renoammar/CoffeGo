// app/api/createDB/route.ts
import { NextResponse } from "next/server";
import { db } from "@/app/db"; // Adjust the path to your db file accordingly
import { dummyData } from "@/app/admin/DUMMYDATA"; // Adjust the path to your dummyData file accordingly

export const dynamic = "force-dynamic"; // defaults to auto

export async function POST(request: Request) {
  try {
    await db.menuItem.createMany({
      data: dummyData,
    });
    return NextResponse.json({ message: "Database created successfully" });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: "Unknown error" }, { status: 500 });
    }
  }
}
