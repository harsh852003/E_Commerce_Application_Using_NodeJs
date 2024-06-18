import React, { useState } from 'react'
// for gec gandhinagr hackathon purpose
function SignUp1() {

    const[Name,setName] = useState('');
    const[Email,setEmail] = useState('');
    const[Mobile,setMobile] = useState('');
    const[Pwd,setPwd] = useState('');

    const handleSignUp= async()=>{
        console.log(Name,Email,Pwd,Mobile)//Step 1 to check output is coming or not
        let result = await fetch("/url",{
            method:"post",
            body: result.JSON.stringyfy({Name,Email,Pwd,Mobile}),
            headers : {
                'Content-type': 'application/json'
            }
        })
        result =await result.json()
        console.log(result)
    }



  return (
    <div className='signup'>
        <h1>SignUp</h1>
        <div>
            <input  type='text' id='name' value={Name} placeholder='Enter Your name here' onChange={(e)=>setName(e.target.value)}/>
            <input  type='text' id='email' value={Email} placeholder='Enter Your Email here' onChange={(e)=>setEmail(e.target.value)}/>
            <input  type='number' id='mobile' value={Mobile} placeholder='Enter Your Mobile number here' onChange={(e)=>setMobile(e.target.value)}/>
            <input  type='password' id='pwd' value={Pwd} placeholder='Enter Your password here' onChange={(e)=>setPwd(e.target.value)}/>

            <button type='submit'onClick={handleSignUp} > Register | Signup </button>
        </div>
    </div>
  )
}

export default SignUp1