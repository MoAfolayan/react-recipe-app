import { NextResponse } from "next/server";
import * as data from '../json/users.json';

export async function GET() {
    const users = data

    return NextResponse.json({ users });
}
