import{u,R as s,j as e}from"./index-B5fsa9sE.js";import{p as m,e as g,a as x}from"./atoms-CukL-lKO.js";import{H as h,S as p,B as j}from"./SubHeading-tS0ABVf7.js";import{I as o,B as f}from"./Button-qpT4TpvO.js";function S(){const n=u(),[l,i]=s(m),[c,r]=s(g);return e.jsx("div",{className:"bg-slate-300 h-screen flex justify-center",children:e.jsx("div",{className:"flex flex-col justify-center",children:e.jsxs("div",{className:"rounded-lg bg-white w-80 text-center p-2 h-max px-4",children:[e.jsx(h,{label:"Sign in"}),e.jsx(p,{label:"Enter your credentials to access your account"}),e.jsx(o,{placeholder:"harkirat@gmail.com",label:"Email",onChange:a=>{r(a.target.value)}}),e.jsx(o,{onChange:a=>{i(a.target.value)},placeholder:"123456",label:"Password"}),e.jsx(f,{label:"submit",onClick:async()=>{let d={method:"get",maxBodyLength:1/0,url:"localhost:3000/api/v1/user/signin",headers:{"Content-Type":"application/json"},data:{Email:c,password:l}};x.request(d).then(t=>{console.log(JSON.stringify(t.data)),localStorage.setItem("token","$response.data.token")}).catch(t=>{console.log(t)}),n("/dashboard")}}),e.jsx("div",{className:"pt-4"}),e.jsx(j,{label:"Don't have an account?",buttonText:"Sign up",to:"/"})]})})})}export{S as default};