import React from 'react'
import Navbar from '../component/Navbar'
import Header from '../component/Header'
import Featured from '../component/Featured'
import PropertyList from '../component/PropertyList'
import FeaturedProperty from '../component/FeaturedProperty'
import MailList from '../component/MailList'
import Footer from '../component/Footer'
import useFetch from '../hooks/useFetch'

const Home = () => {
    
  return (
    <>
        <div className='bg-blue-900'>
            <Navbar/>
            <Header/>
        </div>
        <div className='bg-gray-100 pb-8'>
            <Featured/>
            <h1 className='w-[80%] mx-auto font-bold text-2xl text-gray-800 pb-8'>Browse by property type</h1>
            <PropertyList/>
            <h1 className='w-[80%] mx-auto font-bold text-2xl text-gray-800 pb-8'>Homes guests love</h1>
            <FeaturedProperty/>
            <div className='bg-blue-900 mt-16'>
                <MailList/>
            </div>
            <Footer/>
        </div>
        

    </>
  )
}

export default Home