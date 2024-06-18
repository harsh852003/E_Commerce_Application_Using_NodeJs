import React, { useState } from 'react'

function AddProduct() {
    const [name,setName]= useState("")
    const [catagory,setCatagory]= useState("")
    const [price,setPrice]= useState("")
    const [company,setCompany]= useState("")
    const[error,setError]=useState(false)

    const addProduct=async()=>{

        if(!name || !price || !catagory || !company){
        setError(true)    
        return false
        }

        console.log(name,catagory,price,company)
        const userId = JSON.parse(localStorage.getItem('user'))._id
        let result = await fetch("http://localhost:5000/add",{
            method : "post",
            body:JSON.stringify({name,catagory,price,company,userId}),
            headers: {
                'Content-type':'application/json',
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
        result = await result.json()
        console.log(result)
        localStorage.setItem("products",JSON.stringify(result))

    }
  
   
    return(
    <div className='product'>

        <input type="text" className='inputbox' value={name} onChange={(e)=>setName(e.target.value)} placeholder="Enter your product name"/>
        {error && !name &&<span className='invalid-input'>invalid name </span>}
        <input type="text"  className='inputbox' value={catagory} onChange={(e)=>setCatagory(e.target.value)} placeholder="Enter your product catagory"/>
        {error && !catagory && <span className='invalid-input'>invalid catagory </span>}
        <input type="text"  className='inputbox' value={price} onChange={(e)=>setPrice(e.target.value)}placeholder="Enter your product price"/>
        {error && !price && <span className='invalid-input'>invalid price </span>}
        <input type="text"  className='inputbox' value={company} onChange={(e)=>setCompany(e.target.value)}placeholder="Enter your product company"/>
        {error && !company && <span className='invalid-input'>invalid company </span>}

        <button className='button'onClick={addProduct}> Add Product</button>
    </div>
    )
}

export default AddProduct