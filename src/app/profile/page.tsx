"use client"
import axios from "axios";
import React from "react";
import Link from "next/link"
import   toast  from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Profile() {
  const router = useRouter();
  const [data, setData] = React.useState("");
      const logout = async () =>{
        try {
        const res = await  axios.get('/api/users/logout').then((res)=>{
            console.log(res.data);
            router.push('/login')
          })
          toast.success("Logged out successfully")
        } catch (error) {
          console.log(error);
        }
      }

      const getUserDetails = async () =>{
        try {
          const res = await axios.get('/api/users/me');
          console.log(res.data);
          setData(res.data.data._id);
        } catch (error: any) {
          console.log(error.response.data);
        }
      }

  return (
    <div>
      <h1 className="text-4xl">Profile Page </h1>
      <h2>{data === 'nothing' ? "nothing" : <Link href={`/profile/${data}`}>{data}</Link>}</h2>
      <button onClick={logout} className="bg-red-500 text-white p-2 rounded">logout</button>
      <button onClick={getUserDetails} className="bg-green-500 text-white p-2 rounded">user details</button>
    </div>
  );
}
