import { useReducer } from "react";
import { createContext } from "react";
import { cartReducer, cartInitialState, ACTION_TYPES } from "../reducers/useCartReducer.js";

function useCartReducer() {
    const [state, dispatch] = useReducer(cartReducer, cartInitialState)

    const addToCart = product => {
        dispatch({
            type: ACTION_TYPES.ADD_TO_CART,
            payload: product
        })
    }

    const removeFromCart = product => {
        dispatch({
            type: ACTION_TYPES.REMOVE_TO_CART,
            payload: product
        })
    }

    const clearCart = product => {
        dispatch({
            type: ACTION_TYPES.CLEAR_CART,
            payload: product
        })
    }

    return { state, addToCart, removeFromCart, clearCart }

}

export const CartContext = createContext()
export function CartProvider({ children }) {

    const { state, addToCart, removeFromCart, clearCart } = useCartReducer()

    return (
        <CartContext.Provider
            value={{
                items: state,
                addToCart,
                removeFromCart,
                clearCart
            }}
        >
            {children}
        </CartContext.Provider>
    )

}