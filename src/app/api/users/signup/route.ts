import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";


// connecting to database
connect();
//console.log("check 0");

export async function POST(request: NextRequest){
    try{
        const reqBody = await request.json();
        const {username, email, password} = reqBody;

        //console.log("check 1", reqBody);

        // check if user already exists
        const user = await User.findOne({email});

        //console.log("check 2", user)

        if(user) {
            return NextResponse.json({error: "User alreadt exists"}, {status: 400})
        }

        //console.log("check 3")

        // hash password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        //console.log("check 4")


        const newUser = new User ({
            username,
            email,
            password: hashedPassword,
        })

        //console.log("check 5")

        const savedUser = await newUser.save(); // ?
        console.log(savedUser);

        // sending verification mail
        await sendEmail({email, emailType: "VERIFY", userId: savedUser._id})

        //console.log("check 6")

        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser,
        })


    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}