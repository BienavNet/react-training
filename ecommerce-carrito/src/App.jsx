// import { products as initialProducts } from './assets/products.json'
// import Products from './components/products.jsx'
// import Filter from './components/filter.jsx'
// import useFilter from './hook/useFilter.js'

// function App() {

//   const {products, setCategory, setPrice, setTextFiler} = useFilter({initialProducts})

//   return (
//     <>
//       <Filter
//         products={initialProducts}
//         setCategory={setCategory}
//         setPrice={setPrice}
//         setTextFilter={setTextFiler}
//       >

//       </Filter>
//       <Products
//         products={products}
//       >
//       </Products>
//     </>
//   )
// }

// export default App

import Products from './components/products.jsx'
import Filter from './components/filter.jsx'
import useFilter from './hook/useFilter.js'
import { CartProvider } from './context/cartContext.jsx'
import Cart from './components/cart.jsx'

function App() {

  const { products: products } = useFilter()

  return (
    <>
      <CartProvider>
        <Filter />
        <Products
          products={products}
        >
        </Products>
        <Cart/>
      </CartProvider>
    </>
  )
}

export default App
