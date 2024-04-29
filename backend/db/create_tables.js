// create_tables.js
const connection = require('./connection');

// Function to create Products table
function createProductsTable() {
  const createProductsTableSQL = `
    CREATE TABLE IF NOT EXISTS Products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        image VARCHAR(500),
        category VARCHAR(255) NOT NULL,
        stock INT NOT NULL
    );
  `;

  connection.query(createProductsTableSQL, (err, results) => {
    if (err) {
      console.error('Error creating Products table:', err);
    } else {
      console.log('Products table created successfully');
    }
  });
}

// Function to insert initial data into Products table
function insertIntoProductsTable() {
  const productsData = [
    { 
      id: 1, name: 'Lounge Chair', price: 2000.00, 
      image: "https://media.istockphoto.com/id/1298089431/vector/white-armchair-with-wooden-legs-realistic-vector-armchair-in-the-loft-style-separate-on-a.jpg?s=612x612&w=0&k=20&c=kOR2f0Ft_j96a-FBGaVDgYLRcmepDnacLsUR6jOh2yk=",
      category: 'Chair', stock: 10 },
    { 
      id: 2, name: 'Dining Chair', price: 1800.00, 
      image: "https://www.luluhypermarket.com/cdn-cgi/image/f=auto/medias/1767425-01.jpg-1200Wx1200H?context=bWFzdGVyfGltYWdlc3wxMDgwMzF8aW1hZ2UvanBlZ3xhREE0TDJnMU5DOHhNRGc1TXpReE56SXhPREEzT0M4eE56WTNOREkxTFRBeExtcHdaMTh4TWpBd1YzZ3hNakF3U0F8OGFhYjkzMWU5ZTA1YmJkOWZmZmU5NTY3ZDkyY2UwMTZiNTRmYzhjMWUyY2M2M2IwOTcxMGIzYjZiNmYwNmY2Zg",
      category: 'Chair', stock: 10 },
    { 
      id: 3, name: 'Table1', price: 3000.00, 
      image: "https://www.viewmastercms.com/assets/VMAPP_Universal_Furniture/image/ic/orig/9866524.jpg",
      category: 'Table', stock: 10 },
    { 
      id: 4, name: 'Table2', price: 3200.00, 
      image:"https://media.istockphoto.com/id/941224542/vector/real-wood-table-on-a-white-background.jpg?s=612x612&w=0&k=20&c=SCiVjdgQ9dDPydMHrZYm2RZd0H-iew7uRCmkiNHyRWI=",
      category: 'Table', stock: 10 },
    { 
      id: 5, name: 'Table3', price: 3100.00, 
      image: "https://www.ulcdn.net/images/products/312898/slide/666x363/Arabia_Dining_Table_TK_4.jpg?1609230340",
      category: 'Table', stock: 10 },
    { 
      id: 6, name: 'Dining Top', price: 900.00, 
      image: "https://previews.123rf.com/images/sonandonures/sonandonures2101/sonandonures210100021/161837305-dining-table-and-chairs-isolated-on-white-background-luxury-and-modern-dining-table-sets-in.jpg",
      category: 'Top', stock: 10 }
  ];

  // SQL query to insert initial data
  const insertSQL = `
    INSERT INTO Products (id, name, price, image, category, stock)
    VALUES ?
    ON DUPLICATE KEY UPDATE id=id;
`;

  // Execute the SQL query to insert initial data
  connection.query(insertSQL, [productsData.map(product => [product.id, product.name, product.price, product.image, product.category, product.stock])], (err, results) => {
    if (err) {
      console.error('Error inserting initial data into Products table:', err);
    } else {
      console.log('Initial data inserted into Products table successfully');
    }
  });
}

// Function to create Users table
function createUsersTable() {
  const createUsersTableSQL = `
    CREATE TABLE IF NOT EXISTS Users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
    );
  `;

  connection.query(createUsersTableSQL, (err, results) => {
    if (err) {
      console.error('Error creating Users table:', err);
    } else {
      console.log('Users table created successfully');
    }
  });
}

// Function to create Orders table
function createOrdersTable() {
  const createOrdersTableSQL = `
    CREATE TABLE IF NOT EXISTS Orders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        amount DECIMAL(10, 2) NOT NULL,
        user_id INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES Users(id)
    );
  `;

  connection.query(createOrdersTableSQL, (err, results) => {
    if (err) {
      console.error('Error creating Orders table:', err);
    } else {
      console.log('Orders table created successfully');
    }
  });
}

// Function to create Order_Chairs table
function createOrderChairsTable() {
  const createOrderChairsTableSQL = `
    CREATE TABLE IF NOT EXISTS Order_Chairs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        order_id INT,
        chair_id INT,
        FOREIGN KEY (order_id) REFERENCES Orders(id),
        FOREIGN KEY (chair_id) REFERENCES Products(id)
    );
  `;

  connection.query(createOrderChairsTableSQL, (err, results) => {
    if (err) {
      console.error('Error creating Order_Chairs table:', err);
    } else {
      console.log('Order_Chairs table created successfully');
    }
  });
}

// Function to create Order_Tables table
function createOrderTablesTable() {
  const createOrderTablesTableSQL = `
    CREATE TABLE IF NOT EXISTS Order_Tables (
        id INT AUTO_INCREMENT PRIMARY KEY,
        order_id INT,
        table_id INT,
        FOREIGN KEY (order_id) REFERENCES Orders(id),
        FOREIGN KEY (table_id) REFERENCES Products(id)
    );
  `;

  connection.query(createOrderTablesTableSQL, (err, results) => {
    if (err) {
      console.error('Error creating Order_Tables table:', err);
    } else {
      console.log('Order_Tables table created successfully');
    }
  });
}

// Function to create Order_Tops table
function createOrderTopsTable() {
  const createOrderTopsTableSQL = `
    CREATE TABLE IF NOT EXISTS Order_Tops (
        id INT AUTO_INCREMENT PRIMARY KEY,
        order_id INT,
        top_id INT,
        FOREIGN KEY (order_id) REFERENCES Orders(id),
        FOREIGN KEY (top_id) REFERENCES Products(id)
    );
  `;

  connection.query(createOrderTopsTableSQL, (err, results) => {
    if (err) {
      console.error('Error creating Order_Tops table:', err);
    } else {
      console.log('Order_Tops table created successfully');
    }
  });
}

// Call the functions to create tables
createProductsTable();
insertIntoProductsTable();
createUsersTable();
createOrdersTable();
createOrderChairsTable();
createOrderTablesTable();
createOrderTopsTable();
