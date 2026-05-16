import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditSale = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sale, setSale] = useState({
    productName: '',
    price: '',
    quantity: ''
  });

  // ✅ Fetch Sale Details From Database
  useEffect(() => {
    axios.get(`http://localhost:5000/api/sales/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => {
      setSale(response.data);
    })
    .catch(error => {
      console.error('Failed to fetch sale details:', error);
    });
  }, [id]);

  // ✅ Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSale({ ...sale, [name]: value });
  };

  // ✅ Handle Form Submit (Edit Sale)
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5000/api/sales/${id}`, sale, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(() => {
      alert('Sale updated successfully');
      navigate('/sales-management', { replace: true }); // ✅ Automatically refresh and go back
    })
    .catch(error => {
      console.error('Failed to update sale:', error);
    });
  };

  return (
    <div>
      <h2>Edit Sale</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Product Name:</label>
          <input
            type="text"
            name="productName"
            value={sale.productName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={sale.price}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Quantity:</label>
          <input
            type="number"
            name="quantity"
            value={sale.quantity}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Update Sale</button>
        <button type="button" onClick={() => navigate('/sales-management', { replace: true })}>
          Back to Sales Management
        </button>
      </form>
    </div>
  );
};

export default EditSale;