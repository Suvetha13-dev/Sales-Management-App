
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

import * as XLSX from 'xlsx';

import { saveAs } from 'file-saver';import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import {
  FaEye,
  FaEdit,
  FaTrash,
  FaBell,
  FaMoon,
  FaSun,
  FaFilePdf,
  FaFileExcel,
  FaChartPie,
  FaSignOutAlt,
  FaUserCircle,
} from 'react-icons/fa';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
} from 'recharts';

const SalesManagement = () => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [darkMode, setDarkMode] = useState(true);

  const itemsPerPage = 5;

  const navigate = useNavigate();

  // ================= FETCH =================

  const fetchSales = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem('token');

      const res = await axios.get(
        'http://localhost:5000/api/sales',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSales(res.data || []);
    } catch (err) {
      toast.error('Failed to load sales');

      if (err.response?.status === 401) {
        navigate('/');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSales();
  }, []);

  // ================= DELETE =================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      'Are you sure want to delete?'
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem('token');

      await axios.delete(
        `http://localhost:5000/api/sales/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success('Deleted successfully');

      fetchSales();
    } catch (err) {
      toast.error('Delete failed');
    }
  };

  // ================= NAV =================

  const handleEdit = (id) =>
    navigate(`/edit-sale/${id}`);

  const handleView = (id) =>
    navigate(`/view-sale/${id}`);

  const handleLogout = () => {
    localStorage.removeItem('token');

    toast.success('Logged out');

    navigate('/');
  };
// ================= PDF DOWNLOAD =================

const downloadPDF = () => {
  const doc = new jsPDF();

  doc.text('Sales Report', 14, 15);

  autoTable(doc, {
    head: [['Product', 'Price', 'Quantity', 'Total']],

    body: sales.map((s) => [
      s.productName,
      s.price,
      s.quantity,
      s.price * s.quantity,
    ]),
  });

  doc.save('sales-report.pdf');
};

// ================= EXCEL DOWNLOAD =================

const downloadExcel = () => {
  const worksheet = XLSX.utils.json_to_sheet(
    sales.map((s) => ({
      Product: s.productName,
      Price: s.price,
      Quantity: s.quantity,
      Total: s.price * s.quantity,
    }))
  );

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    'Sales'
  );

  const excelBuffer = XLSX.write(workbook, {
    bookType: 'xlsx',
    type: 'array',
  });

  const data = new Blob([excelBuffer], {
    type:
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
  });

  saveAs(data, 'sales-report.xlsx');
};
  // ================= SEARCH =================

  const filteredSales = sales.filter((s) =>
    s.productName
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  // ================= PAGINATION =================

  const indexOfLast = currentPage * itemsPerPage;

  const indexOfFirst = indexOfLast - itemsPerPage;

  const currentSales = filteredSales.slice(
    indexOfFirst,
    indexOfLast
  );

  const totalPages = Math.ceil(
    filteredSales.length / itemsPerPage
  );

  // ================= TOTAL =================

  const totalRevenue = sales.reduce(
    (acc, item) =>
      acc + item.price * item.quantity,
    0
  );

  const avgSales = sales.length
    ? (totalRevenue / sales.length).toFixed(2)
    : 0;

  const pieData = sales.map((item) => ({
    name: item.productName,
    value: item.quantity,
  }));

  const COLORS = [
    '#00C49F',
    '#0088FE',
    '#FFBB28',
    '#FF8042',
  ];

  return (
    <div style={styles.page}>
      <ToastContainer />

      {/* SIDEBAR */}

      <div style={styles.sidebar}>

        <h2 style={styles.logo}>SalesPro</h2>

        <button style={styles.sideBtn}>
          📊 Dashboard
        </button>

        <button
          style={styles.sideBtn}
          onClick={() => navigate('/add-sale')}
        >
          ➕ Add Sale
        </button>

        <button style={styles.sideBtn}>
          📈 Reports
        </button>

        <button style={styles.sideBtn}>
          ⚙ Settings
        </button>

        <button
          style={styles.logoutBtn}
          onClick={handleLogout}
        >
          <FaSignOutAlt /> Logout
        </button>

      </div>

      {/* MAIN */}

      <div style={styles.main}>

        {/* TOPBAR */}

        <div style={styles.topbar}>

          <h2 style={{ color: '#fff' }}>
            📊 Sales Management Dashboard
          </h2>

          <div style={styles.topIcons}>

            <button
              style={styles.iconBtn}
              onClick={() =>
                setDarkMode(!darkMode)
              }
            >
              {darkMode ? <FaSun /> : <FaMoon />}
            </button>

            <button style={styles.iconBtn}>
              <FaBell />
            </button>

            <button style={styles.iconBtn}>
              <FaUserCircle />
            </button>

          </div>

        </div>

        {/* CARDS */}

        <div className="row mb-4">

          <div className="col-md-3 mb-3">
            <div style={styles.card}>
              <h5>Total Revenue</h5>

              <h2 style={styles.greenText}>
                ₹ {totalRevenue}
              </h2>
            </div>
          </div>

          <div className="col-md-3 mb-3">
            <div style={styles.card}>
              <h5>Total Products</h5>

              <h2 style={styles.blueText}>
                {sales.length}
              </h2>
            </div>
          </div>

          <div className="col-md-3 mb-3">
            <div style={styles.card}>
              <h5>Average Sales</h5>

              <h2 style={styles.yellowText}>
                ₹ {avgSales}
              </h2>
            </div>
          </div>

          <div className="col-md-3 mb-3">
            <div style={styles.card}>
              <h5>Top Product</h5>

              <h2 style={styles.orangeText}>
                {sales[0]?.productName || 'N/A'}
              </h2>
            </div>
          </div>

        </div>

        {/* LINE CHART */}

        <div style={styles.chartCard}>

          <h5 style={styles.chartTitle}>
            📈 Sales Trend
          </h5>

          <ResponsiveContainer width="100%" height={300}>

            <LineChart data={sales}>

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.2)"
              />

              <XAxis
                dataKey="productName"
                tick={{ fill: '#ffffff' }}
              />

              <YAxis
                tick={{ fill: '#ffffff' }}
              />

              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e1e1e',
                  border: 'none',
                  color: '#fff',
                }}
              />

              <Line
                type="monotone"
                dataKey="price"
                stroke="#00c6ff"
                strokeWidth={3}
              />

            </LineChart>

          </ResponsiveContainer>

        </div>

        {/* PIE + BAR */}

        <div className="row mb-4">

          <div className="col-md-6 mb-3">

            <div style={styles.chartCard}>

              <h5 style={styles.chartTitle}>
                <FaChartPie /> Product Share
              </h5>

              <ResponsiveContainer
                width="100%"
                height={300}
              >

                <PieChart>

                  <Pie
                    data={pieData}
                    dataKey="value"
                    outerRadius={100}
                    label
                  >

                    {pieData.map(
                      (entry, index) => (
                        <Cell
                          key={index}
                          fill={
                            COLORS[
                              index %
                                COLORS.length
                            ]
                          }
                        />
                      )
                    )}

                  </Pie>

                  <Tooltip />

                </PieChart>

              </ResponsiveContainer>

            </div>

          </div>

          <div className="col-md-6 mb-3">

            <div style={styles.chartCard}>

              <h5 style={styles.chartTitle}>
                📊 Product Quantity
              </h5>

              <ResponsiveContainer
                width="100%"
                height={300}
              >

                <BarChart data={sales}>

                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(255,255,255,0.2)"
                  />

                  <XAxis
                    dataKey="productName"
                    tick={{
                      fill: '#ffffff',
                    }}
                  />

                  <YAxis
                    tick={{
                      fill: '#ffffff',
                    }}
                  />

                  <Tooltip
                    contentStyle={{
                      backgroundColor:
                        '#1e1e1e',
                      border: 'none',
                      color: '#fff',
                    }}
                  />

                  <Legend />

                  <Bar
                    dataKey="quantity"
                    fill="#00c6ff"
                  />

                </BarChart>

              </ResponsiveContainer>

            </div>

          </div>

        </div>

        {/* SEARCH */}

        <div style={styles.actionBar}>

          <input
            type="text"
            placeholder="🔍 Search Product"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            style={styles.search}
          />

          <div>

            <button
  style={styles.exportBtn}
  onClick={downloadPDF}
>
  <FaFilePdf /> PDF
</button>

            <button
  style={styles.exportBtn}
  onClick={downloadExcel}
>
  <FaFileExcel /> Excel
</button>

            <button
              style={styles.addBtn}
              onClick={() =>
                navigate('/add-sale')
              }
            >
              + Add Sale
            </button>

          </div>

        </div>

        {/* TABLE */}

        <div style={styles.tableCard}>

          {loading ? (
            <h4 style={{ color: '#fff' }}>
              Loading...
            </h4>
          ) : currentSales.length === 0 ? (
            <h4 style={{ color: '#fff' }}>
              No data found
            </h4>
          ) : (
            <div className="table-responsive">

              <table
                className="table table-hover table-bordered"
                style={{
                  color: '#ffffff',
                }}
              >

                <thead
                  style={{
                    background: '#00c6ff',
                    color: '#ffffff',
                  }}
                >

                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th>Actions</th>
                  </tr>

                </thead>

                <tbody>

                  {currentSales.map((s) => (

                    <tr
                      key={s._id}
                      style={{
                        background:
                          'rgba(255,255,255,0.08)',
                        color: '#ffffff',
                      }}
                    >

                      <td>
                        {s.productName}
                      </td>

                      <td
                        style={{
                          color: '#00ffcc',
                          fontWeight: 'bold',
                        }}
                      >
                        ₹ {s.price}
                      </td>

                      <td
                        style={{
                          color: '#ffd166',
                          fontWeight: 'bold',
                        }}
                      >
                        {s.quantity}
                      </td>

                      <td
                        style={{
                          color: '#4dff4d',
                          fontWeight: 'bold',
                        }}
                      >
                        ₹{' '}
                        {s.price *
                          s.quantity}
                      </td>

                      <td>

                        <button
                          className="btn btn-info btn-sm me-2"
                          onClick={() =>
                            handleView(s._id)
                          }
                        >
                          <FaEye />
                        </button>

                        <button
                          className="btn btn-warning btn-sm me-2"
                          onClick={() =>
                            handleEdit(s._id)
                          }
                        >
                          <FaEdit />
                        </button>

                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() =>
                            handleDelete(s._id)
                          }
                        >
                          <FaTrash />
                        </button>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default SalesManagement;

// ================= STYLES =================

const styles = {
  page: {
    minHeight: '100vh',
    width: '100vw',
    display: 'flex',

    background:
      "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1974&auto=format&fit=crop')",

    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },

  sidebar: {
    width: '240px',

    background: 'rgba(0,0,0,0.7)',

    padding: '20px',

    backdropFilter: 'blur(10px)',

    display: 'flex',

    flexDirection: 'column',

    gap: '15px',
  },

  logo: {
    color: '#00c6ff',

    marginBottom: '20px',
  },

  sideBtn: {
    padding: '12px',

    border: 'none',

    borderRadius: '10px',

    cursor: 'pointer',

    background:
      'rgba(255,255,255,0.1)',

    color: '#fff',

    textAlign: 'left',
  },

  logoutBtn: {
    marginTop: 'auto',

    padding: '12px',

    border: 'none',

    borderRadius: '10px',

    background: '#ff4d4d',

    color: '#fff',

    cursor: 'pointer',
  },

  main: {
    flex: 1,

    padding: '25px',

    minHeight: '100vh',

    width: '100%',
  },

  topbar: {
    display: 'flex',

    justifyContent: 'space-between',

    alignItems: 'center',

    marginBottom: '25px',
  },

  topIcons: {
    display: 'flex',

    gap: '10px',
  },

  iconBtn: {
    padding: '10px',

    borderRadius: '50%',

    border: 'none',

    cursor: 'pointer',

    background:
      'rgba(255,255,255,0.2)',

    color: '#fff',
  },

  card: {
    background:
      'rgba(255,255,255,0.12)',

    backdropFilter: 'blur(10px)',

    border:
      '1px solid rgba(255,255,255,0.2)',

    borderRadius: '18px',

    padding: '25px',

    color: '#fff',

    boxShadow:
      '0 8px 32px rgba(0,0,0,0.3)',
  },

  chartCard: {
    background:
      'rgba(255,255,255,0.12)',

    backdropFilter: 'blur(10px)',

    borderRadius: '18px',

    padding: '20px',

    marginBottom: '20px',
  },

  chartTitle: {
    color: '#fff',

    marginBottom: '15px',
  },

  actionBar: {
    display: 'flex',

    justifyContent: 'space-between',

    marginBottom: '20px',

    gap: '15px',

    flexWrap: 'wrap',
  },

  search: {
    padding: '12px',

    borderRadius: '10px',

    border: 'none',

    width: '300px',
  },

  addBtn: {
    padding: '12px 18px',

    borderRadius: '10px',

    border: 'none',

    background: '#00c6ff',

    color: '#fff',

    marginLeft: '10px',

    cursor: 'pointer',
  },

  exportBtn: {
    padding: '12px 18px',

    borderRadius: '10px',

    border: 'none',

    marginRight: '10px',

    background: '#222',

    color: '#fff',

    cursor: 'pointer',
  },

  tableCard: {
    background:
      'rgba(255,255,255,0.12)',

    backdropFilter: 'blur(10px)',

    borderRadius: '18px',

    padding: '20px',
  },

  greenText: {
    color: '#4dff4d',
  },

  blueText: {
    color: '#00c6ff',
  },

  yellowText: {
    color: '#ffd166',
  },

  orangeText: {
    color: '#ff9f43',
  },
};