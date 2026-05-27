// eslint-disable-next-line no-undef
const sendInvoiceEmail = require("./utils/sendInvoiceEmail")

// eslint-disable-next-line no-undef
const multer = require('multer')
// eslint-disable-next-line no-undef
const path = require('path')

// eslint-disable-next-line no-undef
const express = require('express');
// eslint-disable-next-line no-undef
const cors = require('cors');
// eslint-disable-next-line no-undef
const bodyParser = require('body-parser');

// eslint-disable-next-line no-undef
require('dotenv').config();
// eslint-disable-next-line no-undef
const pool = require('./db');

// eslint-disable-next-line no-undef
const sendResolvedEmail = require("./utils/sendResolvedEmail")

// eslint-disable-next-line no-undef
const bcrypt = require("bcryptjs")

// eslint-disable-next-line no-undef
const jwt = require("jsonwebtoken")

const app = express();
app.use('/uploads', express.static('uploads'))
app.use(cors());
app.use(bodyParser.json());

app.use('/uploads', express.static('uploads'))

// API Routes

// Get all categories
app.get('/api/categories', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [categories] = await connection.query('SELECT * FROM categories');
    connection.release();
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

// Get all products
app.get('/api/products', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [products] = await connection.query('SELECT * FROM products');
    connection.release();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Get best sellers
app.get('/api/best-sellers', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [products] = await connection.query('SELECT * FROM products WHERE is_best_seller = TRUE');
    connection.release();
    res.json(products);
  } catch (error) {
    console.error('Error fetching best sellers:', error);
    res.status(500).json({ error: 'Failed to fetch best sellers' });
  }
});

