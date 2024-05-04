import React from 'react'
import Navbar from '../component/Navbar'
import Header from '../component/Header'
import Search from '../component/Search'
import { useLocation } from 'react-router-dom'

const Hotels = () => {
   
  return (
    <>
        <div className='bg-blue-900'>
            <Navbar/>
            <Header type='list'/>
        </div>
        <div>
            <Search />
        </div>
    </>
  )
}

export default Hotels