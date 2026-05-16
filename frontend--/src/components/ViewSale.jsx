import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ViewSale = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sale, setSale] = useState(null);

  // Fetch Sale Details
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/sales/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then((response) => {
        setSale(response.data);
      })
      .catch((error) => {
        console.error('Failed to fetch sale details:', error);
      });
  }, [id]);

  if (!sale) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'linear-gradient(to right, #141e30, #243b55)',
          color: '#fff',
          fontSize: '24px',
          fontWeight: 'bold'
        }}
      >
        Loading...
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
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
          maxWidth: '500px',
          background: '#fff',
          borderRadius: '20px',
          padding: '35px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
        }}
      >
        <h2
          style={{
            textAlign: 'center',
            marginBottom: '30px',
            color: '#243b55',
            fontSize: '32px'
          }}
        >
          Sale Details
        </h2>

        <div style={{ marginBottom: '20px' }}>
          <p
            style={{
              fontSize: '18px',
              marginBottom: '12px',
              color: '#333'
            }}
          >
            <strong>Product Name:</strong> {sale.productName}
          </p>

          <p
            style={{
              fontSize: '18px',
              marginBottom: '12px',
              color: '#333'
            }}
          >
            <strong>Price:</strong> ${sale.price}
          </p>

          <p
            style={{
              fontSize: '18px',
              marginBottom: '12px',
              color: '#333'
            }}
          >
            <strong>Quantity:</strong> {sale.quantity}
          </p>

          <p
            style={{
              fontSize: '20px',
              fontWeight: 'bold',
              color: '#243b55',
              marginTop: '20px'
            }}
          >
            Total: ${sale.price * sale.quantity}
          </p>
        </div>

        <button
          onClick={() =>
            navigate('/sales-management', { replace: true })
          }
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
          Back to Sales Management
        </button>
      </div>
    </div>
  );
};

export default ViewSale;