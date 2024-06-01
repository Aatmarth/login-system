const express= require("express");
const app= express()
const bodyParser = require('body-parser');
const port =3004;
const nocache = require('nocache')
const session=require ('express-session')


app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use(session({
    secret:'iohsdofhowehfoiwo',
    resave:false,
    saveUninitialized:true,
    cookie: {maxAge:36000}
}))
app.use(nocache())


app.get('/',(req,res)=>{
    if(req.session.user){
        res.redirect('/home')
    }else{
        res.render('login')
    }
})

app.post('/login',(req,res)=>{
    const {name,pass}=req.body
    console.log(name)
    console.log(pass)
    if(name==="admin" && pass=="123"){
        req.session.user= {name}
        res.redirect('/home')
    }else{
        res.render('login',{message:"Login failed"})
    }
})
app.get("/home",(req,res)=>{
    if(!req.session.user){
        res.redirect('/')
    }else{
        res.render("home")
    }
    
})

app.get("/logout",(req,res)=>{
    console.log(req.session);
    req.session.destroy();
   
    res.render('login',{success:"Logout Successfully!"} )
})


app.listen(port,()=>{
    console.log(`server is up !.. http://localhost:${port}`);
}) 