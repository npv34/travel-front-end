const express = require('express');
const router = require('./routers/web.router');
const bodyParser = require('body-parser');
const app = express();
const port = 3001;

app.use(express.static('public'))
app.set('view engine', 'ejs')
app.set('views', './views')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', router)

app.use((req, res,next)=>{
    res.status(404).send('<h1> Page not found </h1>');
});
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
