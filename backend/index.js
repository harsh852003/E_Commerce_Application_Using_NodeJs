const express= require('express')
const config = require('./db/config')
const User = require('./db/Users')
const cors = require('cors')
const Products = require("./db/Product")
const Product = require('./db/Product')
const Jwt = require('jsonwebtoken')

const jwtKey = 'harsh'


const app = express()
app.use(cors())
app.use(express.json())

app.post("/register",async(req,resp)=>{
     let user = new User(req.body)
     let result = await user.save()
     result = result.toObject()
     delete result.password
     // resp.send(result) 
     Jwt.sign({result},jwtKey,{expiresIn:'2h'},(err,token)=>{
          if(err){
               resp.send({result: "Something went wrong , please try again letter"})
          }
          resp.send({result,auth: token})
     })
})

app.post("/login",async(req,resp)=>{
     let user = await User.findOne(req.body).select('-password')
    console.log( req)
    if(req.body.password && req.body.email){
     
     if(user){
          // resp.send(user)
          //for Authentication jwt token

          Jwt.sign({user},jwtKey,{expiresIn:'2h'},(err,token)=>{
               if(err){
                    resp.send({result: "Something went wrong , please try again letter"})
               }
               resp.send({user,auth: token})
          })

         }
         else{
          resp.send({result : 'User not found'})
         }
    }
    else{
     resp.send({result : 'User not found'})
    }
})

app.post("/add",verifyToken,async (req,resp)=>{
     let product = new Product(req.body)
     let result = await product.save()
     resp.send(result) 
})

app.get("/products",verifyToken,async(req,resp)=>{
     let product = await Product.find()
     if(product.length>0){
          resp.send(product)
     }
     else{
          resp.send("No products availabe")
     }
})
app.delete("/products/:id",verifyToken,async(req,resp)=>{
    
     let result = await Product.deleteOne({_id:req.params.id})
     resp.send(result)
})

app.get("/products/:id",verifyToken, async(req,resp)=>{

     let result = await Product.findOne({_id:req.params.id})
     if(result){
     resp.send(result)
     }
     else{
     resp.send("id is incorrect")     
     }
})

app.put("/products/:id",verifyToken,async(req,resp)=>{
     let result = await Product.updateOne({_id:req.params.id},
     {
          $set: req.body
     })
     resp.send(result)
})

app.get("/search/:key",verifyToken,async(req,resp)=>{
     let result = await Product.find({
          "$or":[
               {name: {$regex : req.params.key}},
               {catagory: {$regex : req.params.key}},
               {price: {$regex : req.params.key}}
             
          ]
     })
     resp.send(result)
})

function verifyToken(req,resp,next){
     let token = req.headers['authorization']
     // console.log("middleware called" token)
     if(token){
          token = token.split(' ')[1]
          console.log('middleware called if condition',token)

          Jwt.verify(token,jwtKey,(err,valid)=>{
               if(err){
                    resp.status(401).send({result: "Please provide valid token"})
               }
               else{
                    next()
               }
          })
     }
     else{
          resp.status(403).send({result: "please enter token with header"})
     }
     // next()
}

app.listen(5000)