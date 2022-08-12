const express = require('express');
const HomeController = require("../controller/home.controller");
const router = express.Router();

let homeController =  new HomeController()

router.get('/', ((req, res, next) => {
    homeController.showHomePage(req, res, next).catch(err => {
        res.redirect('/error')
    })
}))

router.get('/location', ((req, res, next)=>{
    homeController.showPageLocation(req, res, next);
}))

router.get('/search', ((req, res, next)=>{
    homeController.search(req, res, next).catch(err => {
        res.redirect('/error')
    })
}))

router.get('/visited', ((req, res, next) => {
    homeController.getDetailLocation(req, res, next).catch(err => {
        res.redirect('/error')
    })
}))

router.get('/destination', ((req, res, next) => {
    homeController.showPageDiemDen(req, res, next).catch(err => {
        res.redirect('/error')
    })
}))

router.post('/destination/filter', ((req, res, next) => {
    homeController.filterDiemDen(req, res, next).catch(err => {
        res.redirect('/error')
    })
}))

router.get('/stay', ((req, res, next) => {
    homeController.showPageLuuTru(req, res, next).catch(err => {
        res.redirect('/error')
    })
}))

router.post('/stay/filter', ((req, res, next) => {
    homeController.filterLuTru(req, res, next).catch(err => {
        res.redirect('/error')
    })
}))

router.get('/stay/detail', ((req, res, next) => {
    homeController.getDetailLuuTrue(req, res, next).catch(err => {
        res.redirect('/error')
    })
}))

router.get('/eating', ((req, res, next) => {
    homeController.showPageEating(req, res, next).catch(err => {
        res.redirect('/error')
    })
}))

router.get('/eating/detail', ((req, res, next) => {
    homeController.getEatingDetails(req, res, next).catch(err => {
        res.redirect('/error')
    })
}))

router.post('/eating/filter', ((req, res, next) => {
    homeController.filterAnUong(req, res, next).catch(err => {
        res.redirect('/error')
    })
}))

router.post('/paying/filter', ((req, res, next) => {
    homeController.filterMuaSam(req, res, next).catch(err => {
        res.redirect('/error')
    })
}))

router.get('/paying', ((req, res, next) => {
    homeController.showMuaSam(req, res, next).catch(err => {
        res.redirect('/error')
    })
}))

router.get('/paying/detail', ((req, res, next) => {
    homeController.getDetaiMuaSam(req, res, next).catch(err => {
        res.redirect('/error')
    })
}))

router.get('/error', (req, res, next) => {
    res.render('500')
})

module.exports = router;
