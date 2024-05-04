import React from 'react'
import useFetch from '../hooks/useFetch';
import Hotel from '../../../api/models/Hotel';

const FeaturedProperty = () => {
    const {data,loading,error} = useFetch('http://localhost:5000/api/hotels?featured=true&limit=4');
    console.log(data)
  return (
    <div className='grid grid-cols-4 gap-4  mx-auto max-w-[80%]'>
        {data?.hotels?.map((item,id)=>{
            return (

                <div key={id}>
                    <div className='h-[300px] border w-full object-cover rounded-lg shadow-lg'>
                        <img src={item.photos[0]} alt="" className=' object-cover '/>
                    </div>
                    <div className='leading-loose'>
                        <h1 className='font-bold'>{item.name}</h1>
                        <p className='text-gray-500 text-sm'>{item.city}</p>
                        <p className='font-medium'>Starting from ${item.cheapestPrice}</p>
                        <div className='flex gap-6 items-center'>
                            <button className=' px-1.5  bg-blue-900 text-white '>{item.rating || 8.9}</button>
                            <p className='text-gray-500'>Excellent</p>
                        </div>
                    </div>
                </div>
            )
        })}
        
    </div>
  )
}

export default FeaturedProperty