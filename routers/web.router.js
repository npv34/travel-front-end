const express = require('express');
const HomeController = require("../controller/home.controller");
const router = express.Router();

let homeController =  new HomeController()

router.get('/', ((req, res, next) => {
    homeController.showHomePage(req, res, next)
}))

router.get('/location', ((req, res, next)=>{
    homeController.showPageLocation(req, res, next);
}))

router.get('/search', ((req, res, next)=>{
    homeController.search(req, res, next)
}))

router.get('/visited', ((req, res, next) => {
    homeController.getDetailLocation(req, res, next)
}))


module.exports = router;