// Get products by category
app.get('/api/products/category/:categoryId', async (req, res) => {
  try {
    const { categoryId } = req.params;
    const connection = await pool.getConnection();
    const [products] = await connection.query(
      'SELECT * FROM products WHERE category_id = ?',
      [categoryId]
    );
    connection.release();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products by category:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Get single product
app.get('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await pool.getConnection();
    const [products] = await connection.query(
      'SELECT * FROM products WHERE id = ?',
      [id]
    );
    connection.release();
    if (products.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(products[0]);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

// GET ALL BLOGS
app.get('/api/blogs', async (req, res) => {

  try {

    const connection = await pool.getConnection();

    const [blogs] = await connection.query(
      'SELECT * FROM blogs ORDER BY created_at DESC'
    );

    connection.release();

    res.json(blogs);

  } catch (error) {

    console.error('Error fetching blogs:', error);

    res.status(500).json({
      error: 'Failed to fetch blogs'
    });

  }

});



// ADD BLOG
app.post('/api/blogs', async (req, res) => {

  try {

    const {
      title,
      category,
      short_description,
      content,
      image,
      status
    } = req.body;

    const connection = await pool.getConnection();

    const [result] = await connection.query(

      `INSERT INTO blogs
      (title, category, short_description, content, image, status)
      VALUES (?, ?, ?, ?, ?, ?)`,

      [
        title,
        category,
        short_description,
        content,
        image,
        status
      ]

    );

    connection.release();

    res.json({
      message: 'Blog created successfully',
      blogId: result.insertId
    });

  } catch (error) {

    console.error('Error creating blog:', error);

    res.status(500).json({
      error: 'Failed to create blog'
    });

  }

});



// DELETE BLOG
app.delete('/api/blogs/:id', async (req, res) => {

  try {

    const { id } = req.params;

    const connection = await pool.getConnection();

    await connection.query(
      'DELETE FROM blogs WHERE id = ?',
      [id]
    );

    connection.release();

    res.json({
      message: 'Blog deleted successfully'
    });

  } catch (error) {

    console.error('Error deleting blog:', error);

    res.status(500).json({
      error: 'Failed to delete blog'
    });

  }

});

// MULTER STORAGE
const storage = multer.diskStorage({

  destination: (req, file, cb) => {

    cb(null, 'uploads/blogs')

  },

  filename: (req, file, cb) => {

    cb(

      null,

      Date.now() + path.extname(file.originalname)

    )

  }

})



const upload = multer({
  storage
})

// UPLOAD BLOG IMAGE
app.post(

  '/api/upload-blog-image',

  upload.single('image'),

  (req, res) => {

    try {

      res.json({

        imageUrl:

        `https://farm2flake-backend.onrender.com/uploads/blogs/${req.file.filename}`

      })

    } catch (error) {

      console.log(error)

      res.status(500).json({
        error: 'Image upload failed'
      })

    }

  }

)

// GET ALL PRODUCTS
app.get('/api/products', async (req, res) => {

  try {

    const connection = await pool.getConnection()

    const [products] = await connection.query(

      'SELECT * FROM products ORDER BY created_at DESC'

    )

    connection.release()

    res.json(products)

  } catch (error) {

    console.log(error)

    res.status(500).json({
      error: 'Failed to fetch products'
    })

  }

})



// GET BEST SELLERS
app.get('/api/best-sellers', async (req, res) => {

  try {

    const connection = await pool.getConnection()

    const [products] = await connection.query(

      'SELECT * FROM products WHERE is_best_seller = TRUE AND status = "published" ORDER BY created_at DESC'

    )

    connection.release()

    res.json(products)

  } catch (error) {

    console.log(error)

    res.status(500).json({
      error: 'Failed to fetch best sellers'
    })

  }

})



// ADD PRODUCT
app.post('/api/products', async (req, res) => {

  try {

    const {

      name,
      category,
      price,
      size,
      stock,
      short_description,
      full_description,
      benefits,
      image,
      is_best_seller,
      status

    } = req.body



    const connection = await pool.getConnection()



    const [result] = await connection.query(

      `

      INSERT INTO products (

        name,
        category,
        price,
        size,
        stock,
        short_description,
        full_description,
        benefits,
        image,
        is_best_seller,
        status

      )

      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)

      `,

      [

        name,
        category,
        price,
        size,
        stock,
        short_description,
        full_description,
        benefits,
        image,
        is_best_seller,
        status

      ]

    )



    connection.release()



    res.json({

      success: true,
      id: result.insertId

    })

  } catch (error) {

    console.log(error)

    res.status(500).json({
      error: 'Failed to add product'
    })

  }

})



// DELETE PRODUCT
app.delete('/api/products/:id', async (req, res) => {

  try {

    const connection = await pool.getConnection()

    await connection.query(

      'DELETE FROM products WHERE id = ?',

      [req.params.id]

    )



    connection.release()

    res.json({
      success: true
    })

  } catch (error) {

    console.log(error)

    res.status(500).json({
      error: 'Failed to delete product'
    })

  }

})

// SUBMIT REVIEW
app.post('/api/reviews', async (req, res) => {

  try {

    const {

      name,
      rating,
      review

    } = req.body



    const connection = await pool.getConnection()



    const [result] = await connection.query(

      `

      INSERT INTO reviews (

        name,
        rating,
        review

      )

      VALUES (?, ?, ?)

      `,

      [

        name,
        rating,
        review

      ]

    )



    connection.release()



    res.json({

      success: true,
      id: result.insertId

    })

  } catch (error) {

    console.log(error)

    res.status(500).json({
      error: 'Failed to submit review'
    })

  }

})



// GET APPROVED REVIEWS
app.get('/api/reviews', async (req, res) => {

  try {

    const connection = await pool.getConnection()



    const [reviews] = await connection.query(

      `

      SELECT *

      FROM reviews

      WHERE status = 'approved'

      ORDER BY created_at DESC

      `

    )



    connection.release()

    res.json(reviews)

  } catch (error) {

    console.log(error)

    res.status(500).json({
      error: 'Failed to fetch reviews'
    })

  }

})

// ADMIN GET ALL REVIEWS
app.get('/api/admin-reviews', async (req, res) => {

  try {

    const connection = await pool.getConnection()

    const [reviews] = await connection.query(

      `

      SELECT *

      FROM reviews

      ORDER BY created_at DESC

      `

    )



    connection.release()

    res.json(reviews)

  } catch (error) {

    console.log(error)

    res.status(500).json({
      error: 'Failed to fetch reviews'
    })

  }

})



// APPROVE REVIEW
app.put('/api/reviews/:id/approve', async (req, res) => {

  try {

    const connection = await pool.getConnection()



    await connection.query(

      `

      UPDATE reviews

      SET status = 'approved'

      WHERE id = ?

      `,

      [req.params.id]

    )



    connection.release()



    res.json({
      success: true
    })

  } catch (error) {

    console.log(error)

    res.status(500).json({
      error: 'Failed to approve review'
    })

  }

})



// DELETE REVIEW
app.delete('/api/reviews/:id', async (req, res) => {

  try {

    const connection = await pool.getConnection()



    await connection.query(

      'DELETE FROM reviews WHERE id = ?',

      [req.params.id]

    )



    connection.release()



    res.json({
      success: true
    })

  } catch (error) {

    console.log(error)

    res.status(500).json({
      error: 'Failed to delete review'
    })

  }

})

// CREATE ORDER
app.post('/api/orders', async (req, res) => {

  try {

    const {

      customer_name,
      phone,
      email,
      address,
      landmark,
      city,
      pincode,
      total_amount,
      products

    } = req.body



    // ORDER ID
    const orderId =

      `F2F-${Date.now()}`



    const connection =
      await pool.getConnection()



    // SAVE ORDER
    await connection.query(

      `

      INSERT INTO orders (

        order_id,
        customer_name,
        phone,
        email,
        address,
        landmark,
        city,
        pincode,
        total_amount

      )

      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)

      `,

      [

        orderId,
        customer_name,
        phone,
        email,
        address,
        landmark,
        city,
        pincode,
        total_amount

      ]

    )



    // SAVE ORDER ITEMS
    for (const item of products) {

      await connection.query(

        `

        INSERT INTO order_items (

          order_id,
          product_name,
          quantity,
          price,
          image

        )

        VALUES (?, ?, ?, ?, ?)

        `,

        [

          orderId,
          item.name,
          item.quantity,
          item.price,
          item.image

        ]

      )

    }



    connection.release()



// EMAIL ORDER OBJECT
const orderData = {

  order_id: orderId,

  customer_name,

  phone,

  email,

  city,

  total_amount

}



// EMAIL PRODUCTS
const emailProducts = products.map(

  (item) => ({

    product_name: item.name,

    quantity: item.quantity,

    price: item.price * item.quantity

  })

)



// SEND EMAIL
await sendInvoiceEmail(

  orderData,

  emailProducts

)



res.json({

  success: true,

  orderId

})

  } catch (error) {

    console.log(error)

    res.status(500).json({
      error: 'Failed to create order'
    })

  }

})

// GET ALL ORDERS
app.get('/api/orders', async (req, res) => {

  try {

    const connection =
      await pool.getConnection()



    const [orders] =
      await connection.query(

        `

        SELECT *

        FROM orders

        ORDER BY created_at DESC

        `

      )



    connection.release()

    res.json(orders)

  } catch (error) {

    console.log(error)

    res.status(500).json({
      error: 'Failed to fetch orders'
    })

  }

})



// UPDATE ORDER STATUS
app.put('/api/orders/:id', async (req, res) => {

  try {

    const { status } = req.body



    const connection =
      await pool.getConnection()



    await connection.query(

      `

      UPDATE orders

      SET status = ?

      WHERE id = ?

      `,

      [

        status,
        req.params.id

      ]

    )



    connection.release()



    res.json({
      success: true
    })

  } catch (error) {

    console.log(error)

    res.status(500).json({
      error: 'Failed to update order'
    })

  }

})

// CREATE CONTACT MESSAGE
app.post('/api/contact', async (req, res) => {

  try {

    const {

      name,
      email,
      phone,
      subject,
      message

    } = req.body



    const connection =
      await pool.getConnection()



    await connection.query(

      `

      INSERT INTO contact_messages (

        name,
        email,
        phone,
        subject,
        message

      )

      VALUES (?, ?, ?, ?, ?)

      `,

      [

        name,
        email,
        phone,
        subject,
        message

      ]

    )



    connection.release()



    res.json({

      success: true

    })

  } catch (error) {

    console.log(error)

    res.status(500).json({

      error: 'Failed to submit query'

    })

  }

})



// GET CONTACTS
app.get('/api/contact-messages', async (req, res) => {

  try {

    const connection =
      await pool.getConnection()



    const [messages] =
      await connection.query(

        `

        SELECT *

        FROM contact_messages

        WHERE status != 'deleted'

        ORDER BY created_at DESC

        `

      )



    connection.release()



    res.json(messages)

  } catch (error) {

    console.log(error)

  }

})



// UPDATE STATUS
app.put('/api/contact-messages/:id', async (req, res) => {

  try {

    const { status } = req.body



    const connection =
      await pool.getConnection()



    await connection.query(

      `

      UPDATE contact_messages

      SET status = ?

      WHERE id = ?

      `,

      [

        status,
        req.params.id

      ]

    )



    // SEND RESOLVED EMAIL
    if (status === "resolved") {

      const [rows] =
        await connection.query(

          `

          SELECT *

          FROM contact_messages

          WHERE id = ?

          `,

          [req.params.id]

        )



      const message =
        rows[0]



      await sendResolvedEmail(

        message.email,

        message.name,

        new Date(
          message.created_at
        ).toLocaleDateString()

      )

    }



    connection.release()



    res.json({

      success: true

    })

  } catch (error) {

    console.log(error)

  }

})

// LOGIN
app.post('/api/admin/login', async (req, res) => {

  try {

    const {

      email,
      password

    } = req.body



    const connection =
      await pool.getConnection()



    const [admins] =
      await connection.query(

        `

        SELECT *

        FROM admins

        WHERE email = ?

        `,

        [email]

      )



    connection.release()



    if (admins.length === 0) {

      return res.status(401).json({

        error: "Invalid credentials"

      })

    }



    const admin =
      admins[0]



    const isMatch =
      await bcrypt.compare(

        password,

        admin.password

      )



    if (!isMatch) {

      return res.status(401).json({

        error: "Invalid credentials"

      })

    }



    const token =
      jwt.sign(

        {

          id: admin.id,

          role: admin.role

        },

        // eslint-disable-next-line no-undef
        process.env.JWT_SECRET,

        {

          expiresIn: "1d"

        }

      )



    res.json({

      success: true,

      token,

      admin: {

        id: admin.id,

        email: admin.email,

        role: admin.role

      }

    })

  } catch (error) {

    console.log(error)

  }

})

// GET ADMINS
app.get('/api/admins', async (req, res) => {

  try {

    const connection =
      await pool.getConnection()



    const [admins] =
      await connection.query(

        `

        SELECT

          id,
          email,
          role,
          created_at

        FROM admins

        ORDER BY created_at DESC

        `

      )



    connection.release()



    res.json(admins)

  } catch (error) {

    console.log(error)

  }

})



// CREATE ADMIN
app.post('/api/admins', async (req, res) => {

  try {

    const {

      email,
      password,
      role

    } = req.body



    const hashedPassword =
      await bcrypt.hash(

        password,

        10

      )



    const connection =
      await pool.getConnection()



    await connection.query(

      `

      INSERT INTO admins (

        email,
        password,
        role

      )

      VALUES (?, ?, ?)

      `,

      [

        email,
        hashedPassword,
        role

      ]

    )



    connection.release()



    res.json({

      success: true

    })

  } catch (error) {

    console.log(error)

  }

})



// DELETE ADMIN
app.delete('/api/admins/:id', async (req, res) => {

  try {

    const connection =
      await pool.getConnection()



    await connection.query(

      `

      DELETE FROM admins

      WHERE id = ?

      `,

      [req.params.id]

    )



    connection.release()



    res.json({

      success: true

    })

  } catch (error) {

    console.log(error)

  }

})

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
