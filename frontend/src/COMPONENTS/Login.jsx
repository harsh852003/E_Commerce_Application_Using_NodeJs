import React, { useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom'
function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const Navigate = useNavigate()

  useEffect(()=>{
    const auth = localStorage.getItem('user')
    if(auth){
      Navigate('/')
    }
  })

  const handleLogin = async () => {
  
    let result = await fetch('http://localhost:5000/login', {
      method: 'post',
      body: JSON.stringify({ password, email }),
      headers: {
        'Content-type': 'application/json'
        
      }
    })
    result = await result.json()
    console.log(result)
    if(result.user){
      localStorage.setItem("user",JSON.stringify(result.user))
      localStorage.setItem("token",JSON.stringify(result.auth))
      Navigate('/')
    }
    else{
      alert('User not found')
    }
   


  }
  return (
    <div>
      <div className="login">
        <h1>Login Page</h1>
        <input type='text' className='inputbox' name='email' id='email' placeholder='Enter Your Email' onChange={(e) => setEmail(e.target.value)} value={email} />
        <input type='password' className='inputbox' name='password' id='password' placeholder='Enter Your Password' onChange={(e) => setPassword(e.target.value)} value={password} />

        <button className='button' onClick={handleLogin} type='button'>Login</button>
      </div>
    </div>
  )
}

export default Login