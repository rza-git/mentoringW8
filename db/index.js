const fs = require("fs");
const pool = require("../config.js");

const seedQuery = fs.readFileSync("./seeding.sql", "utf-8")
console.log(seedQuery)

pool.query(seedQuery, (err, result) => {
    if(err) throw err

    console.log("Seeding successfully")
    // Matikan koneksi ke db
    pool.end()
})