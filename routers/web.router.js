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
    homeController.search(req, res, next).catch(err => console.log(err))
}))

router.get('/visited', ((req, res, next) => {
    homeController.getDetailLocation(req, res, next)
}))

router.get('/destination', ((req, res, next) => {
    homeController.showPageDiemDen(req, res, next)
}))

router.post('/destination/filter', ((req, res, next) => {
    homeController.filterDiemDen(req, res, next)
}))

router.get('/stay', ((req, res, next) => {
    homeController.showPageLuuTru(req, res, next)
}))

router.post('/stay/filter', ((req, res, next) => {
    homeController.filterLuTru(req, res, next)
}))

router.get('/stay/detail', ((req, res, next) => {
    homeController.getDetailLuuTrue(req, res, next)
}))

router.get('/eating', ((req, res, next) => {
    homeController.showPageEating(req, res, next)
}))

router.get('/eating/detail', ((req, res, next) => {
    homeController.getEatingDetails(req, res, next)
}))

router.post('/eating/filter', ((req, res, next) => {
    homeController.filterAnUong(req, res, next)
}))


router.post('/paying/filter', ((req, res, next) => {
    homeController.filterMuaSam(req, res, next)
}))
router.get('/paying', ((req, res, next) => {
    homeController.showMuaSam(req, res, next).catch(err => console.log(err))
}))

router.get('/paying/detail', ((req, res, next) => {
    homeController.getDetaiMuaSam(req, res, next)
}))

module.exports = router;
