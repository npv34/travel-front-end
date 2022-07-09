const fs = require('fs');

class HomeController  {
    showHomePage(req, res, next) {
       res.render('home')
    }
}

module.exports = HomeController
