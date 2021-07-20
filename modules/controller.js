const urlmodel = require("./model")

function getUrl(req, res) {
    res.json({
        msg: "hey"
    })
}

function Posturl(req, res) {
    const original_url = req.body.url
    var short_url = Math.floor(Math.random() * 100);
    urlmodel.findOne({
        original_url
    }).exec(function (err, url) {
        if (err) {
            return next(err)
        }
        if (!url) {
            console.log("check data", original_url)
            const newPost = new urlmodel({
                original_url: original_url,
                short_url: short_url
            })
            newPost
                .save()
                .then(function (data) {
                    res.status(200).json(data);
                    console.log("Successfully created");
                })
                .catch(function (err) {
                    console.log("error is>>>>>", err);
                });
        } else {
            res.json(url)
        }
    })
}
module.exports = {
    Posturl,
    getUrl
};


//*TODO : check db, validate url , redirect