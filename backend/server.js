// eslint-disable-next-line no-undef
const sendInvoiceEmail = require("./utils/sendInvoiceEmail")
// eslint-disable-next-line no-undef
const sendOrderStatusEmail = require("./utils/sendOrderStatusEmail")

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

// Helper to process multiple product images
function processProduct(product) {
  if (!product) return null;
  const imageUrls = product.image ? product.image.split(',').map(url => url.trim()).filter(Boolean) : [];
  return {
    ...product,
    image: imageUrls[0] || "",
    images: imageUrls
  };
}

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
    res.json(products.map(processProduct));
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
    res.json(products.map(processProduct));
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
    res.json(products.map(processProduct));
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
    res.json(processProduct(products[0]));
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
      status,
      meta_title,
      meta_description
    } = req.body;

    const connection = await pool.getConnection();

    const [result] = await connection.query(

      `INSERT INTO blogs
      (
        title,
        category,
        short_description,
        content,
        image,
        status,
        meta_title,
        meta_description
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,

      [
        title,
        category,
        short_description,
        content,
        image,
        status,
        meta_title,
        meta_description
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
      status,
      price_100g,
      mrp_100g,
      price_250g,
      mrp_250g,
      price_500g,
      mrp_500g,
      nutrition_facts,
      ingredients,
      how_to_use

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
        status,
        price_100g,
        mrp_100g,
        price_250g,
        mrp_250g,
        price_500g,
        mrp_500g,
        nutrition_facts,
        ingredients,
        how_to_use

      )

      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)

      `,

      [

        name,
        category,
        price || price_250g || price_100g || price_500g || 0,
        size || "250g",
        stock,
        short_description,
        full_description,
        benefits,
        image,
        is_best_seller,
        status,
        price_100g || null,
        mrp_100g || null,
        price_250g || null,
        mrp_250g || null,
        price_500g || null,
        mrp_500g || null,
        nutrition_facts || null,
        ingredients || null,
        how_to_use || null

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
  let connection;
  try {
    const {
      name,
      rating,
      review,
      product_id
    } = req.body

    const prodId = product_id || 0;
    connection = await pool.getConnection()

    const [result] = await connection.query(
      `
      INSERT INTO reviews (
        product_id,
        name,
        rating,
        review
      )
      VALUES (?, ?, ?, ?)
      `,
      [
        prodId,
        name,
        rating,
        review
      ]
    )

    res.json({
      success: true,
      id: result.insertId
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      error: 'Failed to submit review'
    })
  } finally {
    if (connection) {
      connection.release()
    }
  }
})

// GET APPROVED REVIEWS FOR SPECIFIC PRODUCT
app.get('/api/reviews/product/:productId', async (req, res) => {

  try {

    const { productId } = req.params
    const connection = await pool.getConnection()

    const [reviews] = await connection.query(

      `

      SELECT *

      FROM reviews

      WHERE product_id = ? AND status = 'approved'

      ORDER BY created_at DESC

      `,

      [productId]

    )

    connection.release()

    res.json(reviews)

  } catch (error) {

    console.log(error)

    res.status(500).json({
      error: 'Failed to fetch reviews for product'
    })

  }

})

// GET APPROVED REVIEWS (GLOBAL)
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

