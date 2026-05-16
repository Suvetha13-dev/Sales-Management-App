import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';

function SalesList({ refresh }) {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/sales')
      .then(response => setSales(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, [refresh]);

  const handleView = (sale) => {
    alert(`Product: ${sale.productName}\nQuantity: ${sale.quantity}\nPrice: $${sale.price}`);
  };

  const handleEdit = (sale) => {
    const newQuantity = prompt('Enter new quantity:', sale.quantity);
    const newPrice = prompt('Enter new price:', sale.price);

    if (newQuantity !== null && newPrice !== null) {
      axios.put(`http://localhost:5000/api/sales/${sale._id}`, {
        productName: sale.productName,
        quantity: newQuantity,
        price: newPrice
      }).then(() => {
        alert('Sale updated successfully');
        window.location.reload();
      }).catch(err => console.error(err));
    }
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/sales/${id}`)
      .then(() => {
        alert('Sale deleted successfully');
        window.location.reload();
      })
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h2>Sales List</h2>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((sale) => (
            <tr key={sale._id}>
              <td>{sale.productName}</td>
              <td>{sale.quantity}</td>
              <td>${sale.price}</td>
              <td>
                <FaEye onClick={() => handleView(sale)} style={{ color: 'green', cursor: 'pointer', marginRight: '10px' }} />
                <FaEdit onClick={() => handleEdit(sale)} style={{ color: 'blue', cursor: 'pointer', marginRight: '10px' }} />
                <FaTrash onClick={() => handleDelete(sale._id)} style={{ color: 'red', cursor: 'pointer' }} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SalesList;