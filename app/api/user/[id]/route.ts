import { NextResponse } from "next/server";
import * as data from '../../json/user.json';

export async function GET() {
    const user = data;

    return NextResponse.json({ user });
}
