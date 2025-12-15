import {connect} from "@/db/db";
import User from "@/models/userModel";
import { NextResponse , NextRequest} from "next/server";
import bcrypt from "bcryptjs";



connect()


export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {username, email, password} = reqBody;

        // Check if user already exists
        const existingUser = await User.findOne({email});
        if (existingUser) {
            return NextResponse.json({error: "User already exists"}, {status: 400});
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        // Save user to database
        await newUser.save();

        return NextResponse.json({
            message: "User created successfully",
            success: true,
            user: newUser
        });
    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 500});  
    }
}