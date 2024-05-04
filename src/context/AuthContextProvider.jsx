import { useEffect, useReducer } from "react"
import { AuthContext, INIT_STATE } from "./AuthContext"

const authReducer = (state,action)=>{
    const {type,payLoad} = action
    switch (type){
        case 'LOGIN_START':
            return {
                user:null,
                loading:true,
                error:null
            }
        case 'LOGIN_SUCCESS':
            return{
                user:payLoad,
                loading:false,
                error:null
            }
        case 'LOGIN_FAILURE':
            return {
                user:false,
                loading:false,
                error:payLoad
            }
        case 'LOGOUT':
            return{
                user:null,
                loading:false,
                error:null
            }
        default:
            return state
    }
}

export const AuthContextProvider = ({children})=>{
    const [state,dispatch] = useReducer(authReducer,INIT_STATE)
    useEffect(()=>{
        localStorage.setItem('user',JSON.stringify(state.user))
    },[state.user])
    return (
        <AuthContext.Provider value={{
            user:state.user,
            loading:state.loading,
            error:state.error,
            dispatch
        }
        }>
            {children}
        </AuthContext.Provider>
    )
}