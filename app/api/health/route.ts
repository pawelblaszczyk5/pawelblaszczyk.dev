import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = () => NextResponse.json(null, { status: 200 });
