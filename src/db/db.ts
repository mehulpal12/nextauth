import mongoose from "mongoose";

export async function connect() {
    try {
        mongoose.connect(process.env.mongo_url!)
        const connection = mongoose.connection;

        connection.on('connected', ()=>{
            console.log("connected sucessfully");
            
        })
        connection.on('error', (err)=>{
            console.log("connected unsucessfully error");
            console.log(err);
            process.exit();
            
            
        })
    } catch (error) {
        console.log(error);
        
    }
}