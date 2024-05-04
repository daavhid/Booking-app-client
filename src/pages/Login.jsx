import React, { useContext, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import axios from 'axios'

const Login = () => {
    const navigate = useNavigate()
    const [credentials,setCredentials] = useState({
        username:undefined,
        password:undefined
    })

    const {user,loading,error,dispatch} = useContext(AuthContext)
    console.log(error)


    const handleChange = (e)=>{
        setCredentials(prev=>{return({
            ...prev,
            [e.target.id]:e.target.value
        })})
    }

    const handleClick =async (e) =>{
        e.preventDefault()
        dispatch({type:'LOGIN_START'})
        try{
            const res = await axios.post('http://localhost:5000/api/auth/login',credentials)
            dispatch({type:'LOGIN_SUCCESS',payLoad:res.data})

            navigate('/')
        }catch(err){
            dispatch({type:'LOGIN_FAILURE',payLoad:err.response.data.message})
        }

    }



  return (
    <div className='flex justify-center items-center h-[100vh]'>
        <form className=' flex flex-col'>
            <label htmlFor="username" className='text-xl' > Username</label>
            <input type="text"  id="username" onChange={handleChange} className='border outline-none p-2' autoComplete='off' autoCorrect='off' spellCheck='false'/>
            <label htmlFor="password" className='text-xl'>Password</label>
            <input type="password" id="password" onChange={handleChange}  className='border outline-none p-2'/>
            <button className='bg-blue-600 mt-6 text-white font-semibold rounded-md p-3 border' onClick={handleClick}>Submit</button>
            {error && <div className='text-red-500 text-xl self-center'> {error}</div>}
            {/* {user && <div className='text-green-500  text-xl self-center'>Login Successful</div>} */}
        </form>
    </div>
  )
}

export default Login