// ADMIN GET ALL REVIEWS WITH PRODUCT NAME
app.get('/api/admin-reviews', async (req, res) => {

  try {

    const connection = await pool.getConnection()

    const [reviews] = await connection.query(

      `

      SELECT r.*, p.name AS product_name

      FROM reviews r

      LEFT JOIN products p ON r.product_id = p.id

      ORDER BY r.created_at DESC

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

// APPROVE REVIEW AND INCREMENT PRODUCT REVIEWS COUNT
app.put('/api/reviews/:id/approve', async (req, res) => {

  try {

    const connection = await pool.getConnection()

    // Get current review to fetch product_id
    const [reviews] = await connection.query(
      'SELECT * FROM reviews WHERE id = ?',
      [req.params.id]
    )

    if (reviews.length > 0) {
      const reviewObj = reviews[0];
      
      // Update review status to approved
      await connection.query(

        `

        UPDATE reviews

        SET status = 'approved'

        WHERE id = ?

        `,

        [req.params.id]

      )

      // Only increment product review count if it wasn't approved already
      if (reviewObj.status !== 'approved') {
        await connection.query(
          `UPDATE products SET reviews = reviews + 1 WHERE id = ?`,
          [reviewObj.product_id]
        )
      }
    }

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

// ADMIN REPLY TO REVIEW
app.put('/api/reviews/:id/reply', async (req, res) => {

  try {

    const { id } = req.params

    const { admin_reply } = req.body

    const connection = await pool.getConnection()

    await connection.query(

      `
      UPDATE reviews
      SET admin_reply = ?
      WHERE id = ?
      `,

      [
        admin_reply,
        id
      ]

    )

    connection.release()

    res.json({
      message: "Reply added successfully"
    })

  }

  catch (error) {

    console.error(error)

    res.status(500).json({
      error: "Failed to add reply"
    })

  }

})

app.put('/api/reviews/:id/reply', async (req, res) => {

  try {

    const { id } = req.params

    const { admin_reply } = req.body

    const connection = await pool.getConnection()

    await connection.query(

      `
      UPDATE reviews
      SET admin_reply = ?
      WHERE id = ?
      `,

      [
        admin_reply,
        id
      ]

    )

    connection.release()

    res.json({
      message: "Reply saved successfully"
    })

  } catch (error) {

    console.error(error)

    res.status(500).json({
      error: "Failed to save reply"
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

  address,

  landmark,

  city,

  pincode,

  total_amount,

  created_at: new Date()

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
// RETURN RESPONSE IMMEDIATELY
res.json({

  success: true,

  orderId

})

// SEND EMAIL IN BACKGROUND
sendInvoiceEmail(

  orderData,

  emailProducts

).catch((err) => {

  console.log("Email Error:", err)

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

    const connection = await pool.getConnection()

    // Fetch order first to get details for the email
    const [orders] = await connection.query(
      'SELECT order_id, customer_name, email FROM orders WHERE id = ?',
      [req.params.id]
    )

    if (orders.length > 0) {
      const order = orders[0]

      // Update status
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

      // Send email if status is confirmed or delivered
      if (status === 'confirmed' || status === 'delivered') {
        sendOrderStatusEmail(order, status).catch((err) => {
          console.error("Order Status Email Error:", err)
        })
      }
    }

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

// DELETE ORDER
app.delete('/api/orders/:id', async (req, res) => {

  try {

    const connection =
      await pool.getConnection()

    // Get order_id first
    const [orders] =
      await connection.query(

        `
        SELECT order_id
        FROM orders
        WHERE id = ?
        `,

        [req.params.id]

      )

    if (orders.length === 0) {

      connection.release()

      return res.status(404).json({
        error: "Order not found"
      })

    }

    const orderId =
      orders[0].order_id

    // Delete order items first
    await connection.query(

      `
      DELETE FROM order_items
      WHERE order_id = ?
      `,

      [orderId]

    )

    // Delete order
    await connection.query(

      `
      DELETE FROM orders
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
      error: "Failed to delete order"
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
  let connection;
  try {
    const { status } = req.body
    connection = await pool.getConnection()
    await connection.query(
      `
      UPDATE contact_messages
      SET status = ?
      WHERE id = ?
      `,
      [status, req.params.id]
    )

    // SEND RESOLVED EMAIL
    if (status === "resolved") {
      const [rows] = await connection.query(
        `
        SELECT *
        FROM contact_messages
        WHERE id = ?
        `,
        [req.params.id]
      )

      const message = rows[0]
      if (message) {
        // Send email in background without blocking the HTTP response
        sendResolvedEmail(
          message.email,
          message.name,
          new Date(message.created_at).toLocaleDateString()
        ).catch(err => console.log("Email resolution sending failed:", err))
      }
    }

    res.json({
      success: true
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message })
  } finally {
    if (connection) {
      connection.release()
    }
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



// UPDATE PRODUCT
app.put('/api/products/:id', async (req, res) => {
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
      status,
      price_100g,
      mrp_100g,
      price_250g,
      mrp_250g,
      price_500g,
      mrp_500g,
      nutrition_facts,
      ingredients,
      how_to_use
    } = req.body

    const connection = await pool.getConnection()
    await connection.query(
      `
      UPDATE products SET
        name = ?,
        category = ?,
        price = ?,
        size = ?,
        stock = ?,
        short_description = ?,
        full_description = ?,
        benefits = ?,
        image = ?,
        is_best_seller = ?,
        status = ?,
        price_100g = ?,
        mrp_100g = ?,
        price_250g = ?,
        mrp_250g = ?,
        price_500g = ?,
        mrp_500g = ?,
        nutrition_facts = ?,
        ingredients = ?,
        how_to_use = ?
      WHERE id = ?
      `,
      [
        name,
        category,
        price || price_250g || price_100g || price_500g || 0,
        size || "250g",
        stock,
        short_description,
        full_description,
        benefits,
        image,
        is_best_seller,
        status,
        price_100g || null,
        mrp_100g || null,
        price_250g || null,
        mrp_250g || null,
        price_500g || null,
        mrp_500g || null,
        nutrition_facts || null,
        ingredients || null,
        how_to_use || null,
        req.params.id
      ]
    )
    connection.release()
    res.json({ success: true })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Failed to update product' })
  }
})

// UPDATE BLOG
app.put('/api/blogs/:id', async (req, res) => {
  try {
    const {
      title,
      category,
      short_description,
      content,
      image,
      status,
      meta_title,
      meta_description
    } = req.body

    const connection = await pool.getConnection()
    await connection.query(
      `
      UPDATE blogs SET
        title = ?,
        category = ?,
        short_description = ?,
        content = ?,
        image = ?,
        status = ?,
        meta_title = ?,
        meta_description = ?
      WHERE id = ?
      `,
      [
        title,
        category,
        short_description,
        content,
        image,
        status,
        meta_title || null,
        meta_description || null,
        req.params.id
      ]
    )
    connection.release()
    res.json({ success: true })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Failed to update blog' })
  }
})

// VERIFY ADMIN PASSWORD
app.post('/api/admins/:id/verify-password', async (req, res) => {
  try {
    const { password } = req.body
    const connection = await pool.getConnection()
    const [admins] = await connection.query(
      'SELECT password FROM admins WHERE id = ?',
      [req.params.id]
    )
    connection.release()

    if (admins.length === 0) {
      return res.status(404).json({ error: "Admin not found" })
    }

    const isMatch = await bcrypt.compare(password, admins[0].password)
    if (isMatch) {
      res.json({ success: true })
    } else {
      res.status(400).json({ success: false, error: "Incorrect old password" })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Failed to verify password' })
  }
})

// RESET ADMIN PASSWORD
app.put('/api/admins/:id/reset-password', async (req, res) => {
  try {
    const { password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)

    const connection = await pool.getConnection()
    await connection.query(
      'UPDATE admins SET password = ? WHERE id = ?',
      [hashedPassword, req.params.id]
    )
    connection.release()

    res.json({ success: true })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Failed to reset password' })
  }
})


// Self-healing database schema upgrade function
async function upgradeDatabaseSchema() {
  let connection;
  try {
    connection = await pool.getConnection();
    console.log("Checking database schema upgrades...");

    // 1. Alter products.image to TEXT
    try {
      await connection.query("ALTER TABLE products MODIFY COLUMN image TEXT");
      console.log("Database Schema Upgrade: products.image altered to TEXT.");
    } catch (err) {
      // Ignore if already text
    }

    // 2. Add product_id to reviews if missing
    try {
      await connection.query("ALTER TABLE reviews ADD COLUMN product_id INT NOT NULL DEFAULT 0 AFTER id");
      console.log("Database Schema Upgrade: product_id added to reviews.");
    } catch (err) {
      // Ignore if already exists
    }

    // 3. Add reply to reviews if missing
    try {
      await connection.query("ALTER TABLE reviews ADD COLUMN reply TEXT NULL AFTER review");
      console.log("Database Schema Upgrade: reply added to reviews.");
    } catch (err) {
      // Ignore if already exists
    }

    // 4. Add meta_title to blogs if missing
    try {
      await connection.query("ALTER TABLE blogs ADD COLUMN meta_title VARCHAR(255) NULL AFTER status");
      console.log("Database Schema Upgrade: meta_title added to blogs.");
    } catch (err) {
      // Ignore if already exists
    }

    // 5. Add meta_description to blogs if missing
    try {
      await connection.query("ALTER TABLE blogs ADD COLUMN meta_description TEXT NULL AFTER meta_title");
      console.log("Database Schema Upgrade: meta_description added to blogs.");
    } catch (err) {
      // Ignore if already exists
    }

    // 6. Add manual price/mrp and dynamic tabs to products if missing
    const fieldsToAdd = [
      { name: "price_100g", type: "DECIMAL(10,2) NULL" },
      { name: "mrp_100g", type: "DECIMAL(10,2) NULL" },
      { name: "price_250g", type: "DECIMAL(10,2) NULL" },
      { name: "mrp_250g", type: "DECIMAL(10,2) NULL" },
      { name: "price_500g", type: "DECIMAL(10,2) NULL" },
      { name: "mrp_500g", type: "DECIMAL(10,2) NULL" },
      { name: "nutrition_facts", type: "TEXT NULL" },
      { name: "ingredients", type: "TEXT NULL" },
      { name: "how_to_use", type: "TEXT NULL" }
    ];

    for (const field of fieldsToAdd) {
      try {
        await connection.query(`ALTER TABLE products ADD COLUMN ${field.name} ${field.type}`);
        console.log(`Database Schema Upgrade: ${field.name} added to products.`);
      } catch (err) {
        // Ignore if already exists
      }
    }

    console.log("Database schema checks completed successfully.");
  } catch (error) {
    console.error("Error during database schema upgrade:", error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 5000;
upgradeDatabaseSchema().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error("Database upgrade error:", err);
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT} (fallback without DB upgrade verification)`);
  });
});
