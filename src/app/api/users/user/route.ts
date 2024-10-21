import { getDataFromToken } from "@/helpers/getDataFromToken";  // getting exported function from other files

import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET(request:NextRequest){

    try {
        // getting userId by verifying jwt token
        const userId = await getDataFromToken(request);
        // find user from decoded userId
        const user = await User.findOne({_id: userId}).select("-password");         // .select("-password") => dont give password field.
        return NextResponse.json({
            message: "User found",
            data: user,
        })
    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 400});
    }

}