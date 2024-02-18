const sqlite3 = require("sqlite3")
const sqlite = require("sqlite")
const path = require("path")

// Async connection 
async function sqliteConnection() {
    const database = await sqlite.open({
        filename: path.resolve(__dirname, "..", "database.db"), //__dirname (local where i am)
        driver: sqlite3.Database
    })

    return database
}

module.exports = sqliteConnection

// DBMS - Data Base Management System