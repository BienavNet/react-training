import { useContext } from "react"
import { CartContext } from "../context/cartContext.jsx"

export default function useCart() {
    const context = useContext(CartContext)

    if (context===undefined)
        throw new Error("El carrito debe de ser utilizado en un contexto.");
    
    return context
}