import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import SalesManagement from './pages/SalesManagement';
import AddSale from './components/AddSale';
import ViewSale from './components/ViewSale';
import EditSale from './components/EditSale';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/sales-management" element={<SalesManagement />} />
        <Route path="/add-sale" element={<AddSale />} />
        <Route path="/view-sale/:id" element={<ViewSale />} />
        <Route path="/edit-sale/:id" element={<EditSale />} />
        <Route path="*" element={<h2>404 - Page Not Found</h2>} />
      </Routes>
    </Router>
  );
}

export default App;