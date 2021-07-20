require('dotenv').config();

const dbconxnUrl = process.env.DATABASE_URL;

module.exports = {
    dbconxnUrl
}