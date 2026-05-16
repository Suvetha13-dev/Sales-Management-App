# 🛒 Sales Management App

## 📌 Project Overview

Sales Management App is a full-stack web application developed to manage sales records efficiently. The application provides secure authentication, sales tracking, CRUD operations, analytics dashboard, and API documentation.

This project is built using modern web technologies and follows a responsive UI design suitable for desktop and mobile devices.

---

# 🚀 Features

- 🔐 JWT Authentication Login
- ➕ Add New Sales
- 📋 View Sales Details
- ✏ Edit Existing Sales
- ❌ Delete Sales
- 📊 Sales Dashboard & Analytics
- 📱 Responsive User Interface
- 📄 Swagger API Documentation
- 🔎 Search & Filter Functionality
- ⚡ Fast REST API Integration

---

# 🛠 Tech Stack

## Frontend
- React.js
- Axios
- React Router DOM
- CSS

## Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication

## Tools & Libraries
- Swagger UI Express
- Mongoose
- dotenv
- cors
- nodemon

---

# 📂 Project Structure

```bash
Sales-Management-App/
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── config/
│   ├── .env
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── SalesManagement.jsx
│   │   │   ├── AddSale.jsx
│   │   │   ├── EditSale.jsx
│   │   │   └── ViewSale.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
└── README.md
```

---

# ⚙ Installation & Setup

## 1️⃣ Clone Repository

```bash
git clone https://github.com/YourUsername/Sales-Management-App.git
cd Sales-Management-App
```

---

# 🔧 Backend Setup

Navigate to backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Start backend server:

```bash
npm start
```

Backend running at:

```bash
http://localhost:5000
```

---

# 💻 Frontend Setup

Navigate to frontend folder:

```bash
cd ../frontend
```

Install dependencies:

```bash
npm install
```

Start frontend server:

```bash
npm run dev
```

Frontend running at:

```bash
http://localhost:5173
```

---

# 🔑 Demo Login Credentials

```txt
Username: admin
Password: admin
```

---

# 📘 Swagger API Documentation

Swagger API documentation available at:

```bash
http://localhost:5000/api-docs
```

---

# 📡 API Endpoints

## Authentication Routes

| Method | Endpoint | Description |
|---|---|---|
| POST | /api/auth/login | User Login |

---

## Sales Routes

| Method | Endpoint | Description |
|---|---|---|
| GET | /api/sales | Get All Sales |
| GET | /api/sales/:id | Get Single Sale |
| POST | /api/sales | Add New Sale |
| PUT | /api/sales/:id | Update Sale |
| DELETE | /api/sales/:id | Delete Sale |

---

# 📸 Screenshots

## Login Page
(Add Screenshot Here)

## Dashboard
(Add Screenshot Here)

## Add Sales Page
(Add Screenshot Here)

---

# 🌐 Live Demo

(Add Deployment Link Here)

---

# 👨‍💻 Author

Developed by Your Name

---

# ⭐ Conclusion

This project demonstrates full-stack web development skills including authentication, REST APIs, database integration, responsive frontend development, and CRUD functionality using the MERN stack.