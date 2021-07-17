const urlmodel = require("./model")

function getUrl(req, res) {
    res.json({
        msg: "hey"
    })
}

function Posturl(req, res) {
    console.log(req.body.url)
    var short_url = Math.floor(Math.random() * 100);

    const newPost = new urlmodel({
        original_url: req.body.url,
        short_url: short_url
    })

    newPost
        .save()
        .then(function (data) {
            res.json(data);
            console.log("Successfully created");
        })
        .catch(function (err) {
            console.log("error is>>>>>", err);
        });
        console.log(req.body)

}
module.exports = {
    Posturl,
    getUrl
};