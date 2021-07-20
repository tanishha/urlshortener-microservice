//schema definition
var Mongoose = require('mongoose');
const UrlSchema = new Mongoose.Schema({
    original_url: {
        type: String,
        required:true
    },
    short_url: {
        type: Number,
        unique: true
    },
});
module.exports = Mongoose.model("UrlModel", UrlSchema);
