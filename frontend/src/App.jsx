import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './COMPONENTS/Navbar'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Footer from './COMPONENTS/Footer'
import Signup from './COMPONENTS/Signup'
import PrivateComponent from './COMPONENTS/PrivateComponent'
import Login from './COMPONENTS/Login'
import AddProduct from './COMPONENTS/AddProduct'
import ProductList from './COMPONENTS/ProductList'
import UpdateProduct from './COMPONENTS/UpdateProduct'

function App() {
  
  return (
    <>
      <div className="App">
      <BrowserRouter>    

      <Navbar/>

      <Routes>

        <Route element= {<PrivateComponent/>} >
        <Route path="/" element={<ProductList/>}></Route>
        <Route path="/add" element={<AddProduct/>}></Route>
        <Route path="/update/:id" element={<UpdateProduct />}></Route>
        <Route path="/logout" element={<h1>You are logout!</h1>}></Route>
        <Route path="/profile" element={<h1>Your Profile</h1>}></Route>
        </Route>

        <Route path = "/signup" element={<Signup/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
      </Routes>
      </BrowserRouter>  
      <Footer/> 
      </div>
    </>
  )
}

export default App
