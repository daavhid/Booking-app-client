import React, { useContext, useState } from 'react'
import useFetch from '../hooks/useFetch'
import { SearchContext } from '../context/searchContext'
import axios from 'axios'
import { FaCircleXmark } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'

const Reserve = ({hotelId,setReserve}) => {
    const navigate = useNavigate()
    const id = hotelId
    console.log('id',hotelId)
    const [open,setOpen] = useState(false)
    const [selectedRooms,setSelectedRooms] = useState([])
    const {data,loading,error,reFetch} = useFetch(`http://localhost:5000/api/hotels/getHotelRooms/${id}`)
    console.log('this is',data)
    const {dates} = useContext(SearchContext)

    const handleSelect = (e)=>{
        const selected = e.target.checked
        setSelectedRooms(prev=>{
            return(
                selected?[...prev,e.target.value]:prev.filter(item=>item!=e.target.value)
            )
        })
        console.log(e.target.value)
    }

    const isAvailable = (roomNumber)=>{
        const isFoundList = roomNumber.unavailableDates.filter(date=>{
            const dat = new Date(date).getTime()
            console.log(dat)
            return availableDates.includes(dat)

        })
        const isFound = Boolean(isFoundList.length)
        return !isFound
    }

    const getDateRange = (start,end)=>{
        const startDate = new Date(start)
        const endDate = new Date(end)
        const dates = []

        while (startDate <= endDate){
            dates.push(new Date(startDate).getTime())
            startDate.setDate(startDate.getDate()+1)

        }
        return dates
    }
    const availableDates = getDateRange(dates[0].startDate,dates[0].endDate)

    const handleClick = async ()=>{
        try {
            await Promise.all(selectedRooms.map(room=>{
                const res = axios.patch(`http://localhost:5000/api/rooms/availability/${room}`,{dates:availableDates})
                
            }))
            navigate('/')
            console.log('reserved')

        } catch (error) {
            
        }
    }
  return (
        <div className='w-full bg-black/40  absolute top-0 h-full flex  items-start'>

            <div className='bg-white border w-[30%] mx-auto shadow-lg px-10 py-10  rounded-lg sticky top-[70px] '>
            <div className='bg-gray-600/50 rounded-full top-[20px] absolute cursor-pointer   right-[20px]' onClick={()=>{setOpen(prev=>!prev)}}>

                <FaCircleXmark className=' text-3xl text-gray-300 ' onClick={()=>{
                    setReserve(prev=>false)
                }}/>
            </div>
                <span className='px-8 text-black text-xl'>select your rooms :</span>
                <div className=' py-10 flex flex-col gap-8'>

                    {data?.map((item,id)=>{
                        return(
                            <div key={id} className='flex justify-between items-center'>
                                <div>

                                    <h2 className='text-xl font-semibold'>{item.title}</h2>
                                    <p>{item.desc}</p>
                                    <span>max people:<b>{item.maxPeople}</b></span>
                                    <p className='font-bold'>${item.price}</p>
                                </div>
                                <div className='flex'>

                                    {item.roomNumbers.map((room,id)=>{
                                        return(
                                            <div key={id} className='flex flex-col gap-1 items-center justify-center '>
                                                <label  className='text-xs scale-75 mx-1'>{room.number}</label>
                                                <input type="checkbox"  id="room" value={room._id} onChange={handleSelect}
                                                disabled={!isAvailable(room)} className='text-blue-400 scale-[1.5] h-4 accent-blue-800' />

                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    })}
                </div>
                <button className='bg-blue-600 text-white  text-sm font-semibold px-3 py-4 mt-2 w-full rounded-lg' onClick={handleClick}>Reserve now</button>
            </div>
        </div>
            
  )
}

export default Reserve