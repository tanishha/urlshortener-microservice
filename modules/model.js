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
}, {
    timestamps: true
});


// UrlSchema.path('original_url').validate((val) => {
//     urlRegex = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
//     return urlRegex.test(val);
// }, 'Invalid URL.');
module.exports = Mongoose.model("UrlModel", UrlSchema);
