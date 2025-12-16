"use client"
import axios from 'axios';
import Link from 'next/link';
import { useState, useEffect } from 'react';



export default function VerifyEmailPage( ) {
    const [token, setToken] = useState('');
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState('');

    const verifyEmail = async () => {
        try {
            const response = await axios.post('/api/users/verifyemail', { token });
            if (response.status === 200) {
                setVerified(true);
            }
        } catch (err:any) {
            setError(err.response?.data?.message || 'Verification failed');
        }
    };

    useEffect(() => {
        const urlParams = window.location.search.split('=')[1];
        if (urlParams) {
            setToken(urlParams || '');
            setVerified(true)
        }
    

    }, [])
    


    useEffect(() => {
        if(token.length > 0){
            verifyEmail();
        }
    }, [token]);

    return(
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            {verified ? (
                <div className="bg-black p-8 rounded shadow-md">
                    <h1 className="text-2xl font-bold mb-4 ">Email Verified Successfully!</h1>
                    <p className="mb-4">Your email has been verified. You can now login.</p>
                    <Link href="/login" className="text-blue-500 hover:underline">
                        Login
                    </Link> <br />
                     {token}
                </div>
            ) : (
                <div className="bg-black p-8 rounded shadow-md">
                    
                    {error && <p className="text-red-500">{error}</p>}
                </div>
            )}
        </div>
    )

}