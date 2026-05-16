import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/login',
        {
          username,
          password,
        }
      );

      localStorage.setItem('token', response.data.token);

      alert('Login successful');

      navigate('/sales-management');
    } catch (error) {
      console.error('Login failed:', error);
      alert('Invalid username or password');
    }
  };

  return (
    <div style={styles.container}>
      {/* Dark Overlay */}
      <div style={styles.overlay}></div>

      {/* Login Card */}
      <div style={styles.card}>
        <h2 style={styles.title}>Sales Management</h2>

        <p style={styles.subtitle}>Login to continue</p>

        <form onSubmit={handleLogin}>
          <input
            style={styles.input}
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            style={styles.input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button style={styles.button} type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

const styles = {
  container: {
    height: '100vh',
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    /* Full Screen Background Image */
    backgroundImage:
      "url('https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1974&auto=format&fit=crop')",

    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',

    position: 'relative',
    overflow: 'hidden',
  },

  /* Dark overlay */
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0,0,0,0.45)',
  },

  /* Login Card */
  card: {
    position: 'relative',
    zIndex: 1,

    width: '350px',

    padding: '40px',

    borderRadius: '20px',

    background: 'rgba(255,255,255,0.15)',

    backdropFilter: 'blur(12px)',

    border: '1px solid rgba(255,255,255,0.2)',

    boxShadow: '0 8px 32px rgba(0,0,0,0.3)',

    textAlign: 'center',
  },

  title: {
    color: '#fff',
    marginBottom: '10px',
    fontSize: '32px',
    fontWeight: 'bold',
  },

  subtitle: {
    color: '#e0e0e0',
    marginBottom: '30px',
    fontSize: '15px',
  },

  input: {
    width: '100%',

    padding: '14px',

    marginBottom: '20px',

    borderRadius: '10px',

    border: 'none',

    outline: 'none',

    fontSize: '16px',

    background: 'rgba(255,255,255,0.2)',

    color: '#fff',

    boxSizing: 'border-box',
  },

  button: {
    width: '100%',

    padding: '14px',

    border: 'none',

    borderRadius: '10px',

    background: 'linear-gradient(90deg, #4facfe, #00c6ff)',

    color: '#fff',

    fontSize: '18px',

    fontWeight: 'bold',

    cursor: 'pointer',

    transition: '0.3s',
  },
};