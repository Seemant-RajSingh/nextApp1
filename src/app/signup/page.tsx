"use client";   // declaring this page as client, now can use window objects, usestates, useeffects, etc.
import Link from "next/link";
import React, { useEffect } from "react";
import {useRouter} from "next/navigation";
import { toast } from "react-hot-toast";
import axios from "axios";



export default function SignupPage() {

    const router = useRouter();

    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: "",
    })

    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading]=  React.useState(false);



    //signup function
    const onSignup = async () => {

        try {

            setLoading(true);
            const response = await axios.post("/api/users/signup", user)
            console.log("Signup successful", response.data);
            router.push("/login")

        } catch (error: any) {
            console.log("Signup failed", error.message);
            toast.error(error.messasge)

        } finally {
            setLoading(false);
        }
    }




    useEffect(()=> {
        if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDisabled(false); 
        } 
        else {
            setButtonDisabled(true);
        }
    }, [user])




    return (
        <div className="flex flex-col items-center">

            <h1 className="mt-2">{loading ? "Processing" : "Signup"}</h1>
            <hr />

            <div className="flex flex-col mt-40">
                {/* username */}
                <label htmlFor="username">username</label>
                <input 
                className="text-black"
                type="text" 
                id="username"
                value={user.username}
                onChange={(e) => setUser({...user, username: e.target.value})}
                placeholder="username"
                />

                {/* email */}
                <label htmlFor="email">email</label>
                <input 
                className="text-black"
                type="text" 
                id="email"
                value={user.email}
                onChange={(e) => setUser({...user, email: e.target.value})}
                placeholder="username"
                />

                {/* password */}
                <label htmlFor="password">password</label>
                <input 
                className="text-black"
                type="password" 
                id="password"
                value={user.password}
                onChange={(e) => setUser({...user, password: e.target.value})}
                placeholder="username"
                />

                <button 
                className="text-black bg-white mt-4 hover:bg-zinc-300"
                onClick={onSignup}>
                    {buttonDisabled ? "No Signup" : "Signup"}
                </button>
            </div>

            <p className="mt-4">Alraedy a member?  
                <Link 
                href="/login" className="text-blue-600"> Login here</Link>
            </p>

        </div>
    )
}