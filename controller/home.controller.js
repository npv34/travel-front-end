const qs = require('qs');
const url = require('url')
const cities = require("../data/city");
const JenaService = require("../service/jena.service");

class HomeController  {

    jenaService;

    constructor() {
        this.jenaService = new JenaService();
    }

    showHomePage(req, res, next) {
        res.render('home', {data: cities})
    }

    showPageLocation(req, res, next)  {
        let location = qs.parse(url.parse(req.url).query)
        res.render('location',{ city: location})
    }

    search(req, res, next) {
        let keyword = req.query.keyword;
        this.jenaService.findByKeyword(keyword).then(r => {
            let results = r.results.bindings
            res.render('search', {data: results})
        }).catch(err => {
            console.log(err.message)
        });
    }

    getDetailLocation(req, res, next) {
        let name = req.query.name;
        this.jenaService.getDetail(name).then(r => {
            console.log(r.results.bindings)
            res.end()
        })
    }


}

module.exports = HomeController
