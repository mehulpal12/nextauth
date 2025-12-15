"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import  Axios  from "axios";
import { toast } from "react-hot-toast";

export default function loginPage() {
    const router = useRouter();
    const [User, setUser] = React.useState({
        email:"",
        password:"",
    })
      const [buttonDisabled, setButtonDisabled] = useState(false);
      const [loading, setLoading] = useState(false);

    const onLogin = async ()=>{
   try {
    setLoading(true);
   const response = await Axios.post("/api/users/login", User).then((res:any)=>{
        console.log("login successfull", res.data);
        toast.success("login successfull");
        router.push("/");
    }).catch((error:any)=>{
        console.log("login failed", error);
        toast.error("login failed");
    });
   } catch (error: any) {
    console.log("something went wrong");
            toast.error(error.message);
   }
   finally{
    setLoading(false)
   }
    }

    useEffect(() => {
 if (User.email.length > 0 && User.password.length > 0) {
        setButtonDisabled(false);
    } else {
        setButtonDisabled(true);
    }
    
     
    }, [User])
    
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