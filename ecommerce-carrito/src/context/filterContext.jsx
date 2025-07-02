import { createContext } from "react";
import { filterReducer, filterInitialState, ACTION_TYPES } from "../reducers/useFilterReducer.js";
import { useReducer } from "react";


function useFilterReducer () {

    const [state, dispatch] = useReducer(filterReducer, filterInitialState)

    const filterByCategory = filterText => dispatch({
        type: ACTION_TYPES.CATEGORY,
        payload: filterText
    })

    const filterByPrice = filterText => dispatch({
        type: ACTION_TYPES.PRICE,
        payload: filterText
    })

    const filterByTitle = filterText => dispatch({
        type: ACTION_TYPES.TITLE,
        payload: filterText
    })

    return {state, filterByCategory, filterByPrice, filterByTitle}

}

export const FilterContext = createContext()

export function FilterProvider ({children}) {

    const {state, filterByCategory, filterByPrice, filterByTitle} = useFilterReducer()

    return (
        <FilterContext.Provider
            value={{
                products: state.products,
                filterByCategory,
                filterByPrice,
                filterByTitle
            }}
        >
            {children}
        </FilterContext.Provider>
    )
}