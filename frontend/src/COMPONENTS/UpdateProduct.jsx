import React, { useEffect, useState } from 'react'
import { Navigate, json, useNavigate, useParams } from 'react-router-dom'

function UpdateProduct() {
  const [name,setName]= useState("")
  const [catagory,setCatagory]= useState("")
  const [price,setPrice]= useState("")
  const [company,setCompany]= useState("")

  const params = useParams()
  const navigate = useNavigate()

  useEffect(()=>{
    getProductDetails()
  },[])
  // const[error,setError]=useState(false)

  const getProductDetails = async()=>{
    console.log(params)
    let result = await fetch(`http://localhost:5000/products/${params.id}`,{
      headers:{
        authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    })

    result = await result.json()

    setName(result.name)
    setCatagory(result.catagory)
    setPrice(result.price)
    setCompany(result.company)
  

  }

  const updateProduct=async()=>{

    console.log(name,catagory,price,company)
    let result = await fetch(`http://localhost:5000/products/${params.id}`,{
            method : "put",
            body:JSON.stringify({name,catagory,price,company}),
            headers: {
                'Content-type':'application/json',
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
          
            }
        })
        result = await result.json()
        console.log(result)
        navigate('/')
  }

 
  return(
  <div className='product'>
    <h1>Update Product</h1>

      <input type="text" className='inputbox' value={name} onChange={(e)=>setName(e.target.value)} placeholder="Enter your product name"/>
      
      <input type="text"  className='inputbox' value={catagory} onChange={(e)=>setCatagory(e.target.value)} placeholder="Enter your product catagory"/>
     
      <input type="text"  className='inputbox' value={price} onChange={(e)=>setPrice(e.target.value)}placeholder="Enter your product price"/>
      
      <input type="text"  className='inputbox' value={company} onChange={(e)=>setCompany(e.target.value)}placeholder="Enter your product company"/>
      
      <button className='button'onClick={updateProduct}> Update Product</button>
  </div>
  )
}

export default UpdateProduct