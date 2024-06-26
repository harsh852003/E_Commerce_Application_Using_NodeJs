import React from 'react'
import { Link,useNavigate } from 'react-router-dom'

function Navbar() {
  const auth = localStorage.getItem('user')
  const navigate = useNavigate()
  const logout = ()=>{
    localStorage.clear()
    navigate('/signup')

  }
  return (
    <div>
      {
      auth ?
      <ul className='nav-ul'>
        <li><Link to="/">Products</Link></li>
        <li><Link to="/add">Add Products</Link></li>
        <li><Link to="/update">Update Products</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <Link onClick={logout} to="/signup">Logout</Link>
        </ul>
        :
        <ul className='nav-ul nav-right'>
        <li><Link to="/signup">SignUp</Link></li> 
         <li><Link to="/login">Login</Link></li>
         </ul>
         }
    </div>
  )
}

export default Navbar