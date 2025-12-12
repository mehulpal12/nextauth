"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Axios } from "axios";

export default function loginPage() {
    const [User, setUser] = React.useState({
        email:"",
        password:"",
    })

    const onLogin = async ()=>{

    }
    return(
        <div className="w-full h-screen flex justify-center items-center flex-col ">
        <h1 className="text-center text-white text-2xl">loginPage</h1>
          <label htmlFor="email">email</label>
        <input type="text" id="email" value={User.email} className="bg-gray-800 text-white block my-2 p-2" placeholder="email"
         onChange={(e)=>setUser({...User, email:e.target.value})} />
          <label htmlFor="password">password</label>
        <input type="text" id="password" value={User.password} className="bg-gray-800 text-white block my-2 p-2" placeholder="password"
         onChange={(e)=>setUser({...User, password:e.target.value})} />
         <button onClick={onLogin} className="">Log In</button>
         <Link href={"/signup"} className="text-white block my-2">Don't have an account? Sign Up</Link>
        </div>
    )
}