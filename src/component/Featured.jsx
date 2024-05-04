import React from 'react'
import useFetch from '../hooks/useFetch'

const Featured = () => {
    const {data,loading,error} = useFetch('http://localhost:5000/api/hotels/countByCities?cities=madrid,london,berlin')
    const dat = data?.list
  return (
    <div className='pt-16 pb-8 flex max-w-[80%] mx-auto gap-12 -z-50 '>
        {dat ?
        <>
            <div className='relative'>
                <div className=' relative  after:absolute after:w-full after:h-full after:bg-black after:rounded-[20px] after:top-0 after:opacity-30'>
                    <img src="https://cf.bstatic.com/xdata/images/city/max500/957801.webp?k=a969e39bcd40cdcc21786ba92826063e3cb09bf307bcfeac2aa392b838e9b7a5&o=" alt="" className='rounded-[20px] object-cover ' />
                </div>
                <div className='absolute bottom-5 left-5 text-white '>
                    <h1 className='text-3xl font-bold'>Madrid</h1>
                    <p className='text-2xl font-bold '>{dat[0]} properties</p>
                </div>
            </div>
            <div className='relative'>
                <div className=' relative   after:absolute after:w-full after:h-full after:bg-black after:rounded-[20px] after:top-0 after:opacity-30'>
                    <img src="https://cf.bstatic.com/xdata/images/city/max500/690334.webp?k=b99df435f06a15a1568ddd5f55d239507c0156985577681ab91274f917af6dbb&o=" alt="" className='object-cover rounded-[20px]'/>
                </div>
                <div className='absolute bottom-5 left-5 text-white '>
                    <h1 className='text-3xl font-bold'>London</h1>
                    <p className='text-2xl font-bold tracking-wide'>{dat[1]} properties</p>
                </div>
            </div>
            <div className='relative'>
                <div className=' relative  after:absolute after:w-full after:h-full after:bg-black after:rounded-[20px] after:top-0 after:opacity-30'>
                    <img src="https://cf.bstatic.com/xdata/images/city/max500/957801.webp?k=a969e39bcd40cdcc21786ba92826063e3cb09bf307bcfeac2aa392b838e9b7a5&o=" alt="" className='object-cover rounded-[20px]'/>
                </div>
                <div className='absolute bottom-5 left-5 text-white '>
                    <h1 className='text-3xl font-bold'>Berlin</h1>
                    <p className='text-2xl font-bold '>{dat[2]} properties</p>
                </div>
            </div>
        </> : 'loading....'
        }
    </div>
  )
}

export default Featured