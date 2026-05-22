/* eslint-disable no-undef */
const mysql = require('mysql2/promise');
require('dotenv').config();

async function initializeDatabase() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
  });

  try {
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);
    console.log('Database created or already exists');

    await connection.changeUser({ database: process.env.DB_NAME });

    // Categories table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS categories (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        description TEXT,
        image_url VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await connection.query(`

  CREATE TABLE IF NOT EXISTS products (

    id INT AUTO_INCREMENT PRIMARY KEY,

    name VARCHAR(255) NOT NULL,

    category VARCHAR(150) NOT NULL,

    price DECIMAL(10,2) NOT NULL,

    size VARCHAR(50),

    stock INT DEFAULT 0,

    short_description TEXT,

    full_description LONGTEXT,

    benefits TEXT,

    image VARCHAR(255),

    reviews INT DEFAULT 0,

    is_best_seller BOOLEAN DEFAULT FALSE,

    status ENUM('draft', 'published') DEFAULT 'published',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

  )

`)

    // Blogs table
await connection.query(`
  CREATE TABLE IF NOT EXISTS blogs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    short_description TEXT,
    content LONGTEXT,
    image VARCHAR(255),
    status ENUM('draft', 'published') DEFAULT 'draft',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`);


// REVIEWS TABLE
await connection.query(`

  CREATE TABLE IF NOT EXISTS reviews (

    id INT AUTO_INCREMENT PRIMARY KEY,

    name VARCHAR(255) NOT NULL,

    rating INT NOT NULL,

    review TEXT NOT NULL,

    status ENUM('pending', 'approved') DEFAULT 'pending',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

  )

`)

// CONTACT MESSAGES TABLE
await connection.query(`

  CREATE TABLE IF NOT EXISTS contact_messages (

    id INT AUTO_INCREMENT PRIMARY KEY,

    name VARCHAR(255) NOT NULL,

    email VARCHAR(255) NOT NULL,

    phone VARCHAR(50) NOT NULL,

    subject VARCHAR(255) NOT NULL,

    message LONGTEXT NOT NULL,

    status ENUM(

      'pending',
      'resolved',
      'deleted'

    ) DEFAULT 'pending',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

  )

`)

// ORDERS TABLE
await connection.query(`

  CREATE TABLE IF NOT EXISTS orders (

    id INT AUTO_INCREMENT PRIMARY KEY,

    order_id VARCHAR(100) NOT NULL,

    customer_name VARCHAR(255) NOT NULL,

    phone VARCHAR(50) NOT NULL,

    email VARCHAR(255) NOT NULL,

    address TEXT NOT NULL,

    landmark VARCHAR(255),

    city VARCHAR(100) NOT NULL,

    pincode VARCHAR(20) NOT NULL,

    total_amount DECIMAL(10,2) NOT NULL,

    status ENUM(

      'pending',
      'confirmed',
      'delivered'

    ) DEFAULT 'pending',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

  )

`)



// ORDER ITEMS TABLE
await connection.query(`

  CREATE TABLE IF NOT EXISTS order_items (

    id INT AUTO_INCREMENT PRIMARY KEY,

    order_id VARCHAR(100) NOT NULL,

    product_name VARCHAR(255) NOT NULL,

    quantity INT NOT NULL,

    price DECIMAL(10,2) NOT NULL,

    image VARCHAR(255)

  )

`)

    // Sample categories
    await connection.query(`
      INSERT IGNORE INTO categories (id, name, description, image_url) VALUES
      (1, 'Fruit Powders', 'Natural fruit powder supplements', 'https://via.placeholder.com/200?text=Fruit'),
      (2, 'Vegetable Powders', 'Organic vegetable powders', 'https://via.placeholder.com/200?text=Vegetable'),
      (3, 'Smoothie Mixes', 'Ready smoothie blends', 'https://via.placeholder.com/200?text=Smoothie'),
      (4, 'Cooking Ingredients', 'Culinary powders', 'https://via.placeholder.com/200?text=Cooking')
    `);

    // Sample products
    await connection.query(`

INSERT IGNORE INTO products (

  id,
  name,
  category,
  price,
  size,
  stock,
  short_description,
  full_description,
  benefits,
  image,
  reviews,
  is_best_seller,
  status

)

VALUES

(
  1,
  'Banana Powder',
  'Fruit Powders',
  399,
  '100g',
  120,
  'Natural banana powder rich in energy and fiber.',
  'Banana Powder is made from premium bananas using dehydration technology to preserve nutrients and flavor naturally.',
  'Energy,Digestion,Immunity',
  'http://localhost:5000/uploads/products/banana.jpeg',
  128,
  TRUE,
  'published'
),

(
  2,
  'Beetroot Powder',
  'Vegetable Powders',
  499,
  '200g',
  90,
  'Rich in antioxidants and natural detox support.',
  'Beetroot Powder supports healthy blood flow and natural stamina.',
  'Detox,Immunity',
  'http://localhost:5000/uploads/products/beetroot.jpeg',
  96,
  TRUE,
  'published'
),

(
  3,
  'Amla Powder',
  'Herbs Powders',
  599,
  '100g',
  80,
  'Vitamin C rich superfood powder.',
  'Amla Powder supports immunity, digestion, skin and hair health naturally.',
  'Immunity,Antioxidants',
  'http://localhost:5000/uploads/products/amla.jpeg',
  88,
  TRUE,
  'published'
),

(
  4,
  'Guava Powder',
  'Fruit Powders',
  699,
  '500g',
  70,
  'Naturally sweet and nutrient rich fruit powder.',
  'Guava Powder contains natural fiber and antioxidants for healthy digestion.',
  'Gut,Immunity',
  'http://localhost:5000/uploads/products/guava.jpeg',
  72,
  FALSE,
  'published'
),

(
  5,
  'Carrot Powder',
  'Vegetable Powders',
  799,
  '1kg',
  60,
  'Healthy vegetable powder packed with nutrients.',
  'Carrot Powder supports eye health and daily nutrition.',
  'Detox,Antioxidants',
  'http://localhost:5000/uploads/products/carrot.jpeg',
  64,
  FALSE,
  'published'
)

`)

// ADMINS TABLE
await connection.query(`

  CREATE TABLE IF NOT EXISTS admins (

    id INT AUTO_INCREMENT PRIMARY KEY,

    email VARCHAR(255) UNIQUE NOT NULL,

    password VARCHAR(255) NOT NULL,

    role ENUM(

      'super_admin',
      'staff'

    ) DEFAULT 'staff',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

  )

`)
const bcrypt = require("bcryptjs")



const hashedPassword =
  await bcrypt.hash(

    "admin123",

    10

  )



await connection.query(

  `

  INSERT IGNORE INTO admins (

    id,
    email,
    password,
    role

  )

  VALUES (?, ?, ?, ?)

  `,

  [

    1,

    "admin@farm2flake.com",

    hashedPassword,

    "super_admin"

  ]

)



    console.log('Database initialized successfully!');
  } catch (error) {
    console.error('Database initialization error:', error);
  } finally {
    await connection.end();
  }
}

initializeDatabase();
