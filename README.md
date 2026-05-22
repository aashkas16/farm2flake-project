# FarmyTales - Full Stack Website

A complete e-commerce website for FarmyTales (nutrition products) built with:
- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: Node.js + Express
- **Database**: MySQL

## Project Structure

```
project1/
├── src/                 # React frontend
│   ├── components/      # React components
│   ├── App.jsx
│   └── main.jsx
├── backend/             # Express backend
│   ├── server.js        # Main server
│   ├── db.js            # Database connection
│   ├── init-db.js       # Database setup
│   ├── .env             # Environment variables
│   └── package.json
└── package.json         # Frontend dependencies
```

## Setup Instructions

### Prerequisites
- Node.js installed
- MySQL server running
- npm or yarn

### 1. Database Setup

First, make sure MySQL is running, then initialize the database:

```bash
cd backend
npm run init-db
```

This will:
- Create the `farmytales` database
- Create `categories` and `products` tables
- Insert sample data

### 2. Backend Setup

```bash
cd backend
npm install
npm start
```

The backend server will run on `http://localhost:5000`

### 3. Frontend Setup

In a new terminal (from the project root):

```bash
npm install
npm run dev
```

The frontend will run on `http://localhost:5173`

## API Endpoints

- `GET /api/categories` - Get all categories
- `GET /api/products` - Get all products
- `GET /api/best-sellers` - Get best-selling products
- `GET /api/products/category/:categoryId` - Get products by category
- `GET /api/products/:id` - Get single product

## Environment Variables

Backend `.env` file:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=farmytales
PORT=5000
```

Modify `DB_PASSWORD` if your MySQL has a password set.

## Features

- Product catalog with categories
- Best sellers section
- Dynamic data from MySQL database
- Responsive design with Tailwind CSS
- Newsletter subscription form
- Customer testimonials
- Product filtering by category

## Next Steps (Optional)

- Add user authentication
- Implement shopping cart
- Add checkout functionality
- Create admin dashboard
- Set up payment gateway integration
