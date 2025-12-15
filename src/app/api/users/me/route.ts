import { getDataToken } from "@/helpers/getDataToken";

import { NextResponse , NextRequest } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/db/db";

export async function GET(request: NextRequest) {
    await connect();

    try {
        const userId = await getDataToken(request);
        const user = await User.findById(userId).select('-password');
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        return NextResponse.json({data: user }, { status: 200 });
    } catch (error: any) {  
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}