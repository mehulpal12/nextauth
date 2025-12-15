"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import  Axios  from "axios";
import toast from "react-hot-toast";

export default function signupPage() {
    const router = useRouter();
  const [User, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    try {
        setLoading(true);
        const response = await Axios.post("/api/users/signup", User).then((res: any)=>{
            console.log("signup successfull", res.data);
            toast.success("signup successfull");
            router.push("/login");
        }).catch((error: any)=>{
            console.log("signup failed", error);
            toast.error("signup failed");
        });
    } catch (error: any) {
    console.log("something went wrong");
    
        toast.error(error.message);
    }finally{
setLoading(false)
    }
  };

  useEffect(() => {
    if (User.email.length > 0 && User.password.length > 0 && User.username.length > 0) {
        setButtonDisabled(false);
    } else {
        setButtonDisabled(true);
    }
  }, [User]);


  return (
    <div className="w-full h-screen flex justify-center items-center flex-col ">
      <h1 className="text-center text-white text-2xl">{loading ? "Signing up..." : "Sign Up"}</h1>
      <label htmlFor="username">username</label>
      <input
        type="text"
        id="username"
        value={User.username}
        className="bg-gray-800 text-white block my-2 p-2"
        placeholder="username"
        onChange={(e) => setUser({ ...User, username: e.target.value })}
      />
      <label htmlFor="email">email</label>
      <input
        type="text"
        id="email"
        value={User.email}
        className="bg-gray-800 text-white block my-2 p-2"
        placeholder="email"
        onChange={(e) => setUser({ ...User, email: e.target.value })}
      />
      <label htmlFor="password">password</label>
      <input
        type="text"
        id="password"
        value={User.password}
        className="bg-gray-800 text-white block my-2 p-2"
        placeholder="password"
        onChange={(e) => setUser({ ...User, password: e.target.value })}
      />
      <button onClick={onSignup} className="">
       {buttonDisabled ? "Please fill all the fields" : "Signup"}
      </button>
      <Link href={"/login"} className="text-white block my-2">
        Already have an account? Login
      </Link>
    </div>
  );
}
