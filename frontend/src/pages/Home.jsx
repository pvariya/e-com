import React from 'react'
import Hero from '../components/Layout/Hero'
import GenderCollectionSection from '../components/Products/GenderCollectionSection'
import NewArrivel from '../components/Products/NewArrivel'
import ProductDetails from '../components/Products/ProductDetails'
import ProductGrid from '../components/Products/ProductGrid'
import FeaturedCollection from '../components/Products/FeaturedCollection'
import FeaturedSection from '../components/Products/FeaturedSection'

const placeholderProduct = [
  {
    _id: 2,
    name: "Product 2",
    price: 150,
    img: [{ url: "https://picsum.photos/500/500?random=3",alttext: "Product 1" }],
  },
  {
    _id: 3,
    name: "Product 3",
    price: 150,
    img: [{ url: "https://picsum.photos/500/500?random=4",alttext: "Product 1" }],
  },
  {
    _id: 4,
    name: "Product 4",
    price: 150,
    img: [{ url: "https://picsum.photos/500/500?random=5",alttext: "Product 1" }],
  },
  {
    _id: 5,
    name: "Product 5",
    price: 150,
    img: [{ url: "https://picsum.photos/500/500?random=6",alttext: "Product 1" }],
  },
  {
    _id: 2,
    name: "Product 6",
    price: 150,
    img: [{ url: "https://picsum.photos/500/500?random=3",alttext: "Product 1" }],
  },
  {
    _id: 3,
    name: "Product 7",
    price: 150,
    img: [{ url: "https://picsum.photos/500/500?random=4",alttext: "Product 1" }],
  },
  {
    _id: 4,
    name: "Product 8",
    price: 150,
    img: [{ url: "https://picsum.photos/500/500?random=5",alttext: "Product 1" }],
  },
  {
    _id: 5,
    name: "Product 9",
    price: 150,
    img: [{ url: "https://picsum.photos/500/500?random=6",alttext: "Product 1" }],
  },
]
const Home = () => {
  return (
    <div>
        <Hero/>
        <GenderCollectionSection/> 
        <NewArrivel/>


        <h2 className='text-3xl text-center font-bold mb-4'>
          Best Seller
        </h2>
        <ProductDetails/>


        <div className='container mx-auto'>
          <h2 className='text-3xl  text-center font-bold mb-4'>
            Top Wears for women
          </h2>
          <ProductGrid products={placeholderProduct}/>
        </div>


        <FeaturedCollection/>
        <FeaturedSection/>
      
    </div>
  )
}

export default Home