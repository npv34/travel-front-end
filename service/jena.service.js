const SparqlClient = require('sparql-client');
const endpoint = 'http://localhost:3030/ds/sparql';

class JenaService {
    async findByKeyword(keyword) {
        const query = `
            PREFIX owl: <http://www.w3.org/2002/07/owl#>
            PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
            PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
            PREFIX etourism: <http://www.semanticweb.org/vinhpt13/ontologies/2022/5/etourism#>
            SELECT ?subject ?tengoi ?diachi
	        WHERE { ?subject
		    etourism:ten_goi ?tengoi;
		    etourism:dia_chi ?diachi;
            FILTER regex(?tengoi, "${keyword}")
            }`
        return await this.querySparql(query)
    }

    async findHotelByKeyword(keyword) {
        const query = `
            PREFIX etourism: <http://www.semanticweb.org/vinhpt13/ontologies/2022/5/etourism#>
            SELECT ?subject ?tengoi ?diachi ?sodienthoai ?trangweb ?danhgia ?soluongdanhgia
            WHERE { ?subject
            etourism:ten_goi ?tengoi;
            etourism:dia_chi ?diachi;
            etourism:so_dien_thoai ?sodienthoai;
            etourism:trang_web ?trangweb;
            etourism:danh_gia ?danhgia;
            etourism:so_luong_danh_gia ?soluongdanhgia;
            FILTER regex(?tengoi, "${keyword}")
            }`
        return await this.querySparql(query)
    }

    querySparql(query) {
        const client = new SparqlClient(endpoint);
        return new Promise((resolve, reject) => {
            client.query(query).execute((err, data) => {
                if (err) {
                    reject(err);
                }
                resolve(data)
            })
        })
    }

    async getDetail(name) {
        const query = `
            PREFIX owl: <http://www.w3.org/2002/07/owl#>
            PREFIX etourism: <http://www.semanticweb.org/vinhpt13/ontologies/2022/5/etourism#>
            SELECT ?subject ?diachi
	        WHERE { ?subject
		    etourism:ten_goi "${name}";
		    etourism:dia_chi ?diachi;
            }`;
        return await this.querySparql(query)
    }

    async getOtherNameVisited(subject) {
        const query = `
           PREFIX owl: <http://www.w3.org/2002/07/owl#>
           PREFIX etourism: <http://www.semanticweb.org/vinhpt13/ontologies/2022/5/etourism#>
           SELECT ?subject ?tengoi ?diachi
	       WHERE { ?subject
		   owl:sameAs etourism:${subject};
		   etourism:ten_goi ?tengoi;
		   etourism:dia_chi ?diachi;
           }`;
        return await this.querySparql(query);
    }

    async getLocationNearTheArea(subject) {
        const query = `
           PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
           PREFIX etourism: <http://www.semanticweb.org/vinhpt13/ontologies/2022/5/etourism#>
           SELECT ?subject ?tengoi ?diachi
	       WHERE { ?subject
		   etourism:o_gan etourism:${subject};
		   rdf:type etourism:??i???m_?????n;
		   etourism:ten_goi ?tengoi;
		   etourism:dia_chi ?diachi;
           }`;
        return await this.querySparql(query);
    }

    async getAccommodationFacility(subject) {
        const query = `
           PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
           PREFIX etourism: <http://www.semanticweb.org/vinhpt13/ontologies/2022/5/etourism#>
           SELECT ?subject ?tengoi ?diachi
	       WHERE { ?subject
		   etourism:o_gan etourism:${subject};
		   rdf:type etourism:Kh??ch_s???n;
		   etourism:ten_goi ?tengoi;
		   etourism:dia_chi ?diachi;
           }`;
        return await this.querySparql(query);
    }

    async nearbyEatingEstablishments(subject) {
        const query = `
           PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
           PREFIX etourism: <http://www.semanticweb.org/vinhpt13/ontologies/2022/5/etourism#>
           SELECT ?subject ?tengoi ?diachi
	       WHERE { ?subject
		   etourism:o_gan etourism:${subject};
		   rdf:type etourism:??n_u???ng;
		   etourism:ten_goi ?tengoi;
		   etourism:dia_chi ?diachi;
           }`;
        return await this.querySparql(query);
    }

    async getListShopping(subject) {
        const query = `
           PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
           PREFIX etourism: <http://www.semanticweb.org/vinhpt13/ontologies/2022/5/etourism#>
           SELECT ?subject ?tengoi ?diachi
	       WHERE { ?subject
		   etourism:o_gan etourism:${subject};
		   rdf:type etourism:Mua_s???m;
		   etourism:ten_goi ?tengoi;
		   etourism:dia_chi ?diachi;
           }`;
        return await this.querySparql(query);
    }
}

module.exports = JenaService
