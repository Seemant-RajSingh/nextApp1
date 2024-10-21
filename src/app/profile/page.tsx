"use client";
import axios from "axios";
import Link from "next/link";
import React, {useState} from "react";
import {toast} from "react-hot-toast";
import {useRouter} from "next/navigation";

export default function ProfilePage() {

    const router = useRouter();
    const [data, setData] = useState("nothing")

    const onLogout = async () => {
        try {
            await axios.get('/api/users/logout')
            toast.success('Logout successful')
            router.push('/login')
        } catch (error:any) {
            console.log(error.message);
            toast.error(error.message)
        }
    };

    const getUserDetails = async () => {
        //console.log("started gud")
        const res = await axios.get('/api/users/user')
        console.log("getUserDetails", res.data);
        setData(res.data.data._id)
    };


    return (
        <div className="flex flex-col justify-center h-screen items-center">
            <div className="flex flex-col items-center">
                <h1>Profile</h1>
                <hr />
                <p>Profile page</p>
                <h2 className="p-1 rounded bg-green-500">{data === 'nothing' ? "Nothing" : <Link href={`/profile/${data}`}>{data}
            </Link>}</h2>
            </div>

            <button 
            className="bg-white text-black hover:bg-red-300 px-2 mt-4"
            onClick={onLogout}
            >Logout</button>

            <button 
            className="bg-white text-black hover:bg-green-300 px-2 mt-4"
            onClick={getUserDetails}
            >Get User Details</button>
        </div>
    )
}