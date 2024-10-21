import { NextResponse } from "next/server";


export async function GET() {
    try {
        // success message before?
        const response = NextResponse.json(
            {
                message: "Logout successful",
                success: true,
            }
        )

        response.cookies.set("token", "", 
        { httpOnly: true, expires: new Date(0) 
        }); // new Date(0) -> expires it immediately (not necessary)

        return response;

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
        
    }