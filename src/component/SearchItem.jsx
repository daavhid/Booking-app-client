import React from 'react'
import { Link } from 'react-router-dom'

const SearchItem = ({item}) => {
  return (
    <div className='flex  gap-4 p-2 border rounded-md shadow-lg '>
        <div className='basis-[30%]'>
            <img src="https://cf.bstatic.com/xdata/images/hotel/square600/261707778.webp?k=fa6b6128468ec15e81f7d076b6f2473fa3a80c255582f155cae35f9edbffdd78&o=&s=1" alt="" 
            className='object-cover w-full h-full'/>

        </div>
        <div className='flex basis-4/5 justify-between '>
            <div className='flex-col flex gap-2.5 '>
                <h1 className='text-sky-600 text-xl font-bold'>{item.name}</h1>
                <span className='text-sm text-black/50'>500m from center</span>
                <span className='bg-green-800 text-white px-2 py-1  rounded-lg w-fit text-sm '>Free airport taxi</span>
                <span className='font-bold text-black'>Studio Apartment with Air conditioning</span>
                <span className='text-sm text-black/50'>{item.desc}</span>
                <span className='text-green-800 font-bold text-sm'>Free cancellation</span>
                <span className='text-green-600 font-light text-sm'> You can cancel later, so lock in this great price today!</span>
            </div>
            <div className='flex-col flex justify-between items-end'> 
                <div className=''>
                    <span className='text-black/50 mx-3'>Excellent</span>
                    <span className='px-1.5  bg-blue-900 text-white '>{item.rating || 8.9}</span>
                </div>
                <div className='flex flex-col gap-1 items-end'>
                    <span className='font-bold text-2xl text-black '>${item.cheapestPrice}</span>
                    <span className='text-sm text-black/50'>includes Taxes and fees</span>
                    <Link to={`/hotels/${item._id}`} className='bg-blue-500 text-white rounded-lg py-2 px-2'>See Availability</Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SearchItem