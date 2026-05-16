import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddSale = () => {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleAddSale = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/sales', {
        productName,
        price,
        quantity
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status === 201) {
        alert('Sale added successfully');
        navigate('/sales-management');
      }
    } catch (error) {
      console.error('Failed to add sale:', error);
      alert('Failed to add sale');
    }
  };

  return (
    <div>
      <h2>Add Sale</h2>
      <form onSubmit={handleAddSale}>
        <div>
          <label>Product Name:</label>
          <input 
            type="text" 
            value={productName} 
            onChange={(e) => setProductName(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Price:</label>
          <input 
            type="number" 
            value={price} 
            onChange={(e) => setPrice(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Quantity:</label>
          <input 
            type="number" 
            value={quantity} 
            onChange={(e) => setQuantity(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">Add Sale</button>
      </form>
    </div>
  );
};

export default AddSale;