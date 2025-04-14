import React, { useState, useRef, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { ProductContext } from "../context/ProductProvider.js"; 
import { v4 as uuidv4 } from 'uuid'; 
import '../styles/Create.css'

function Create() {
  const { products, setProducts, filter, setFilter } = useContext(ProductContext); 
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [cate, setCate] = useState('');
  const [price, setPrice] = useState();
  const [imagePreview, setImagePreview] = useState(null);
  const [author, setAuthor] = useState('')
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImagePreview(reader.result);
      };
    }
  }

  function createProduct() {
    if (!title || !desc || !cate || !imagePreview || !price) {
      alert("Please fill all fields and upload an image.");
      return;
    }
    console.log(filter)
    if (title.length > 25) { alert("Please enter a shorter Name (Max 25 characters)") }
    if(price < 0){alert('Please enter a valid price')}
    if(author.length > 20 || author.length < 4){
      alert('Please enter a Shorter/Longer Author Name ( Min: 4 characters, Max: 20 charactrs)')
    }else if (title.length < 25) {
      setProducts([...products, { Title: title, Desc: desc, Cate: cate, Image: imagePreview, Price: price, Author: author, id: uuidv4() }]);
      setFilter(prev => [...prev, cate])
      setTitle('');
      setDesc('');
      setCate('');
      setImagePreview(null);
      setPrice();
      setAuthor('');
      navigate("/");
    }
  }

  return (
    <div className="create-cont">
      <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea placeholder="Desc" value={desc} onChange={(e) => setDesc(e.target.value)} />
      <input placeholder="Category" value={cate} onChange={(e) => setCate(e.target.value)} />
      <input placeholder="Author" type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
      <input placeholder="Price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
      <input type="file" accept="image/*" ref={fileInputRef} style={{ display: "none" }} onChange={handleImageChange} />
      <button onClick={() => fileInputRef.current.click()}>Upload Image</button>

      {imagePreview && <img src={imagePreview} alt="Preview" style={{ width: "350px", marginTop: "10px" }} />}

      <button onClick={createProduct} id="create">Publish Product</button>
    </div>
  );
}

export default Create;