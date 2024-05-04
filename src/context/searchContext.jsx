import { createContext } from "react"

const localItem = JSON.parse(localStorage.getItem('item'))
export const INITIAL_STATE = {
    diffDay:localItem?.diffDay || 0,
    dates:localItem?.dates || [],
    city:localItem?.city || undefined,
    options:localItem?.options||{
        adult:undefined,
        children:undefined,
        room:undefined
    }
}

export const SearchContext = createContext(INITIAL_STATE)
