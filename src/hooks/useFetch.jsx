import axios from "axios"
import { useEffect, useState } from "react"

const useFetch = (url)=>{
    const [data,setData] = useState([])
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState(false)

    useEffect(()=>{

        const fetch = async ()=>{
            try{
                setLoading(prev=>true)
                const res = await axios.get(url)
                setData(prev=>res.data)
                setLoading(false)
            }catch(err){
                setError(err)
            }
        }
        fetch()
    },[])

    const reFetch = async ()=>{
        try{
            setLoading(prev=>true)
            const res = await axios.get(url)
            setData(prev=>res.data)
            setLoading(false)
        }catch(err){
            setError(err)
        }
    }
    return {data,loading,error,reFetch}
}

export default useFetch