import {connect} from "@/db/db";
import User from "@/models/userModel";
import { NextResponse , NextRequest} from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";



connect()



export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password} = reqBody;

        // Check if user already exists
        const existingUser = await User.findOne({email});
        if (!existingUser) {
            return NextResponse.json({error: "User does not exists"}, {status: 400},);
        }

        const validPassword = await bcrypt.compare(password, existingUser!.password);
        if(!validPassword){
            return NextResponse.json({error: "Invalid credentials"}, {status: 400});
        }
        const tokenData = {
            id : existingUser!._id,
            email: existingUser!.email,
            username: existingUser!.username,
            
        }
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: '1d'});



        if (!validPassword) {
            return NextResponse.json({error: "Invalid credentials"}, {status: 400});
        }
        const response = NextResponse.json({
            message: "User created successfully",
            success: true,
            user: existingUser,
            token: token});

        response.cookies.set("token", token, {
            httpOnly: true,
        });
        return response;
    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 500});  
    }
}