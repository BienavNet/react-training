import { useContext } from "react";
import { FilterContext } from "../context/FilterContext";


export const useFilter = () => {

    const context = useContext(FilterContext)

    if (context === undefined)
        throw new Error("El contexto es indefinido, debes de llamarlo dentro de un provider")

    return context

}