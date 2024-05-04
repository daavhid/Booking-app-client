import React from 'react'
import useFetch from '../hooks/useFetch'

const PropertyList = () => {
    const {data,loading,error} = useFetch('http://localhost:5000/api/hotels/countByType?types=hotel,apartment,villas,resorts,cabins');
    
    const photos =[
        {src:"https://cf.bstatic.com/xdata/images/xphoto/square300/57584488.webp?k=bf724e4e9b9b75480bbe7fc675460a089ba6414fe4693b83ea3fdd8e938832a6&o="},
        {src:"https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-apartments_300/9f60235dc09a3ac3f0a93adbc901c61ecd1ce72e.jpg"},
        {src:"https://cf.bstatic.com/static/img/theme-index/carousel_320x240/bg_resorts/6f87c6143fbd51a0bb5d15ca3b9cf84211ab0884.jpg"},
        {src:"https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-villas_300/dd0d7f8202676306a661aa4f0cf1ffab31286211.jpg"},
        {src:"https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-chalet_300/8ee014fcc493cb3334e25893a1dee8c6d36ed0ba.jpg"}

    ]
  return (
    <div className='flex max-w-[80%] mx-auto gap-6 text-gray-800'>
        {!loading?<>
            {photos.map((photo,id)=>{
                return(

                    <div key={id} className='flex-1 '>
                        <img src={photo.src} alt="" className='object-cover w-full h-3/4 rounded-[10px] '/>
                        <div className='leading-loose'>
                            <h1 className='font-bold tracking-wider'>{data[id]?.type}</h1>
                            <p className='text-xs'>{data[id]?.count} {data[id]?.type}</p>
                        </div>
                    </div>
                )
            })}
        </>:'loading....'}
    </div>
  )
}

export default PropertyList