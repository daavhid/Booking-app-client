import {format} from 'date-fns'
import React, { useContext, useState } from 'react'
import { DateRangePicker } from 'react-date-range'
import {FaBed, FaCar, FaPlane, FaTaxi} from 'react-icons/fa'
import {FaPerson,FaCalendarDay} from 'react-icons/fa6'
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css';
import { useNavigate } from 'react-router-dom'
import { SearchContext } from '../context/searchContext'

const Header = ({type}) => {
    const navigate = useNavigate()
    

    const [destination,setDestination] = useState('')
    const [show,setShow] = useState(false)
    const [dates, setDate] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
      ]);
    const [showOptions,setShowOptions] = useState(false)
    const [options,setOptions] = useState({
        adult:0,
        children:0,
        room:1
    })

    const handleOptions = (name,option)=>{
        setOptions(prev=>{
            // const value = option==='i'&&prev[name]+1
            if(prev[name]===0 && option==='d'){
                return(
                    {
                        ...prev
                    }
                )
            }else{

                return(
                    
                    {...prev,
                        [name]:option==='i'?prev[name]+1 : prev[name]-1
                    }
                )
            }
        })
    
    }

    const {dispatch} = useContext(SearchContext)

    const handleSelect= ()=>{
        const diffDay = Math.abs(dates[0]?.startDate -  dates[0]?.endDate)/(1000*60*60*24)
        console.log(diffDay)
        const item = {city:destination,dates,options,diffDay}
        dispatch({type:'NEW_SEARCH',payLoad:item})
        localStorage.setItem('item',JSON.stringify(item))
        navigate('/hotels',{state:{destination,dates,options}})
    }


  return (
    <div className='mx-auto max-w-[80%] py-8 pt-4 relative'>
        <div className='flex text-gray-300 gap-6'>

            <div className='flex items-center gap-3 active cursor-pointer'>
                
                <FaBed className='text-white text-xl'/>
                <p className='font-bold'>Stays</p>
            </div>
            <div className='flex items-center gap-3 cursor-pointer'>
                <FaPlane className='text-white text-xl'/>
                <p className='font-bold'>Flight</p>
            </div>
            <div className='flex items-center gap-3 cursor-pointer'>
                <FaCar className='text-white text-xl '/>
                <p className='font-bold'>Car rentals</p>
            </div>
            <div className='flex items-center gap-3 cursor-pointer'>
                <FaBed className='text-white text-xl'/>
                <p className='font-bold'>Attraction</p>
            </div>
            <div className='flex items-center gap-3 cursor-pointer'>
                <FaTaxi className='text-white text-xl '/>
                <p className='font-bold '>Airport taxis</p>
            </div>
        </div>
        {type!=='list'&&
        <>
            <div className='py-10'>
                <h1 className='font-bold text-white text-3xl leading-loose'>A lifetime of discounts? Its Genius.</h1>
                <p className='text-gray-300 font-medium'>Get rewarded for your travels - unlock instant savings of 10% or more with a free XamiBooking account</p>
                <button className='bg-blue-600 text-white py-3 text-sm font-semibold px-3 my-4'>Sign in / Register</button>
            </div>
        
            
            <div className='bg-white px-16 border-2 border-yellow-400 rounded-md flex justify-between w-full py-2 text-gray-400 absolute bottom-0 translate-y-[50%] z-50'>
                <div
                onClick={()=>{
                    setShow(prev=>false)
                    setShowOptions(prev=>false)
                }}
                className='flex items-center gap-4'>
                    <FaBed className=''/>
                    <input type="text" placeholder='where are you going?' className='outline-none text-gray-800/90 ' spellCheck='false' onChange={e=>{
                        setDestination(e.target.value)
                    }}/>
                </div>
                <div className='flex items-center gap-4 cursor-pointer'>
                    <FaCalendarDay className='text-gray-400'/>
                    <span 
                    className=''
                    onClick={()=>{
                        setShow(prev=>!prev)
                        setShowOptions(prev=>false)
                    }}>{format(dates[0]?.startDate,'dd/MM/yyyy')} to {format(dates[0]?.endDate,'dd/MM/yyyy')}</span>
                    <div className={`transition-all duration-1000 ${show ?'block':'hidden'} absolute top-[50px] duration-1000 w-[400px] z-30` }>

                        <DateRangePicker
                            editableDateInputs={true}
                            onChange={item => setDate([item.selection])}
                            moveRangeOnFirstSelection={true}
                            ranges={dates}
                            minDate={new Date()}
                            staticRanges={[]}
                            inputRanges={[]}
                            className='z-50'

                            />
                    </div>
                    
                </div>
                <div className='flex items-center gap-4 cursor-pointer relative'>
                    <FaPerson className='text-gray-400'/>
                    <span 
                    onClick={()=>{
                        setShowOptions(prev=>!prev)
                        setShow(prev=>false)

                    }}>{options.adult} adult - {options.children} children - rooms {options.room}</span>
                    <div className={` ${showOptions ?'block':'hidden'} absolute top-[45px] bg-white w-full`}>
                        <div className='flex items-center justify-between p-3'>
                            <p className='text-gray-400 font-medium'>Adult</p>
                            <div className='flex items-center text-black gap-4'>

                                <div 
                                onClick={()=>{
                                    handleOptions('adult','d')
                                }
                                }
                                className={`py-1 px-4 border border-blue-500 ${options.adult===0?'bg-gray-100':'bg-white'}`}>-</div>
                                <p>{options.adult}</p>
                                <div
                                onClick={()=>{
                                    handleOptions('adult','i')
                                }
                                }
                                className={`py-1 px-4 border border-blue-500 `}>+</div>
                            </div>
                        </div>
                        <div className='flex items-center justify-between p-3'>
                            <p className='text-gray-400 font-medium'>Children</p>
                            <div className='flex items-center text-black gap-4'>

                                <div
                                onClick={()=>{
                                    handleOptions('children','d')
                                }
                                }
                                className={`py-1 px-4 border border-blue-500 ${options.children===0?'bg-gray-100':'bg-white'}`}>-</div>
                                <p>{options.children}</p>
                                <div
                                onClick={()=>{
                                    handleOptions('children','i')
                                }
                                }
                                className={`py-1 px-4 border border-blue-500`}>+</div>
                            </div>
                        </div>
                        <div className='flex items-center justify-between p-3'>
                            <p className='text-gray-400 font-medium'>Room</p>
                            <div className='flex items-center text-black gap-4'>

                                <div
                                onClick={()=>{
                                    handleOptions('room','d')
                                }
                                }
                                className={`py-1 px-4 border border-blue-500 ${options.room===0?'bg-gray-100':'bg-white'}`}>-</div>
                                <p>{options.room}</p>
                                <div
                                onClick={()=>{
                                    handleOptions('room','i')
                                }
                                }
                                className='py-1 px-4 border border-blue-500'>+</div>
                            </div>
                        </div>
                    </div>
                </div>
                <button className='bg-blue-600 text-white py-2 text-sm font-semibold px-3 ' onClick={()=>{
                    handleSelect()
                }}>Search</button>
            </div>
        </>}

    </div>
  )
}

export default Header