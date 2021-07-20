const urlmodel = require("./model")
var validUrl = require('valid-url');

function Posturl(req, res) {
    const original_url = req.body.url
    if (validUrl.isUri(original_url)) {
        urlmodel.findOne({
            original_url
        }).exec(function (err, url) {
            if (err) {
                return err
            }
            if (!url) {
                var short_url = Math.floor(Math.random() * 100);
                const newPost = new urlmodel({
                    original_url: original_url,
                    short_url: short_url
                })
                newPost
                    .save()
                    .then(function (data) {
                        res.status(200).json({
                            original_url: data.original_url,
                            short_url: data.short_url
                        });
                    })
                    .catch(function (err) {
                        console.log("error is>>", err);
                    });
            } else {
                res.json({
                    original_url: url.original_url,
                    short_url: url.short_url
                })
            }
        })

    } else {
        res.json({
            error: "Invalid URL"
        })
    }
}

function getPage(req, res) {
    const short_url = req.params.id
    if (isNaN(short_url)) {
        res.json({
            error: "Wrong format"
        })
    } else {
        urlmodel.findOne({
            short_url
        }).exec(function (err, data) {
            if (err) {
                return err
            }
            if (data) {
                res.redirect(data.original_url)
            } else {
                res.json({
                    error: "No short URL found for the given input"
                })
            }
        })
    }
}
module.exports = {
    Posturl,
    getPage
};