import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { add } from '../store/cartSlice'
import { fetchProducts } from '../store/productSlice'
import { STATUSES } from '../store/productSlice'

const Products = () => {
  // const [products, setProducts] = useState([])
  const { data: products, status } = useSelector((state) => state.product)

  useEffect(() => {
    // const fetchProducts = async () => {
    //   const res = await fetch('https://fakestoreapi.com/products')
    //   const data = await res.json()
    //   setProducts(data)
    // }
    // fetchProducts()
    dispatch(fetchProducts())
  }, [])

  const dispatch = useDispatch()
  const handleAdd = (product) => {
    dispatch(add(product))
  }
  if (status === STATUSES.LOADING) {
    return <h2>Loading...</h2>
  }
  if (status === STATUSES.ERROR) {
    return <h2>Something went Wrong!</h2>
  }

  return (
    <div className='productsWrapper'>
      {products.map((product) => (
        <div className='card' key={product.id}>
          <img src={product.image} alt={product.title} />
          <h4>{product.title}</h4>
          <h5>{product.price}</h5>
          <button className='btn' onClick={() => handleAdd(product)}>
            Add to cart
          </button>
        </div>
      ))}
    </div>
  )
}

export default Products
