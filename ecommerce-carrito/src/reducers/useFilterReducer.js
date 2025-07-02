import { products as initialProducts } from '../assets/products.json'

export const filterInitialState = {
    category: 'Todos',
    price: 'Todos',
    title: '',
    products: initialProducts

}

export const ACTION_TYPES = {
    CATEGORY: 'CATEGORY',
    PRICE: 'PRICE',
    TITLE: 'TITLE'
}


const FILTER_OPTIONS = {
    [ACTION_TYPES.CATEGORY]: (state, action) => {
        if(action.payload === 'Todos' && state.price === 'Todos' && state.title === '')
            return {
                ...state, 
                category: 'Todos', 
                products: initialProducts 
            }
        
        const filteredProducts = initialProducts.filter(product => action.payload === 'Todos' ? product : product.category == action.payload).filter(product => state.price !== 'Todos' ? product.price == state.price : product )

        return {
            ...state, 
            category: action.payload,
            products: state.title === '' ? filteredProducts : filteredProducts.filter(product => product.title.toLowerCase().includes(state.title.toLowerCase()))
        }
    },
    [ACTION_TYPES.PRICE]: (state, action) => {

        if(action.payload === 'Todos' && state.category === 'Todos' && state.title === '')
            return {
                ...state, 
                price: 'Todos', 
                products: initialProducts 
            }
        
        const filteredProducts = initialProducts.filter(product => action.payload === 'Todos' ? product :  product.price == action.payload).filter(product => state.category !== 'Todos' ? product.category == state.category : product )

        return {
            ...state, 
            price: action.payload,
            products: state.title === '' ? filteredProducts : filteredProducts.filter(product => product.title.toLowerCase().includes(state.title.toLowerCase()))
        }
    },
    [ACTION_TYPES.TITLE]: (state, action) => {

        if(action.payload === '' && state.category === 'Todos' && state.price === 'Todos')
            return {
                ...state, 
                title: '', 
                products: initialProducts 
            }
        
        const filteredProducts = initialProducts.filter(product => state.price === 'Todos' ? product :  product.price == state.price).filter(product => state.category !== 'Todos' ? product.category == state.category : product )

        return {
            ...state, 
            title: action.payload,
            products: filteredProducts.filter(product => product.title.toLowerCase().includes(state.title.toLowerCase()))
        }
    }
}

export const filterReducer = (state, action) => {
    const { type: actionType } = action
    const updateState = FILTER_OPTIONS[actionType]
    return updateState ? updateState(state, action) : state
}