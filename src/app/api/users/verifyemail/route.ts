import {connect} from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";



connect();


export async function POST(request: NextRequest){

    try {
        const reqBody = await request.json();
        const {token} = reqBody;
        console.log(token);

        // two conditions for verification, the token and its expiry date should be greater than($gt) now, i.e., unexpired.
        const user = await User.findOne({verifyToken: token, verifyTokenExpiry: {$gt: Date.now()}});

        console.log("verify email post req", user);

        if (!user) {
            return NextResponse.json({error: "Invalid token"}, {status: 400})
        }

        user.isVerified = true;  // = User.isVerified = true;        can now use user variable to control database user
        // delete verification token from database to save memory => one time verification only

        console.log("verify email post req 2", user);

        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        await user.save();
        
        return NextResponse.json({
            message: "Email verified successfully",
            success: true,
        })


    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }

}