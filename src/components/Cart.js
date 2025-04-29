import React from "react";
import '../styles/Cart.css'
import { NavLink, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

function Cart() {
    const { cartProducts, setCartProducts, total, setTotal } = React.useContext(CartContext);
    const navigate = useNavigate();

    function remove(productId) {
        setCartProducts(prev => {
            const productIndex = prev.findIndex(item => item.id === productId);
            if (productIndex === -1) return prev; 
            
            const updatedCart = [...prev];
            const product = updatedCart[productIndex];
            
            if (product.count > 1) {
                updatedCart[productIndex] = { ...product, count: product.count - 1 };
                setTotal(prevTotal => prevTotal - product.price);
            } else {
                updatedCart.splice(productIndex, 1);
                setTotal(prevTotal => prevTotal - (product.price * product.count)); 
            }
    
            return updatedCart;
        });
    }
    

    return (
        <>
{cartProducts.length > 0 ? (
    cartProducts.map((product) => (
        <div key={product.id} className="cart-product-cont">
        <NavLink to={`/product/${product.id}`}>
            <img src={product.image} alt={`${product.title} Product Image`} />
        </NavLink>
            <div className="cart-title-cont">
                <h1>{product.title}</h1>
                <p>by {product.author}</p>
                <p>{product.category}</p>
            </div>

            <div className="remove-cont">
            <p style={{fontSize:'17px'}} id="quantity">Price: USD {product.price}</p>
                <p id="quantity">Quantity: {product.count}X</p>
                <button onClick={() => remove(product.id)}>Remove</button>
            </div>
        </div>
    ))
) : (
    <h1 id="NoItems">No items in cart</h1>
)}

            {cartProducts.length > 0 && (
                <div id="Checkout">
                    <h1>Total</h1>
                    <hr id="checkout-hr"/>
                    <h2>USD {total}</h2>
                    <button onClick={() => navigate('/Checkout')}>Checkout</button>
                </div>
            )}
        </>
    );
}

export default Cart;
