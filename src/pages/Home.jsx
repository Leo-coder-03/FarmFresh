import React from 'react'
import MainBanner from '../components/mainBanner/MainBanner'
import Categories from '../components/Categories'
import BestSeller from '../components/BestSeller'

const Home = () => {
  return (
    <div className='md:mt-10'>
    <MainBanner/>
    <Categories/>
    <BestSeller/>
    </div>
  )
}

export default Home
