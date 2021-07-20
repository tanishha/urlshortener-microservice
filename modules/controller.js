const urlmodel = require("./model")
const dns = require('dns');

function Posturl(req, res) {
    const original_url = req.body.url
    const urlObject = new URL(original_url);
    dns.lookup(urlObject.hostname, function(err) {
        if (err) {
            res.json({
                error: "invalid url"
            })
        } else {
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
        }
    })

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


//*TODO : validate url 