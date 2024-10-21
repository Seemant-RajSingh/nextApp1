"use client";   // declaring this page as client, now can use window objects, usestates, useeffects, etc.
import Link from "next/link";
import React, {useEffect} from "react";
import {useRouter} from "next/navigation";
import { toast } from "react-hot-toast";
import axios from "axios";



export default function LoginPage() {

    const router = useRouter();

    const [user, setUser] = React.useState({
        email: "",
        password: "",
    })

    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading]=  React.useState(false);

    //signup function
    const onLogin = async () => {

        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            console.log("Login success", response.data);
            toast.success("Login success");
            router.push("/profile");

        } catch (error:any) {
            console.log("Login failed", error.message);
            toast.error(error.message);
            
        } finally{
        setLoading(false);
        }

    }

    useEffect(()=> {
        if(user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false); 
        } 
        else {
            setButtonDisabled(true);
        }
    }, [user])



    return (
        <div className="flex flex-col items-center">

            <h1 className="mt-2">{loading ? "Processing" : "Login"}</h1>
            <hr />

            <div className="flex flex-col mt-40">

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
                onClick={onLogin}
                >{buttonDisabled ? "No Login" : "Login"}</button>
            </div>

            <p className="mt-4">Not a member? 
                <Link 
                href="/signup" className="text-blue-600"> Signup here</Link>
            </p>

        </div>
    )
}