
import React, { useState } from 'react'
// temporary based login for gec gandhinagar hackathon
function Login1() {

  const[Email,setEmail] = useState(null);
  const[pwd,setpwd] = useState(null);

  const handleLogin=async()=>{
    // console.log(Email,pwd);--> step 1
    let result= await fetch("/url",{

        method:"post",
        body: result.Json.Stringyfy({Email,pwd}),
        headers: {
            'Content-type': 'application/json'
        }
    })
    result = await result.json()
    console.log(result)
  }
  return (
    <div>
        <div className='login'>
            <h1>Login page</h1>
            <input type='text' className='text' value={Email} id='email' name='email' placeholder='Enter your Email here' onChange={(e)=>setEmail(e.target.value)}/>
            <input type='text' className='text' value={pwd} id='pwd' name='pwd' placeholder='Enter your password here'onChange={(e)=>setpwd(e.target.value)}/>

            <button className='btn' type='button' onClick={handleLogin}>Login</button>
                
        

        </div>
    </div>
  )
}

export default Login1