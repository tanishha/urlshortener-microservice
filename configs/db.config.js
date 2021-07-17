const mongodb = require('mongodb');
const env = require('./envConfig')

const MongoClient = mongodb.MongoClient;
const conxnUrl = env.dbconxnUrl;
const dbName = 'urlShortner';
module.exports = {
    MongoClient,
    conxnUrl,
    dbName,
    oid: mongodb.ObjectID
}