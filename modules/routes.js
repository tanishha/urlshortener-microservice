const Router= require("express").Router();
const urlCtrl=require('./controller')

Router.route("/shorturl").post(urlCtrl.Posturl)
Router.route("/shorturl/:id").get(urlCtrl.getPage)

module.exports = Router;
