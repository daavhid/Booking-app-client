import { createContext } from "react"

export const INIT_STATE = {
    user:JSON.parse(localStorage.getItem('user')) || null,
    loading:false,
    error:null
}

export const AuthContext = createContext(INIT_STATE)