export const cartInitialState = JSON.parse(window.localStorage.getItem('cart')) || []

export const ACTION_TYPES = {
    ADD_TO_CART: 'ADD_TO_CART',
    REMOVE_TO_CART: 'REMOVE_TO_CART',
    CLEAR_CART: 'CLEAR_CART'
}

const updateCartInLocalStorage = newState => {
    window.localStorage.setItem('cart', JSON.stringify(newState))
}


const CART_OPTIONS = {
    [ACTION_TYPES.ADD_TO_CART]: (state, action) => {
        /*
        el formato de mi objeto que guarda el carrito es el siguiente
        [
            {
                id_producto,
                cantidad
            },
            {
                id_producto,
                cantidad
            }
        ]
        
        */

        const { id } = action.payload 
        const productInCartIndex = state.findIndex(item => item.id == id )

        if (productInCartIndex >= 0){

            const newState = [
                ...state.slice(0, productInCartIndex),
                {...state[productInCartIndex], quantity: state[productInCartIndex].quantity + 1},
                ...state.slice(productInCartIndex + 1)
            ]

            updateCartInLocalStorage(newState)

            return newState

        }

        const newState = [
            ...state,
            {
                ...action.payload,
                quantity: 1
            }
        ]

        updateCartInLocalStorage(newState)

        return newState


    },
    [ACTION_TYPES.REMOVE_TO_CART]: (state, action) => {

        const { id } = action.payload
        const productInCartIndex = state.findIndex(item => item.id == id)

        if (productInCartIndex < 0)
            return state

        if (state[productInCartIndex].quantity == 1){
            const newState = state.filter(item => item.id !=id)
            updateCartInLocalStorage(newState)
            return newState
        }

        const newState = [
            ...state.slice(0, productInCartIndex), 
            {...state[productInCartIndex], quantity: state[productInCartIndex].quantity -1},
            ...state.slice(productInCartIndex + 1)
        ]

        updateCartInLocalStorage(newState)
        return newState
         
    },
    [ACTION_TYPES.CLEAR_CART]: (state, action) => {
        window.localStorage.removeItem('cart')
    }
}

export const cartReducer = (state, action) => {
    const { type: actionType } = action
    const updateState = CART_OPTIONS[actionType]
    return updateState ? updateState(state, action) : state
}
