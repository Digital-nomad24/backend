
const express = require("express");
const cors=require('cors')
const jwt=require('jsonwebtoken')
const app=express();
const path=require('path')
const userRoutes=require('./routes/user')
const bankRoutes=require('./routes/bank')
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/api/v1/user',userRoutes)
app.use('/api/v1/account',bankRoutes)
app.use(express.static(path.join(__dirname, 'build')));

// Define a catch-all route that serves the main HTML file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.listen('3000',()=>{
    console.log("The port 3000 is live")
})