import React from 'react'
import { useState,useEffect } from 'react'
import {useNavigate} from 'react-router-dom'

function Signup() {
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const[password,setPassword]=useState("")
    const navigate = useNavigate()

    useEffect(()=>{
        const auth = localStorage.getItem('user')
        if(auth){
            navigate('/')
        }
    })  

    const collectData=async()=>{
        console.warn(name,email,password)
        let result = await fetch('http://localhost:5000/register',{
            method: 'post',
            body:JSON.stringify( {name,email,password}),
            headers: {
                'Content-type':'application/json'
            }
        })
        result = await result.json()
        console.warn(result)
        localStorage.setItem("user",JSON.stringify(result.result))
        localStorage.setItem("token",JSON.stringify(result.auth))
        if(result){
            navigate('/')
        }
    }
    return (
        <div className='register'>
            <h1>Register</h1>
            <input type="text" className='inputbox'  value={name} onChange={(e)=>setName(e.target.value)} placeholder='Enter Your Name' />
            <input type="text" className='inputbox'  value={email} onChange={(e)=>setEmail(e.target.value)}placeholder='Enter Your Email' />
            <input type="password" className='inputbox'  value={password} onChange={(e)=>setPassword(e.target.value)}placeholder='Password' />
            
            <button className='button'  onClick ={collectData} type='button'>Sign Up</button>
        </div>
    )
}

export default Signup