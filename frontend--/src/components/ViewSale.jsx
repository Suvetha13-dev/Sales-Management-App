import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ViewSale = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sale, setSale] = useState(null);

  // ✅ Fetch Sale Details from Database
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

  if (!sale) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <h2>View Sale Details</h2>
      <p><strong>Product Name:</strong> {sale.productName}</p>
      <p><strong>Price:</strong> ${sale.price}</p>
      <p><strong>Quantity:</strong> {sale.quantity}</p>
      <p><strong>Total:</strong> ${sale.price * sale.quantity}</p>

      <button onClick={() => navigate('/sales-management', { replace: true })}>
        Back to Sales Management
      </button>
    </div>
  );
};

export default ViewSale;