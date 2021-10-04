const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "vjeverica",
    host: "localhost",
    port: 5432,
    database: "ask_it"
});

module.exports = pool;