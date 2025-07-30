import { useContext } from "react"
import { FilterContext } from "../context/filterContext"


export const useFilter = () => {
    const context = useContext(FilterContext)

    if (context === undefined)
        throw new Error("El contexto no pudo ser inicializado.");
    
    return context
}