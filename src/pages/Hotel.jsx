import React, { useContext, useState } from 'react'
import Navbar from '../component/Navbar'
import Header from '../component/Header'
import MailList from '../component/MailList'
import Footer from '../component/Footer'
import { useParams } from 'react-router-dom'
import {FaLocationDot,FaCircleXmark,FaArrowLeft,FaArrowRight} from 'react-icons/fa6'
import useFetch from '../hooks/useFetch'
import { SearchContext } from '../context/searchContext'
import { format } from 'date-fns'
import Reserve from '../component/Reserve'
// import { SearchContext, } from '../context/searchContext'

const Hotel = () => {
    const [open,setOpen] = useState(false)
    const [reserve,setReserve] = useState(false)
    const [slider,setSlider] = useState(0)
    const {id} = useParams()
    console.log(id,'this is the id ')

    const handleInput = (e)=>{
        console.log(e,e.data)
        e.target.value=''
        if(e.data!=='x'){
            e.target.value = ''     
        }
    }

    // const item = localStorage.getItem()

  

    const {data,loading,error,reFetch} = useFetch(`http://localhost:5000/api/hotels/find/${id}`)
    const hotel= data.hotel
    console.log(hotel)

    const {dates,city,options,diffDay} = useContext(SearchContext)
    console.log(dates,city,diffDay)

    const photos = [
        {
          src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707778.jpg?k=56ba0babbcbbfeb3d3e911728831dcbc390ed2cb16c51d88159f82bf751d04c6&o=&hp=1",
        },
        {
          src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707367.jpg?k=cbacfdeb8404af56a1a94812575d96f6b80f6740fd491d02c6fc3912a16d8757&o=&hp=1",
        },
        {
          src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708745.jpg?k=1aae4678d645c63e0d90cdae8127b15f1e3232d4739bdf387a6578dc3b14bdfd&o=&hp=1",
        },
        {
          src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707776.jpg?k=054bb3e27c9e58d3bb1110349eb5e6e24dacd53fbb0316b9e2519b2bf3c520ae&o=&hp=1",
        },
        {
          src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708693.jpg?k=ea210b4fa329fe302eab55dd9818c0571afba2abd2225ca3a36457f9afa74e94&o=&hp=1",
        },
        {
          src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707389.jpg?k=52156673f9eb6d5d99d3eed9386491a0465ce6f3b995f005ac71abc192dd5827&o=&hp=1",
        },
      ];

      const handleOpen = (i)=>{
        setOpen(true)
        setSlider(prev=>i)
      }

      const handleMove = (direction)=>{
        let newSlide = slider
        if(direction==='l'){
            newSlide = newSlide===0?photos.length-1 : newSlide-1
        }
        else{
            newSlide = newSlide===photos.length-1?0: newSlide+1
        }
        setSlider(prev=>newSlide)
      }
    
  return (
    <>
        
        <div className='relative  min-h-[100vh]'>
            <div className='bg-blue-900 absolute top-0 w-full  -z-1'>
                <Navbar/>
                <Header type='list'/>
            </div>
            {open &&
                <div className='sticky top-[0px] '>
                    <div className=' bg-black/60 absolute top-0 left-0 w-full'>
                        <div className='bg-white rounded-full top-[50%] absolute cursor-pointer   p-3 left-16' onClick={()=>{handleMove('l')}}>

                            <FaArrowLeft className=' text-3xl text-gray-500 ' />
                        </div>
                        <div className='bg-white rounded-full top-[50%] absolute cursor-pointer  right-16 p-3 ' onClick={()=>{handleMove('r')}}>

                            <FaArrowRight className=' text-3xl text-gray-500  ' />
                        </div>
                        <div className='bg-gray-600/50 rounded-full top-[20px] absolute cursor-pointer   right-[20px]' onClick={()=>{setOpen(prev=>!prev)}}>

                            <FaCircleXmark className=' text-3xl text-gray-300 ' />
                        </div>
                        <div className=' z-20 flex items-center  h-[100vh]'>

                            <img src={photos[slider].src} alt="hotelImg" className=' h-[80%] w-[65%]  mx-auto object-cover rounded-lg' />
                        </div>
                    </div>
                </div>
            }
            <div className='pt-[12rem] '>

                <div className='flex w-[80%]  mx-auto justify-between'>
                    <div className='flex flex-col gap-1'>
                        <h1 className='text-xl font-bold'>{hotel?.name}</h1>
                        <div className='flex items-center gap-2'>    
                            <FaLocationDot/>
                            <span className='text-black text-sm'>{hotel?.address}</span>
                        </div>
                        <span className="text-blue-600 font-semibold">
                            Excellent location – {hotel?.distance}m from center
                        </span>
                        <span className="text-green-600">
                            Book a stay over ${hotel?.cheapestPrice} at this property and get a free airport taxi
                        </span>
                    </div>
                    <button className='text-white bg-blue-600 self-start p-3 rounded-md'>
                        Reserve or Book Now
                    </button>
                </div>
                <div className='w-[80%] mx-auto pb-10 pt-6'>

                    <div className='grid grid-cols-3 gap-2 '>
                        {photos.map((photo,i)=>{
                            return (
                                <div key={i} className='cursor-pointer' onClick={()=>handleOpen(i)}>
                                    <img src={photo.src} alt="" />
                                </div>
                            )
                        })}
                    </div>
                    <div className='flex  py-10'>
                        <div className='basis-[95%]'>
                            <h1 className='font-bold text-xl mb-6'>{hotel?.title}</h1>
                            <p className='font-semibold text-sm'> {hotel?.desc}</p>
                        </div>
                        <div className='basis-[35%] bg-sky-300/10 p-8 flex flex-col gap-2'>
                            <h1 className='font-bold text-xl text-gray-600'>Perfect for a {diffDay}-night stay</h1>
                            <p className='text-sm my-3 text-gray-600'> Located in the real heart of Krakow, this property has an
                            excellent location score of 9.8!</p>
                            <h2 className='text-2xl text-gray-600'>
                                <b>${hotel?.cheapestPrice*diffDay*options?.room}</b> ({diffDay} nights)
                            </h2>
                            <button className='text-white bg-blue-900 p-2 rounded-md mt-4 ' onClick={()=>{
                                setReserve(prev=>true)
                            }}>Reserve or Book Now!</button>
                        </div>
                    </div>
                </div>
            </div>
            {reserve &&<Reserve hotelId={id} setReserve={setReserve}/>}
            <div className='bg-blue-800'>
                <MailList/>
            </div>
            <Footer/>
            <input type="text"   id="room" onBeforeInputCapture={handleInput}
         className='text-blue-400  h-4 accent-blue-800' maxLength={2} />
        </div>
    </>
  )
}

export default Hotel