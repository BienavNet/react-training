import { useId } from "react"
import useCart from "../hook/useCart.js"
import { CartIcon, ClearCartIcon } from "../icons/icons.jsx"
import '../styles/cart.css'

function CartProduct({ item, addToCart, removeFromCart }) {

    return (
        <div className='product' id={item.id}>

            <div style={{
                display: "flex",
                flexDirection: "column",
                width: "80%",
            }}>
                <img src={item.thumbnail} alt={item.title}
                    style={{
                        
                    }}
                />
                <span>{item.title}</span>
            </div>

            <div>
                <small>Price: ${item.price}</small>
            </div>
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}>
                <button onClick={() => removeFromCart(item)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => addToCart(item)}>+</button>

            </div>
        </div>
    )
}

export default function Cart() {

    const { items, clearCart, addToCart, removeFromCart } = useCart()
    const checkboxId = useId()

    return (
        <>
            <label className="cart-button" htmlFor={checkboxId}>
                <CartIcon />
            </label>
            <input type="checkbox" id={checkboxId} hidden />
            <aside className="cart">
                {items?.map(item => (
                    <CartProduct
                        item={item}
                        addToCart={addToCart}
                        removeFromCart={removeFromCart}
                        key={item.id}
                    />
                ))}

                {items?.length > 0 && <button onClick={() => clearCart()}><ClearCartIcon/></button>}
            </aside>
        </>
    )
}