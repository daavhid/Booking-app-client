import React, { useReducer } from 'react'
import { SearchContext,INITIAL_STATE } from './searchContext'

const searchReducer = (state,action)=>{
    const {type,payLoad} = action
    switch (type){
        case "NEW_SEARCH":
            return payLoad
        case "RESET_SEARCH":
            return INITIAL_STATE
        default:
            return state
    }
}

export const SearchContextProvider = ({children}) => {
    const [state,dispatch] = useReducer(searchReducer,INITIAL_STATE)
  return (
    <SearchContext.Provider value={{city:state.city,dates:state.dates,options:state.options,diffDay:state.diffDay,dispatch}}>
        {children}
    </SearchContext.Provider>
  )
}

export default SearchContextProvider