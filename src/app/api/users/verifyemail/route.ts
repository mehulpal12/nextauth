import { connect } from "@/db/db";
import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";

connect();


export async function POST(request: NextRequest) {
    try {
        const { token } = await request.json();
        console.log(token);
        
        if (!token) {
            return NextResponse.json({ message: 'Token is required' }, { status: 400 });
        }
        User.findOne({ verifyToken: token, verifyTokenExpiry: { $gt: Date.now() } }).then(async (user) => {
            if (!user) {
                return NextResponse.json({ message: 'Invalid or expired token' }, { status: 400 });
            }

            user.isverified = true;
            user.verifyToken = undefined;
            user.verifyTokenExpiry = undefined;
            await user.save();
            return NextResponse.json({ message: 'Email verified successfully' }, { status: 200 });
        });
    } catch (error) {
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}