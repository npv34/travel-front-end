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

    async search(req, res, next) {
        let keyword = req.query.keyword;
        if (keyword.includes('Khách Sạn')) {
            let r = await this.jenaService.findHotelByKeyword(keyword);

            let infoHotel = r.results.bindings[0];

            let subject = infoHotel.subject.value.split('#')[1];

            let listLocationNearTheArea = await this.jenaService.getLocationNearTheArea(subject);

            let listAccommodationFacility = await this.jenaService.getAccommodationFacility(subject);
            let listAcF = listAccommodationFacility.results.bindings.splice(0,10);

            let listEating = await this.jenaService.nearbyEatingEstablishments(subject);
            let listShopping = await this.jenaService.getListShopping(subject)

            let data = {
                infoHotel: infoHotel,
                listLocationNearTheArea: listLocationNearTheArea.results.bindings,
                listHotel: listAcF,
                listEating: listEating.results.bindings,
                listShop: listShopping.results.bindings
            }

            res.render('hotelDetail', {data})
        } else {
            this.jenaService.findByKeyword(keyword).then(r => {
                let results = r.results.bindings
               // results = [...new Map(results.map((item, key) => [item.tengoi.value, item])).values()]
                res.render('search', {data: results})
            }).catch(err => {
                console.log(err.message)
            });
        }
    }

    async getDetailLocation(req, res, next) {
        let name = req.query.name;
        let address = req.query.address;
        let visited = await this.jenaService.getDetail(name);

        let subject = visited.results.bindings[0].subject.value.split('#')[1]

        // ten goi khac
        let nameOther = await this.jenaService.getOtherNameVisited(subject);

        let arrNameOther = []

        nameOther.results.bindings.forEach(item => {
            arrNameOther.push(item.tengoi.value)
        })
        // diem du lich o gan
        let listLocationNearTheArea = await this.jenaService.getLocationNearTheArea(subject);

        let listAccommodationFacility = await this.jenaService.getAccommodationFacility(subject);
        let listAcF = listAccommodationFacility.results.bindings.splice(0,10);

        let listEating = await this.jenaService.nearbyEatingEstablishments(subject);
        let listShopping = await this.jenaService.getListShopping(subject)

        let data = {
            nameVisited: name,
            addressVisited: address,
            nameOther: arrNameOther.toString(),
            listLocationNearTheArea: listLocationNearTheArea.results.bindings,
            listHotel: listAcF,
            listEating: listEating.results.bindings,
            listShop: listShopping.results.bindings
        }
        res.render('visited', {data})
    }

}

module.exports = HomeController
