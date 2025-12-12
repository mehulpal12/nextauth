"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Axios } from "axios";

export default function signupPage() {
    const [User, setUser] = React.useState({
        email:"",
        password:"",
        username:""
    })

    const onSignup = async ()=>{

    }
    return(
        <div className="w-full h-screen flex justify-center items-center flex-col ">
        <h1 className="text-center text-white text-2xl">signupPage</h1>
        <label htmlFor="username">username</label>
        <input type="text" id="username" value={User.username} className="bg-gray-800 text-white block my-2 p-2" placeholder="username"
         onChange={(e)=>setUser({...User, username:e.target.value})} />
          <label htmlFor="email">email</label>
        <input type="text" id="email" value={User.email} className="bg-gray-800 text-white block my-2 p-2" placeholder="email"
         onChange={(e)=>setUser({...User, email:e.target.value})} />
          <label htmlFor="password">password</label>
        <input type="text" id="password" value={User.password} className="bg-gray-800 text-white block my-2 p-2" placeholder="password"
         onChange={(e)=>setUser({...User, password:e.target.value})} />
         <button onClick={onSignup} className="">Sign Up</button>
         <Link href={"/login"} className="text-white block my-2">Already have an account? Login</Link>
        </div>
    )
}