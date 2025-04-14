import React, { useContext } from "react";
import '../styles/Products.css'
import { useParams } from "react-router-dom";
import { ProductContext } from "../context/ProductProvider";
import { CartContext } from "../context/CartContext.js";

function ProductDetail() {
  const { products } = useContext(ProductContext);
  const { id } = useParams();
  const { cartProducts, setCartProducts, cartTotal, setCartTotal } = useContext(CartContext);

  function addItem(product) {
    setCartProducts(prev => {
      const existingProduct = prev.find(item => item.id === product.id);

      if (existingProduct) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, count: item.count + 1 }
            : item
        );
      } else {
        return [
          ...prev,
          {
            id: product.id,
            title: product.Title,
            image: product.Image,
            category: product.Cate,
            price: product.Price,
            author: product.Author,
            count: 1
          }
        ];
      }
    });

    setCartTotal(prev => prev + product.Price);    
  }

  if (!products || products.length === 0) {
    return <h2 id="NotFound">No Products Available</h2>;
  }

  let product = products.find(e => e.id === id);

  if (!product) {
    return <h2 id="NotFound">Product Not Found</h2>;
  }

  return (
    <div className="product-detail">
      <img src={product.Image} alt={product.Title} />
      <div className="extra-details">
        <h2>{product.Title}</h2>
        <p id="product-author">by {product.Author}</p>
        <hr />
        <div id="about-item">
          <h2>About This Item</h2>
          <p>{product.Desc}</p>
        </div>
      </div>
      <div className="price-cont">
        <p id="price-title">Price</p>
        <hr/>
        <p>USD {product.Price}</p>
        <button onClick={() => addItem(product)}>Add To Cart</button>
      </div>
    </div>
  );
}

export default ProductDetail;
