import useCart from '../hook/useCart.js'
import '../styles/products.css'

function Product({ product }) {

    const { addToCart } = useCart()

    return (
        <div className='product' id={product.id}>
            <img src={product.thumbnail} alt="" />
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <div>
                <span>Price: ${product.price}</span>
                <button onClick={() => addToCart(product)}>Add to cart</button>
            </div>
        </div>

    )
}

export default function Products({ products }) {

    if (!products) return

    return (
        <div className="products-list">
            {products.map(product => (
                <Product
                    key={product.id}
                    product={product}
                >
                </Product>
            ))}
        </div>
    )


}