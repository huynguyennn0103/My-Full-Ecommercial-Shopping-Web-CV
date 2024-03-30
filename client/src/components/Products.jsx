import styled from "styled-components"
import { popularProducts } from "../data"
import Product from "./Product"
import { useState,useEffect } from "react"
import axios from "axios"
const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`

const Products = ({cat,filters,sort}) => {
    console.log(cat,filters,sort)//coat {color: 'Red', size: 'L'} asc
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([])
  useEffect(()=>{
    const getProducts = async () =>{
      try{
        const res = await axios.get(cat?`http://localhost:5001/api/products?category=${cat}`
        :"http://localhost:5001/api/products")//get products with query
        setProducts(res.data)
      }
      catch(err){

      }
    }
    getProducts()
  },[cat])
  useEffect(()=>{
    cat &&
    setFilteredProducts(
      products.filter((item) =>
        Object.entries(filters).every(([key, value]) =>
          item[key].includes(value)
        )
      )
    );// vd filters: {color: 'Red', size: 'L'} => lay ra cac products co color: red, size: L
  },[cat,filters,products])

  useEffect(()=>{
      if(sort === "newest"){
        setFilteredProducts(prev => [...prev].sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)))
      }
      else if(sort === "asc"){
        setFilteredProducts(prev => [...prev].sort((a,b) => a.price - b.price))
      }
      else {
        setFilteredProducts(prev => [...prev].sort((a,b) => b.price - a.price))
      }
  },[sort])
  return (
    <Container>
      {cat?filteredProducts.map((item) =>(
         <Product item={item} key={item._id}/>
      )):products.slice(0,8).map((item) =>(
        <Product item={item} key={item._id}/>
     ))}
    </Container>
  )
}

export default Products
