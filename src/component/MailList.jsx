import React from 'react'

const MailList = () => {
  return (
    <div className='max-w-[80%] mx-auto text-center text-white py-10 leading-loose'>
        <div >
            <h1 className='text-4xl font-semibold'>Save time, save money</h1>
            <p className='my-8'>Sign up and we'll send the best the best deal to you </p>
            <div className='my-8'>
                <input type="text" placeholder='Your Email'  className='px-2 py-2 w-2/5'/>
                <button className='bg-blue-500 px-4  py-2 ml-4 rounded-md'>Subscribe</button>
            </div>
        </div>
    </div>
  )
}

export default MailList