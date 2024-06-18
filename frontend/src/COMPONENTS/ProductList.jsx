import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function ProductList() {

    const [products,setProducts] = useState([])
    useEffect(()=>{
        getProducts()
    },[])

    const getProducts=async()=>{
        let result = await fetch("http://localhost:5000/products",{
          headers:{
            authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
          }
        })
        result = await result.json()
        setProducts(result)
    }

    const deleteProduct=async(id)=>{
      let result = await fetch(`http://localhost:5000/products/${id}`,{
        method: "delete",
        headers:{
          authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
      })
      result = await result.json()
      if(result){
        getProducts()
        
      }
      alert("product is successfully deleted")
    
    }
    const searchBar=async(event)=>{
      // console.log(event.target.value)
      let key = event.target.value
      if(key){
        let result = await fetch(`http://localhost:5000/search/${key}`,{
          headers:{
            authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
          }
        })
        result = await result.json()
        if(result){
          setProducts(result)
        }
      }
      else{
        getProducts()
      }
      }
     
  return (
    <div className='product-list'>
      <h2>Product list</h2>
      <input type="text"className='search-product' placeholder="search product here" onChange={searchBar}/>

       <ul>
        <li>Sr.no</li>
        <li>Name</li>
        <li>Price</li>
        <li>Catagory</li>
        <li>Operation</li>
       </ul>
      {
        products.length>0 ? products.map((item,index)=>
        <ul key={item._id} >
        <li>{index+1}</li>
        <li>{item.name} </li>
        <li>{item.price} </li>
        <li>{item.catagory}</li>
        <li>
          <button onClick={()=>deleteProduct(item._id)}>Delete</button>
          <Link to={"/update/"+item._id}>Update</Link>
        </li>
        
       </ul>
       )
       :<h2>Result not found</h2>
      }
    </div>
  )
}

export default ProductList