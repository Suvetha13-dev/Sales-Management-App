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
      const response = await axios.post(
        'http://localhost:5000/api/sales',
        {
          productName,
          price,
          quantity
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

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
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        marginLeft: '250px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(to right, #141e30, #243b55)',
        padding: '20px'
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '450px',
          background: '#fff',
          padding: '35px',
          borderRadius: '20px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
        }}
      >
        <h2
          style={{
            textAlign: 'center',
            marginBottom: '25px',
            color: '#243b55',
            fontSize: '32px'
          }}
        >
          Add Sale
        </h2>

        <form onSubmit={handleAddSale}>
          <div style={{ marginBottom: '20px' }}>
            <label
              style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '600',
                color: '#333'
              }}
            >
              Product Name
            </label>

            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
              placeholder="Enter product name"
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '10px',
                border: '1px solid #ccc',
                outline: 'none',
                fontSize: '16px',
                transition: '0.3s'
              }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label
              style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '600',
                color: '#333'
              }}
            >
              Price
            </label>

            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              placeholder="Enter price"
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '10px',
                border: '1px solid #ccc',
                outline: 'none',
                fontSize: '16px'
              }}
            />
          </div>

          <div style={{ marginBottom: '25px' }}>
            <label
              style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '600',
                color: '#333'
              }}
            >
              Quantity
            </label>

            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
              placeholder="Enter quantity"
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '10px',
                border: '1px solid #ccc',
                outline: 'none',
                fontSize: '16px'
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '14px',
              border: 'none',
              borderRadius: '12px',
              background: 'linear-gradient(to right, #141e30, #243b55)',
              color: '#fff',
              fontSize: '18px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: '0.3s ease'
            }}
          >
            Add Sale
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddSale;