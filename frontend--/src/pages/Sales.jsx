import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Sales() {
  const [sales, setSales] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    const response = await axios.get('http://localhost:5000/sales');
    setSales(response.data);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/sales/${id}`);
    alert('Sale Deleted');
    fetchSales();
  };

  return (
    <div className="container mt-5">
      <h2>Sales Management</h2>
      <button className="btn btn-primary mb-3" onClick={() => navigate('/add-sale')}>Add Sale</button>
      <table className="table">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {sales.map(sale => (
            <tr key={sale._id}>
              <td>{sale.productName}</td>
              <td>{sale.price}</td>
              <td>{sale.quantity}</td>
              <td>
                <button className="btn btn-info me-2" onClick={() => navigate(`/view-sale/${sale._id}`)}>View</button>
                <button className="btn btn-warning me-2" onClick={() => navigate(`/edit-sale/${sale._id}`)}>Edit</button>
                <button className="btn btn-danger" onClick={() => handleDelete(sale._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Sales;