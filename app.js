const express = require('express');
const HomeController = require("./controller/home.controller");
const app = express();
const port = 3000;

app.use(express.static('public'))
app.set('view engine', 'ejs')
app.set('views', './views')

let homeController =  new HomeController()
app.get('/', (req, res, next) => {
    homeController.showHomePage(req, res, next)
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
