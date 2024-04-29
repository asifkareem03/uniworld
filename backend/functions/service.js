const connection = require('../db/connection');

const register = async (req, res) => {
    console.log('inside register function')
    const { name, email, password } = req.body;

    try {
        const sql = `INSERT INTO Users (name, email, password) VALUES (?, ?, ?)`;
        connection.query(sql, [name, email, password], (err, result) => {

            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(402).json({ error: 'User already exists' });
                }
                console.error('Error:', err);
                return res.status(500).json({ error: 'DB error' });
            }

            console.log('User inserted successfully');
            res.status(201).json({ message: 'User created successfully' });
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const login = async (req, res) => {
    console.log('inside login')
    const { email, password } = req.body;
    console.log(req.body)
    try {
        const sql = `SELECT * FROM Users WHERE email = ? AND password = ?`;

        connection.query(sql, [email, password], (err, result) => {

            if (err) {
                console.error('Error', err);
                return res.status(500).json({ error: 'DB Error' });
            }

            if (result.length === 0) {
                return res.status(400).json({ error: 'Invalid email or password' });
            }

            console.log("login successfull")
            res.status(200).json({ message: 'Login successful', user: result[0] });
        });
    } catch {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const getProducts = async (req, res) => {
    console.log('inside getProducts')
    try {
        const sql = `SELECT * FROM Products`;
        connection.query(sql, (err, result) => {
            if (err) {
                console.error('Error:', err);
                return res.status(500).json({ error: 'DB error' });
            }
            res.status(200).json({ products: result });
        });
    } catch {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const createOrder = async (req, res) => {
    const { userId, items } = req.body
    console.log('inside createOrder', userId)
    try {
        items.forEach(item => {
            console.log(item)
            const sql = `INSERT INTO Orders (amount, user_id) VALUES (?, ?)`;
            let orderId = null
            connection.query(sql, [item.total_amount, userId], (err, orderResult) => {
                if (err) {
                    console.error('Error:', err);
                    return res.status(500).json({ error: 'DB error' });
                }

                orderId = orderResult.insertId;
                console.log('inserted into Orders Table')
                let tableName = ''

                if (item.category === 'Chair') {
                    tableName = 'Order_Chairs';
                } else if (item.category === 'Table') {
                    tableName = 'Order_Tables';
                } else if (item.category === 'Top') {
                    tableName = 'Order_Tops';
                }

                const orderItemSQL = `INSERT INTO ${tableName} (order_id, ${item.category.toLowerCase()}_id) VALUES (?, ?)`;
                connection.query(orderItemSQL, [orderId, item.id], (err, result) => {
                    if (err) {
                        console.error(`Error inserting into ${tableName} table:`, err);
                        return res.status(500).json({ error: 'DB error' });
                    }
                    console.log(`inserted into ${tableName} Table`)
                    const updateStockSql = `UPDATE Products SET stock = stock - ? WHERE id = ?`;
                    connection.query(updateStockSql, [item.quantity, item.id], (err, result) => {
                        if (err) {
                            console.error(`Error inserting into ${tableName} table:`, err);
                            return res.status(500).json({ error: 'DB error' });
                        }
                        console.log(`Updated Products Table`)
                    });
                });
            });

        });
        res.status(200).json({ msg: "order placed successfully" });
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Internal server error' });
    }
}


module.exports = {
    register,
    login,
    getProducts,
    createOrder
}