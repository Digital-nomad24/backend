
const express = require("express");
const cors=require('cors')
const jwt=require('jsonwebtoken')
const app=express();
const userRoutes=require('./routes/user')
const bankRoutes=require('./routes/bank')
const path=require('path')
const corsOptions = {
    origin: 'https://frontend-seven-gamma-86.vercel.app', // Your front-end URL
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true // if you need to include cookies or HTTP authentication
  };
  app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/api/v1/user',userRoutes)
app.use('/api/v1/account',bankRoutes)
app.listen('3000',()=>{
    console.log("The port 3000 is live")
})