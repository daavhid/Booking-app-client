import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const Navbar = () => {
    const {user,dispatch} = useContext(AuthContext)

    const User = ()=>{
        return (
            <div className='flex gap-6 items-center'>
                <span>{user.username}</span>
                <button className='bg-white text-gray-500 font-semibold py-1 px-3 ' onClick={handleLogout}>logout</button>
            </div>
        )
    }

    const handleLogout = ()=>{
        dispatch({type:'LOGOUT'})
    }
  return (
    <div className=' text-gray-200 max-w-[80%] mx-auto  py-4 '>
        <ul className='flex justify-between items-center'>
            <Link to={'/'} className=' text-xl font-semibold logo'>XamiBooking <span className='font-extrabold text-3xl'>.</span></Link>
            <div className=' '>
                {user?<User/>:
                    <div className='flex gap-6'>

                        <button className='bg-white text-gray-500 font-semibold py-1 px-3 '>Register</button>
                        <button className='bg-white text-gray-500 font-semibold py-1 px-3 '>Login</button>
                    </div>}

            </div>
        </ul>
    </div>
  )
}

export default Navbar