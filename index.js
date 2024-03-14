
const express = require("express");
const cors=require('cors')
const jwt=require('jsonwebtoken')
const app=express();
const userRoutes=require('./routes/user')
const bankRoutes=require('./routes/bank')
const path=require('path')
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/api/v1/user',userRoutes)
app.use('/api/v1/account',bankRoutes)
    const __dirname=path.resolve();
    app.use(express.static(path.join(__dirname, 'dist/index.html')));
    app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname,"dist", 'index.html'));
});


app.listen('3000',()=>{
    console.log("The port 3000 is live")
})