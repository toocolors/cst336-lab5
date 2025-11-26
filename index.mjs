// Imports
import express from 'express';
import mysql from 'mysql2/promise';

// Setup app
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

//for Express to get values using POST method
app.use(express.urlencoded({extended:true}));

//setting up database connection pool
const pool = mysql.createPool({
    host: "uc13jynhmkss3nve.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    user: "p7aa7s6tzbltwbel",
    password: "m44soeu3klikxe8c",
    database: "nhqpjxnataa2zuy1",
    connectionLimit: 10,
    waitForConnections: true
});

// Setup Routes
// Root
app.get('/', async (req, res) => {
    // Get Authors
    // Build SQL Statement
    let sqlAuthor = `
        SELECT authorId, firstName, lastName
        FROM q_authors
        ORDER BY lastName`;
    
    // Execute SQL
    const [authors] = await pool.query(sqlAuthor);

    // Get Authors
    // Build SQL Statement
    let sqlCategory = `
        SELECT DISTINCT category
        FROM q_quotes
        ORDER BY category`;
    
    // Execute SQL
    const [categories] = await pool.query(sqlCategory);
    
    // Render page
    res.render('index', {
        'authors': authors,
        'categories': categories
    });
}); // Root

// API Author ID
app.get('/api/author/:id', async (req, res) => {
    // get Author ID
    let authorId = req.params.id;

    // Get Author Information
    // Build SQL Statement
    let sql = `
        SELECT *
        FROM q_authors
        WHERE authorId = ?`;

    // Execute SQL
    const [rows] = await pool.query(sql, [authorId]);

    // Render Page
    res.send(rows);
}); // API Author ID

// dbTest
app.get("/dbTest", async(req, res) => {
   try {
        const [rows] = await pool.query("SELECT * FROM q_authors");
        res.send(rows);
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).send("Database error");
    }
});//dbTest

// searchByAuthor
app.get('/searchByAuthor', async (req, res) => {
    // Get authorId
    let userAuthorId = req.query.authorId;

    // Build SQL Statement
    let sql = `
        SELECT authorId, firstName, lastName, quote
        FROM q_quotes
        NATURAL JOIN q_authors
        WHERE authorId = ?`;
    let sqlParams = [userAuthorId];

    // Execute SQL
    const [rows] = await pool.query(sql, sqlParams);

    // Render Page
    res.render('results', {'quotes': rows});
}); // searchByAuthor

// searchByCategory
app.get('/searchByCategory', async (req, res) => {
    // Get authorId
    let userCategory = req.query.category;

    // Build SQL Statement
    let sql = `
        SELECT authorId, firstName, lastName, quote
        FROM q_quotes
        NATURAL JOIN q_authors
        WHERE category LIKE ?`;
    let sqlParams = [userCategory];

    // Execute SQL
    const [rows] = await pool.query(sql, sqlParams);

    // Render Page
    res.render('results', {'quotes': rows});
}); // searchByCategory

// searchByKeyword
app.get('/searchByKeyword', async (req, res) => {
    // Get keyword
    let keyword = req.query.keyword;
    
    // Build SQL Statement
    let sql = `
        SELECT authorId, firstName, lastName, quote
        FROM q_quotes
        NATURAL JOIN q_authors
        WHERE quote LIKE ?`;
    let sqlParams = [`%${keyword}%`];

    // Execute SQL
    const [rows] = await pool.query(sql, sqlParams);

    // Render page
    res.render('results', {'quotes': rows});
}); // searchByKeyword

// searchByLikes
app.get('/searchByLikes', async (req, res) => {
    // Get min and max
    let userMin = req.query.min;
    let userMax = req.query.max;
    
    // Build SQL Statement
    let sql = `
        SELECT authorId, firstName, lastName, quote
        FROM q_quotes
        NATURAL JOIN q_authors
        WHERE ? <= likes AND likes <= ?`;
    let sqlParams = [userMin, userMax];

    // Execute SQL
    const [rows] = await pool.query(sql, sqlParams);
    console.log(rows);

    // Render page
    res.render('results', {'quotes': rows});
}); // searchByLikes

// Listen on port 3000
app.listen(3000, () => {
   console.log('server started');
});

// Functions