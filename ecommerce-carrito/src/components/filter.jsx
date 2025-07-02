// import { useState } from "react"
// import { getCategories, getPriceRank } from "../services/categoryFilter"
// import '../styles/filters.css'



// export default function Filter({ products, setCategory, setPrice, setTextFilter }) {

//     const [findText, setFindText] = useState('')

//     const category = getCategories(products)
//     const priceFilter = getPriceRank(products)


//     const handleTextInput = (event) => {
//         const text = event.target.value
//         setFindText(text)
//         setTextFilter(text)
//     }

//     const setSelectedCategory = (event) => {
//         const text = event.target.value
//         setCategory(text)
//     }

//     const setSelectedPrice = (event) => {
//         const text = event.target.value
//         setPrice(text)
//     }



//     return (
//         <div className="filters">
//             <div>
//                 <label htmlFor="lookingfor">Buscar: </label>
//                 <input name="lookingfor" type="text" value={findText} onChange={handleTextInput} />
//             </div>
//             <div>
//                 <label htmlFor="category">Categoria: </label>
//                 <select name="category" id="category" onChange={setSelectedCategory}>
//                     <option value="Todos">Todos</option>
//                     {category.map(value => (
//                         <option key={value} value={value}>{value}</option>
//                     ))}
//                 </select>
//             </div>
//             <div>
//                 <label htmlFor="price">Precio: </label>
//                 <select name="price" id="price" onChange={setSelectedPrice}>
//                     <option value="Todos">Todos</option>
//                     {priceFilter.map(value => (
//                         <option key={value} value={value}>{value}</option>
//                     ))}
//                 </select>
//             </div>
//         </div>
//     )

// }



import { useState } from "react"
import { getCategories, getPriceRank } from "../services/categoryFilter.js"
import '../styles/filters.css'
import useFilter from "../hook/useFilter.js"



export default function Filter() {

    const {filterByCategory, filterByPrice, filterByTitle} = useFilter()

    
    const [findText, setFindText] = useState('')

    const category = getCategories()
    const priceFilter = getPriceRank()

    const handleTextInput = (event) => {
        const text = event.target.value
        setFindText(text)
        filterByTitle(text)
    }

    const setSelectedCategory = (event) => {
        const text = event.target.value
        filterByCategory(text)
    }

    const setSelectedPrice = (event) => {
        const text = event.target.value
        filterByPrice(text)
    }

    return (
        <div className="filters">
            <div>
                <label htmlFor="lookingfor">Buscar: </label>
                <input name="lookingfor" type="text" value={findText} onChange={handleTextInput} />
            </div>
            <div>
                <label htmlFor="category">Categoria: </label>
                <select name="category" id="category" onChange={setSelectedCategory}>
                    <option value="Todos">Todos</option>
                    {category.map(value => (
                        <option key={value} value={value}>{value}</option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="price">Precio: </label>
                <select name="price" id="price" onChange={setSelectedPrice}>
                    <option value="Todos">Todos</option>
                    {priceFilter.map(value => (
                        <option key={value} value={value}>{value}</option>
                    ))}
                </select>
            </div>
        </div>
    )

}
