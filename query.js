const pool = require("./config.js");
const express = require("express");
const router = express.Router();

// Rest API

// GET, POST, PUT, DELETE, PATCH

// GET = menampilkan data
// POST = create data
// PUT = update data
// DELETE = delete data
// PATCH = update sebagian field dari data (JARANG DIPAKAI)

// Status code
// 200 ==> berhasil / OK
// 201 ==> berhasil tercreate
// 400 ==> BAD request
// 404 ==> NOT FOUND
// 401 ==> Unauthorized


// Table Games

// -- Find All games

// http://localhost:3000/games
router.get("/games", (req, res) => {

    const query = `
        SELECT 
           games.id AS id,
           games.title AS title,
           games.year AS year,
           dev.name AS developers,
           games.created_at AS created_at,
           games.updated_at AS updated_at
        FROM games
            INNER JOIN developers AS dev
                ON dev.id = games.dev_id

    `

    pool.query(query, (err, response) => {
        if(err) throw err

        res.status(200).json(response.rows)
    })
})

router.get("/games/:id", (req, res) => {
    const {id} = req.params;

    const findQuery = `
        SELECT 
            *
        FROM games
            WHERE id = $1
    `

    // $ ==> MENCEGAH HACKING
    // Menggunakan teknik SQL INJECTION

    pool.query(findQuery, [id], (err, response) => {
        if(err) throw err

        res.status(200).json(response.rows[0])
    })
})

router.post("/games", (req, res) => {
    console.log(req.body);
    const {title, year, dev_id} = req.body;
    const insertQuery = `
        INSERT INTO games (title, year, dev_id)
            VALUES
            ($1, $2, $3)

    `

    pool.query(insertQuery, [title, year, dev_id], (err, response) => {
        if (err) throw err

        res.status(201).json({
            message: "Games created successfully"
        })
    })
})

// Update data
router.put("/games/:id", (req, res) => {
    const {id} = req.params;
    const {title, year} = req.body;

    const updateQuery = `
        UPDATE games
        SET title = $1,
            year = $2
        WHERE id = $3;
    `

    pool.query(updateQuery, [title, year, id], (err, response) => {
        if(err) throw err

        res.status(200).json({
            message: "Games updated successfully"
        })
    })
})

// Delete Games

router.delete("/games/:id", (req, res) => {
    const {id} = req.params

    // Cari object gamesnya dulu
    // Kalo ketemu --> DELETE
    // Kalo ga ketemu --> Error Not Found

    const findQuery = `
        SELECT 
            *
        FROM games
            WHERE id = $1
    `

    pool.query(findQuery, [id], (err, response) => {
        if(err) throw err

        // Kalo ada response, delete
        if(response.rows[0]) {
            // DELETE

            const deleteQuery = `
                DELETE FROM games
                WHERE id = $1;
            `

            pool.query(deleteQuery, [id], (err, response) => {
                if(err) throw err

                res.status(200).json({
                    message: "Deleted successfully"
                })
            })

        } else {
            // Kalo ga ada, error not found
            res.status(404).json({
                message: "Games Not Found"
            })
        }

    })
})

// Table Developers

router.get("/devs", (req, res) => {

    const findQuery = `
        SELECT * FROM developers;
    `

    pool.query(findQuery, (err, response) => {
        if(err) throw err

        res.status(200).json(response.rows)
    })
})





module.exports = router;