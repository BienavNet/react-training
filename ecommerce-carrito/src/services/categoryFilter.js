import { products} from '../assets/products.json'


function getCategories() {
    const categories = products.map(product => product.category)
    return categories.filter((category, index, arr) => arr.indexOf(category) === index)
}

function getPriceRank() {
    const prices = products.map(product => product.price)
    return prices.filter((price, index, arr) => arr.indexOf(price) === index)
}

export { getCategories, getPriceRank }