import { useContext } from "react";
import { FilterContext } from "../context/filterContext";

export default function useFilter() {
    const context = useContext(FilterContext)

    if (context === undefined)
        throw new Error("El filterContext debe de usarse dentro de un contexto");

    return context
        
}