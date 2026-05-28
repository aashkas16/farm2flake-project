const pool = require('./db');

async function runMigration() {
  console.log('Starting reviews table database migration...');
  let connection;
  try {
    connection = await pool.getConnection();
    
    // Check if product_id column exists in reviews table
    const [columns] = await connection.query("SHOW COLUMNS FROM reviews");
    const hasProductId = columns.some(col => col.Field === 'product_id');
    
    if (!hasProductId) {
      console.log('product_id column not found in reviews table. Adding it now...');
      
      // 1. Add product_id column (allowing null or default for existing, but actually we should set product_id to an existing product if any exists)
      // First, get a default product ID to associate with any pre-existing reviews
      const [products] = await connection.query("SELECT id FROM products LIMIT 1");
      const defaultProductId = products.length > 0 ? products[0].id : 1;
      
      // 2. Add product_id column (temporary nullable, then fill, then make NOT NULL with Foreign Key)
      await connection.query("ALTER TABLE reviews ADD COLUMN product_id INT NULL");
      
      // 3. Update existing reviews to use defaultProductId
      await connection.query("UPDATE reviews SET product_id = ?", [defaultProductId]);
      
      // 4. Modify column to be NOT NULL and add foreign key
      await connection.query("ALTER TABLE reviews MODIFY COLUMN product_id INT NOT NULL");
      await connection.query(`
        ALTER TABLE reviews 
        ADD CONSTRAINT fk_reviews_product 
        FOREIGN KEY (product_id) REFERENCES products(id) 
        ON DELETE CASCADE
      `);
      
      console.log('Migration completed successfully! product_id column and foreign key constraint added.');
    } else {
      console.log('product_id column already exists in reviews table. No migration needed.');
    }
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    if (connection) connection.release();
    process.exit(0);
  }
}

runMigration();
