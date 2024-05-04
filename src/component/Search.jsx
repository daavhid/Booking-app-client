import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import {format} from 'date-fns'
import { DateRangePicker } from 'react-date-range'
import SearchItem from './SearchItem'
import useFetch from '../hooks/useFetch'
import { SearchContext } from '../context/searchContext'

const Search = () => {
    const localItem = JSON.parse(localStorage.getItem('item'))
    const location = useLocation()
    const [destination,setDestination] = useState(localItem.city)
    const [dates,setDate] = useState(localItem.dates)
    const [options,setOptions] = useState(localItem.options)
    const [show,setShow] = useState(false)
    const [select,setSelect] = useState(0)
    const [min,setMin] = useState(0)
    const [max,setMax] = useState(0)
    
    const {dispatch,city,diffDay} = useContext(SearchContext)
    console.log(city,diffDay,dates)

    

    // setDestination(localItem.destination)
    // setDate(localItem.dates)
    // setOptions(localItem.options)
    const {data,loading,error,reFetch} = useFetch(`http://localhost:5000/api/hotels?city=${destination}&min=${min||0}&max=${max||999}`)
    console.log(data)

    useEffect(()=>{
        reFetch()
    },[select])

    const handleSearch = ()=>{
        const Day = Math.abs(dates[0]?.startDate -  dates[0]?.endDate)/(1000*60*60*24) || diffDay
        const item = {city:destination,dates,options,diffDay:Day}
        dispatch({type:"NEW_SEARCH",payLoad:item} )
        localStorage.setItem('item',JSON.stringify(item))
    }

    



    
  return (
    <div className='flex max-w-[80%] gap-4 mx-auto mt-8 '>
        <div className='bg-yellow-500 basis-[30%] px-4 pt-1 pb-3 rounded-lg flex flex-col gap-2  top-6 sticky self-start'>
                {/* search */}
                <h1 className='text-3xl font-bold text-gray-900/60'>Search</h1>
                <div className='flex flex-col'>
                    <label htmlFor="destination" className='font-semibold text-gray-900/60'>Destination</label>
                    <input type="text" id='destination' className='py-2 px-2 outline-blue-700' placeholder={ destination} onChange={(e)=>setDestination(prev=>e.target.value)}/>
                </div>
                <div className='flex flex-col relative '>
                    <label htmlFor="checkin" className='font-semibold text-gray-900/60 '>Check-in- date</label>
                    <span type="text"  id='checkin' className='py-2 px-2 cursor-pointer active:outline-blue-700 bg-white '
                    onClick={()=>{
                        setShow(prev=>!prev)
                    }}>{`${format(dates[0].startDate,'dd/MM/yyyy')} to ${format(dates[0].endDate,'dd/MM/yyyy')} `}</span>
                    <div  className={`${show ?'block':'hidden'} mt-1.5`}>
                        <DateRangePicker
                                editableDateInputs={true}
                                onChange={item => setDate([item.selection])}
                                moveRangeOnFirstSelection={true}
                                ranges={dates}
                                minDate={new Date()}
                                staticRanges={[]}
                                inputRanges={[]}
                        />
                    </div>
                </div>
                <div className='flex flex-col gap-2'>
                    <h1 className='font-semibold text-gray-900/60'>options</h1>
                    <div className='flex justify-between  items-center'>
                        <label htmlFor="minPrice">Min price (per night)</label>
                        <input type="number" min={0} id='minPrice'  className='w-16 p-1 rounded-md shadow-lg' onChange={(e)=>setMin(prev=>e.target.value)}/>
                    </div>
                    <div className='flex justify-between  items-center'>
                        <label htmlFor="maxPrice">Max price (per night)</label>
                        <input type="number" min={0} id='maxPrice'  className='w-16 p-1 rounded-md shadow-lg' onChange={(e)=>setMax(prev=>e.target.value)}/>
                    </div>
                    <div className='flex justify-between items-center'>
                        <label htmlFor="adult">Adult</label>
                        <input type="number" min={0} id='adult' defaultValue={options.adult} className='w-16 p-1 rounded-md shadow-lg'/>
                    </div>
                    <div className='flex justify-between items-center'>
                        <label htmlFor="children">Children</label>
                        <input type="number" min={0} id='children' defaultValue={options.children} className='w-16 p-1 rounded-md shadow-lg'/>
                    </div>
                    <div className='flex justify-between items-center'>
                        <label htmlFor="room">Room</label>
                        <input type="number" min={0} id='room' defaultValue={options.room} className='w-16 p-1 rounded-md shadow-lg'/>
                    </div>
                </div>
                <button className='bg-blue-600 text-white  text-sm font-semibold px-3 py-4 mt-8' onClick={()=>{
                    setSelect(prev=>!prev)
                    handleSearch()
                }
                    }>Search</button>
            </div>
        <div className='flex-1 flex flex-col gap-6'>
            {loading?'loading...':
                <>
                    {data?.hotels?.map((item,id)=>{
                        return (

                            <SearchItem item={item} key={id}/>
                        )
                    })}
                    {data?.hotels?.length===0 && 
                        <div className='self-center'>
                           <h1 className='text-3xl font-bold text-gray-700'>No Listing matched your search</h1> 
                        </div>
                    }
                </>
            }
            {/* <SearchItem/>
            <SearchItem/>
            <SearchItem/>
            <SearchItem/>
            <SearchItem/>
            <SearchItem/>
            <SearchItem/> */}
        </div>
            
    </div>
  )
}

export default Search