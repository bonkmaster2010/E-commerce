import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { ProductContext } from "./context/ProductProvider.js";
import { CartContext } from "./context/CartContext.js";
import './styles/App.css';

function Home() {
  const { products, setProducts, filter, setFilter } = useContext(ProductContext);
  const { cartProducts, setCartProducts, setCartTotal, setTotal } = useContext(CartContext);
  const [opt, setOpt] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [addedItemId, setAddedItemId] = useState(null);

  function addItem(product) {
    setAddedItemId(product.id);
    setTimeout(() => setAddedItemId(null), 1000);
    
    setCartProducts(prev => {
      const existingProduct = prev.find(item => item.id === product.id);

      if (existingProduct) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, count: item.count + 1 }
            : item
        );
      } else {
        return [...prev, {
          id: product.id,
          title: product.Title,
          image: product.Image,
          category: product.Cate,
          price: product.Price,
          author: product.Author,
          count: 1
        }];
      }
    });
    setCartTotal(prev => prev + 1);
    setTotal(prev => Number(prev) + Number(product.Price));
  }

  function removeProduct(productId) {
    setProducts(prev => {
      const updatedProducts = prev.filter(product => product.id !== productId);
      const newFilter = [...new Set(updatedProducts.map(p => p.Cate))];
      setFilter(newFilter);
      return updatedProducts;
    });

    setCartProducts(prev => {
      const productToRemove = prev.find(product => product.id === productId);
      if (productToRemove) {
        setTotal(prev => Number(prev) - (Number(productToRemove.price) * productToRemove.count));
      }
      return prev.filter(product => product.id !== productId);
    });
  }

  function handleSearch(e) {
    setSearchTerm(e.target.value.toLowerCase());
  }

  const filteredProducts = products.filter(product => {
    const matchesCategory = opt === 'All' || product.Cate === opt;
    const matchesSearch = product.Title.toLowerCase().includes(searchTerm) || 
                         product.Author.toLowerCase().includes(searchTerm);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="home">
      {products.length > 0 && (
        <div className="filter-container">
          <div className="search-filter-wrapper">
            <select 
              id="filter" 
              onChange={(e) => setOpt(e.target.value)}
              value={opt}
              className="category-filter"
            >
              <option value="All">All Categories</option>
              {filter.map(op => (
                <option key={op} value={op}>{op}</option>
              ))}
            </select>
            <div className="search-box">
              <input
                type="text"
                placeholder="Search by title or author..."
                onChange={handleSearch}
                value={searchTerm}
                className="search-input"
              />
            </div>
          </div>
        </div>
      )}

      <h1 className="home-title">
        {filteredProducts.length > 0 
          ? opt === 'All' 
            ? 'All Products' 
            : `${opt} Products`
          : 'No Products Found'}
        <span className="title-underline"></span>
      </h1>

      <div className="product-cont">
        {products.length === 0 ? (
          <div className="empty-state">
            <p>No products available yet.</p>
            <button className="refresh-btn" onClick={() => window.location.reload()}>
              Refresh Page
            </button>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="empty-state">
            <div className="search-empty-icon">🔍</div>
            <p>No products match your search.</p>
            <button 
              className="clear-search-btn" 
              onClick={() => {
                setSearchTerm('');
                setOpt('All');
              }}
            >
              Clear Filters
            </button>
          </div>
        ) : (
          filteredProducts.map((product) => (
            <div 
              key={product.id} 
              className={`product ${addedItemId === product.id ? 'added-to-cart' : ''}`}
            >
              <div className="product-badge">
                {product.Cate}
              </div>
              
              <NavLink to={`/product/${product.id}`} className="product-image-link">
                <div className="product-image-container">
                  <img
                    src={product.Image}
                    alt={product.Title}
                    className="product-image"
                  />
                </div>
              </NavLink>
              
              <div className="product-info">
                <h2 className="product-title">{product.Title}</h2>
                <p className="product-author">By {product.Author}</p>
                
                <div className="product-price">
                  ${parseFloat(product.Price).toFixed(2)}
                </div>
                
                <div className="product-actions">
                  <button
                    onClick={() => addItem(product)}
                    id="addToCart"
                  >
                    {addedItemId === product.id ? (
                      <span className="added-text">✓ Added</span>
                    ) : (
                      <span>Add to Cart</span>
                    )}
                  </button>
                  
                  <button
                    onClick={() => removeProduct(product.id)}
                    id="addToCart"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Home;