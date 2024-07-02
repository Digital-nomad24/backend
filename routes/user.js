const express=require('express')
const router=express.Router()
const {userZod,signinzod}=require('../authentication/zodcheck')
const {User,Account}=require('../db/db')
const {jwt_secret,saltRounds}=require('../config')
const checktoken=require('../authentication/auth')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')
const checkzod=(req,res,next)=>{
    const result=userZod.safeParse(req.body)
    console.log(result)
    if(result.success){
        console.log("zod verified")
        next()
    }
    else
    {
        console.log("error")
        res.send({erro:"invalid data"})
        }
}
const checkzod2=(req,res,next)=>{
    const result=signinzod.safeParse(req.body)
    console.log(result)
    if(result.success){
        console.log("zod verified")
        next()
    }
    else
    {
        res.send({erro:"invalid data"})
        console.log("error")}
}
router.post('/signup',checkzod,async (req,res)=>{
    const{username,firstName,lastName,password,Email}=req.body;
    console.log(req.body);
    const hash=await bcrypt.hash(password,saltRounds)
    const exist=await User.findOne({
        username:username
    })
    if(exist){
        return res.json({
            error:'username already taken'
        })
    }
    const newaccount=await Account.create({
        balance:Math.floor((Math.random()*10000) +1)
    })
    const newuser=await User.create({
        username:username,
        firstName:firstName,
        lastName:lastName,
        password:hash,
        Email:Email,
        Account:newaccount._id
    })
    console.log(newuser)
    const token=jwt.sign({'userId':newuser._id,'password':password},`${jwt_secret}`)
    await newuser.save();
    await newaccount.save()
    res.json({
        success:'user registered',
        token:token
    })
    }
)
router.post('/signin',async (req,res)=>{
    const enteredEmail=req.body.Email
    const enteredPassword=req.body.password
    const find= await User.findOne(
       {
        Email:enteredEmail
       }
    )
    const hashedPasswordFromDatabase=find.password;
    console.log(hashedPasswordFromDatabase)
    const verify=await bcrypt.compare(enteredPassword, hashedPasswordFromDatabase)
    const token=jwt.sign({'userId':find._id,'password':enteredPassword},`${jwt_secret}`)
        if(find){if(verify==true)
        {
        res.json({
        Success:'Signed in',
        token:token})
        }
    else
    res.json({message:"incorrect password"})}
else
{
    res.json({error:"invalid email"})
}
}
)
router.put('/update',checktoken,async (req,res)=>{
    try{
    const{username,firstName,password}=req.body;
    const {token}=req.headers
    const find= await User.findOne({
        username:username,
        password:password
    })
    if(find)
    {
        if(find.token===token)
        {
            const newuser=await User.updateOne({username:username,firstName:firstName})
            res.json({success:'updated successfully'})
    }
    else
    res.json({Error:'Incorrect'})}
}catch(e){
    console.log("error"+e)
}
})
router.delete('/delete',checktoken,async (req,res)=>{
    try{
    const{username,firstName,password}=req.body;
    const {token}=req.headers
    const find= await User.findOne({
        username:username,
        password:password
    })
    if(find)
    {
        if(find.token===token)
        {
            await User.deleteOne({username:username,firstName:firstName})
            res.json({success:'deleted successfully'})
    }
    else
    res.json({Error:'Incorrect'})}
}catch(e){
    console.log("error"+e)
}
})
router.get('/filter',async (req,res)=>{
    const param=req.query.filter;
    const find= await User.find({
        $or:[
            {
                'firstName':{
                    "$regex":param
                }
            },
            {
                'lastName':{
                    "$regex":param
                }
            }
        ]
    })
    res.json({user:find.map(f=>({
        username:f.username,
        firstName:f.firstName,
        lastName:f.lastName,
        userId:f._id
    }))})
})
module.exports=router
