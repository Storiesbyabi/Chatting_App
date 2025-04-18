import express from "express";
import authRoutes from './routes/auth.route.js'
import messageRoutes from './routes/message.route.js'
import dotenv from 'dotenv'
import cors from 'cors'
import { connectDB } from "./lib/db.js";
import {app,server} from './lib/socket.js'
import cookieParser from 'cookie-parser'

dotenv.config()
const PORT = process.env.PORT

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.json())
app.use(cookieParser())
app.use(cors(
    {origin:"http://localhost:5173",
        credentials:true,
        methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Content-Type', 'Authorization']
    }
    
))


app.use('/api/auth',authRoutes)
app.use('/api/messages',messageRoutes)


server.listen(PORT,()=>{
    console.log("server is running on port:"+PORT)
    connectDB()
})