
const express = require("express");
const cors=require('cors')
const jwt=require('jsonwebtoken')
const app=express();
const userRoutes=require('./routes/user')
const bankRoutes=require('./routes/bank')
const path=require('path')
const corsOptions = {
    origin: 'https://example.com', // Replace with your allowed origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  };
  
  app.use(cors(corsOptions));
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/api/v1/user',userRoutes)
app.use('/api/v1/account',bankRoutes)
app.listen('3000',()=>{
    console.log("The port 3000 is live")
})