const qs = require('qs');
const url = require('url')
const JenaService = require("../service/jena.service");

class HomeController  {

    jenaService;

    constructor() {
        this.jenaService = new JenaService();
    }

    async showHomePage(req, res, next) {
        let data = await this.jenaService.get_tinh_thanh();
        let listCity = data.results.bindings;
        res.render('home', {data: listCity})
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

            let dataNameQuanHuyen = await this.jenaService.get_name_quan_huyen(subject);
            let nameQuanHuyen = dataNameQuanHuyen.results.bindings[0].quanhuyen.value;

            let listLocationNearTheArea = await this.jenaService.getLocationNearTheArea(nameQuanHuyen);

            let listAccommodationFacility = await this.jenaService.getAccommodationFacility(nameQuanHuyen);
            let listAcF = listAccommodationFacility.results.bindings.splice(0,10);

            let listEating = await this.jenaService.nearbyEatingEstablishments(nameQuanHuyen);
            let listShopping = await this.jenaService.getListShopping(nameQuanHuyen)

            let data = {
                infoHotel: infoHotel,
                listLocationNearTheArea: listLocationNearTheArea.results.bindings.splice(0,10),
                listHotel: listAcF,
                listEating: listEating.results.bindings.splice(0,10),
                listShop: listShopping.results.bindings.splice(0,10)
            }

            res.render('hotelDetail', {data})
        } else {
            this.jenaService.findByKeyword(keyword).then(r => {
                let results = r.results.bindings
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

        let arrNameOther = [];

        nameOther.results.bindings.forEach(item => {
            arrNameOther.push(item.tengoi.value)
        })

        let dataNameQuanHuyen = await this.jenaService.get_name_quan_huyen(subject);
        let nameQuanHuyen = dataNameQuanHuyen.results.bindings[0].quanhuyen.value;
        // diem du lich o gan
        let listLocationNearTheArea = await this.jenaService.getLocationNearTheArea(nameQuanHuyen);

        let listAccommodationFacility = await this.jenaService.getAccommodationFacility(nameQuanHuyen);
        let listAcF = listAccommodationFacility.results.bindings.splice(0,10);

        let listEating = await this.jenaService.nearbyEatingEstablishments(nameQuanHuyen);
        let listShopping = await this.jenaService.getListShopping(nameQuanHuyen)

        let data = {
            nameVisited: name,
            addressVisited: address,
            nameOther: arrNameOther.toString(),
            listLocationNearTheArea: listLocationNearTheArea.results.bindings.splice(0,10),
            listHotel: listAcF,
            listEating: listEating.results.bindings.splice(0,10),
            listShop: listShopping.results.bindings.splice(0,10)
        }
        res.render('visited', {data})
    }

    async showPageDiemDen(req, res, next) {
        let r1 = await this.jenaService.get_loai_diem_den();
        let loai_diem_den = r1.results.bindings;
        let khuvuc = req.query.city;
        let r2 = await this.jenaService.get_khu_vuc(khuvuc);
        let danh_sach_khu_vuc = r2.results.bindings

        let r3 = await this.jenaService.get_danh_sach_o_gan(khuvuc)
        let danh_sach_o_gan = r3.results.bindings;

        let data = {
            listDiemDen: loai_diem_den,
            listKhuVuc: danh_sach_khu_vuc,
            listOGan: danh_sach_o_gan,
            city: khuvuc,
        }
        res.render('diem_den', {data})
    }

    async filterDiemDen(req, res, next) {
        let queryFilter = req.body;
        let r4 = await this.jenaService.loc_diem_den_filter(queryFilter.loai_diem_den, queryFilter.khu_vuc, queryFilter.o_gan);
        res.json(r4.results.bindings)
    }

    async showPageLuuTru(req, res, next) {
        let r1 = await this.jenaService.get_loai_luu_tru();
        let loai_diem_den = r1.results.bindings;
        let khuvuc = req.query.city;
        let r2 = await this.jenaService.get_khu_vuc(khuvuc);
        let danh_sach_khu_vuc = r2.results.bindings
        let r3 = await this.jenaService.get_danh_sach_o_gan(khuvuc)
        let danh_sach_o_gan = r3.results.bindings;
        let r4 = await this.jenaService.get_hang_sao();
        let danh_sach_hang_sao = r4.results.bindings;
        let r5 = await this.jenaService.get_danh_gia();
        let danh_sach_danh_gia = r5.results.bindings;

        let data = {
            listDiemDen: loai_diem_den,
            listKhuVuc: danh_sach_khu_vuc,
            listOGan: danh_sach_o_gan,
            listHangSao: danh_sach_hang_sao,
            listDanhgia: danh_sach_danh_gia,
            city: khuvuc,
        }
        res.render('luu_tru', {data})
    }

    async filterLuTru(req, res, next) {
        let queryFilter = req.body;
        let r4 = await this.jenaService.loc_luu_tru_filter(queryFilter.loai_luu_tru, queryFilter.khu_vuc, queryFilter.o_gan, queryFilter.danh_gia.replace('+', ""),  queryFilter.hang_sao);
        let dataFilter = r4.results.bindings
        res.json(dataFilter)
    }

    async getDetailLuuTrue(req, res, next) {
        let keyword = req.query.keyword;

        let r = await this.jenaService.findHotelByKeyword(keyword);

        let infoHotel = r.results.bindings[0];


        let subject = infoHotel.subject.value.split('#')[1];

        let dataNameQuanHuyen = await this.jenaService.get_name_quan_huyen(subject);
        let nameQuanHuyen = dataNameQuanHuyen.results.bindings[0].quanhuyen.value;

        let listLocationNearTheArea = await this.jenaService.getLocationNearTheArea(nameQuanHuyen);

        let listAccommodationFacility = await this.jenaService.getAccommodationFacility(nameQuanHuyen);
        let listAcF = listAccommodationFacility.results.bindings.splice(0,10);

        let listEating = await this.jenaService.nearbyEatingEstablishments(nameQuanHuyen);
        let listShopping = await this.jenaService.getListShopping(nameQuanHuyen)

        let data = {
            infoHotel: infoHotel,
            listLocationNearTheArea: listLocationNearTheArea.results.bindings.splice(0,10),
            listHotel: listAcF,
            listEating: listEating.results.bindings.splice(0,10),
            listShop: listShopping.results.bindings.splice(0,10)
        }

        res.render('hotelDetail', {data})
    }

    async showPageEating(req, res, next) {
        let location = qs.parse(url.parse(req.url).query);
        let r1 = await this.jenaService.get_loai('Ăn_uống');
        let r2 = await this.jenaService.get_khu_vuc(location.city);
        let danh_sach_khu_vuc = r2.results.bindings
        let r3 = await this.jenaService.get_danh_sach_o_gan(location.city)
        let danh_sach_o_gan = r3.results.bindings;
        let r5 = await this.jenaService.get_danh_gia();
        let danh_sach_danh_gia = r5.results.bindings;
        let data = {
            loai_hinh_an_uong: r1.results.bindings,
            listKhuVuc: danh_sach_khu_vuc,
            listOGan: danh_sach_o_gan,
            city: location.city,
            listDanhgia: danh_sach_danh_gia,
        }

        res.render('view_an_uong',{ data })
    }

    async filterAnUong(req, res, next) {
        let queryFilter = req.body;
        let r4 = await this.jenaService.loc_an_uong_filter(queryFilter.loai_an_uong, queryFilter.khu_vuc, queryFilter.o_gan, queryFilter.danh_gia.replace('+', ""));
        let dataFilter = r4.results.bindings
        res.json(dataFilter)
    }

    async showMuaSam(req, res, next) {
        let location = qs.parse(url.parse(req.url).query);
        let r1 = await this.jenaService.get_loai('Mua_sắm');
        let r2 = await this.jenaService.get_khu_vuc(location.city);
        let danh_sach_khu_vuc = r2.results.bindings
        let r3 = await this.jenaService.get_danh_sach_o_gan(location.city)
        let danh_sach_o_gan = r3.results.bindings;
        let data = {
            loai_hinh_an_uong: r1.results.bindings,
            listKhuVuc: danh_sach_khu_vuc,
            listOGan: danh_sach_o_gan,
            city: location.city,
        }

        res.render('mua_sam',{ data })
    }

    async filterMuaSam(req, res, next) {
        let queryFilter = req.body;
        let r4 = await this.jenaService.loc_mua_sam_filter(queryFilter.loai_mua_sam, queryFilter.khu_vuc, queryFilter.o_gan);
        let dataFilter = r4.results.bindings
        console.log(dataFilter)
        res.json(dataFilter)
    }

    async getDetaiMuaSam(req, res, next) {
        let name = req.query.name;
        let address = req.query.address;

        let r = await this.jenaService.getDetailMuaSam(name);

        let infoMuaSam = r.results.bindings[0];

        let subject = infoMuaSam.subject.value.split('#')[1];

        let dataNameQuanHuyen = await this.jenaService.get_name_quan_huyen(subject);

        let nameQuanHuyen = dataNameQuanHuyen.results.bindings[0].quanhuyen.value;

        let listLocationNearTheArea = await this.jenaService.getLocationNearTheArea(nameQuanHuyen);

        let listAccommodationFacility = await this.jenaService.getAccommodationFacility(nameQuanHuyen);
        let listAcF = listAccommodationFacility.results.bindings.splice(0,10);

        let listEating = await this.jenaService.nearbyEatingEstablishments(nameQuanHuyen);
        let listShopping = await this.jenaService.getListShopping(nameQuanHuyen)

        let data = {
            infoMuaSam: infoMuaSam,
            nameVisited: name,
            addressVisited: address,
            listLocationNearTheArea: listLocationNearTheArea.results.bindings.splice(0,10),
            listHotel: listAcF,
            listEating: listEating.results.bindings.splice(0,10),
            listShop: listShopping.results.bindings.splice(0,10)
        }

        res.render('muasam_detail', {data})
    }

    async getEatingDetails(req, res, next) {
        let name = req.query.name;
        let address = req.query.address;

        let r = await this.jenaService.getAnUongDetail(name);

        let infoAnUong = r.results.bindings[0];

        let subject = infoAnUong.subject.value.split('#')[1];

        let dataNameQuanHuyen = await this.jenaService.get_name_quan_huyen(subject);

        let nameQuanHuyen = dataNameQuanHuyen.results.bindings[0].quanhuyen.value;

        let listLocationNearTheArea = await this.jenaService.getLocationNearTheArea(nameQuanHuyen);

        let listAccommodationFacility = await this.jenaService.getAccommodationFacility(nameQuanHuyen);
        let listAcF = listAccommodationFacility.results.bindings.splice(0,10);

        let listEating = await this.jenaService.nearbyEatingEstablishments(nameQuanHuyen);
        let listShopping = await this.jenaService.getListShopping(nameQuanHuyen)

        let data = {
            infoAnUong: infoAnUong,
            nameVisited: name,
            addressVisited: address,
            listLocationNearTheArea: listLocationNearTheArea.results.bindings.splice(0,10),
            listHotel: listAcF,
            listEating: listEating.results.bindings.splice(0,10),
            listShop: listShopping.results.bindings.splice(0,10)
        }

        res.render('an_uong_detail', {data})
    }
}

module.exports = HomeController
