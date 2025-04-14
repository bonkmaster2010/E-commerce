import React, { createContext, useState, useContext } from "react";

export const CartContext = createContext();

function CartProvider(props){
    let [total, setTotal] = useState(0);
    let [cartTotal, setCartTotal] = useState(0)
    let [cartProducts, setCartProducts] = useState([]);
   
    return (
       <CartContext.Provider value={{cartProducts, setCartProducts, cartTotal, setCartTotal, total, setTotal}}>
        {props.children}
       </CartContext.Provider>
    )
}

export default CartProvider;