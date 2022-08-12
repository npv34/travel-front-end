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
            etourism:quan_huyen "${subject}";
            rdf:type etourism:Điểm_đến;
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
		           etourism:quan_huyen "${subject}";
		           rdf:type etourism:Lưu_trú;
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
		           etourism:quan_huyen "${subject}";
		           rdf:type etourism:Ăn_uống;
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
		           etourism:quan_huyen "${subject}";
		           rdf:type etourism:Mua_sắm;
		           etourism:ten_goi ?tengoi;
		           etourism:dia_chi ?diachi;
                           }
`;
        return await this.querySparql(query);
    }

    async get_name_quan_huyen(subject) {
        const query = `
           PREFIX etourism: <http://www.semanticweb.org/vinhpt13/ontologies/2022/5/etourism#>
           SELECT ?quanhuyen
	       WHERE { etourism:${subject} etourism:quan_huyen ?quanhuyen}
            `;
        return await this.querySparql(query);
    }

    async  get_tinh_thanh() {
        const query = `
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        PREFIX etourism: <http://www.semanticweb.org/vinhpt13/ontologies/2022/5/etourism#>
        SELECT ?subject ?name
	    WHERE { ?subject rdfs:subClassOf etourism:Địa_chỉ}
        `;
        return await this.querySparql(query);
    }

    async get_loai_diem_den() {
        const query = `
            PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
            PREFIX etourism: <http://www.semanticweb.org/vinhpt13/ontologies/2022/5/etourism#>
            SELECT ?subject
            WHERE { ?subject rdfs:subClassOf etourism:Điểm_đến}
        `;
        return await this.querySparql(query);
    }

    async get_khu_vuc(khuvuc) {
        const query = `
            PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
            PREFIX etourism: <http://www.semanticweb.org/vinhpt13/ontologies/2022/5/etourism#>
            SELECT ?subject
            WHERE { ?subject rdfs:subClassOf etourism:${khuvuc}}
        `;
        return await this.querySparql(query);
    }

    async get_danh_sach_o_gan(khuvuc) {
        const query = `
            PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
            PREFIX etourism: <http://www.semanticweb.org/vinhpt13/ontologies/2022/5/etourism#>
            SELECT ?subject
	        WHERE { ?subject rdfs:subClassOf etourism:Ở_gần_${khuvuc}
            }`;
        return await this.querySparql(query);
    }

    async loc_diem_den_filter(loai_diem_den, khu_vuc, o_gan) {
        let query = ''
        if (o_gan) {
            query = `
                PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
                PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
                PREFIX etourism: <http://www.semanticweb.org/vinhpt13/ontologies/2022/5/etourism#>
                SELECT ?subject ?tengoi ?diachi
                WHERE { ?subject 
                        rdf:type etourism:${loai_diem_den}, etourism:${khu_vuc};
                        etourism:o_gan etourism:HNI_${o_gan};
                        etourism:ten_goi ?tengoi;
                        etourism:dia_chi ?diachi;
                }`;
        } else {
            query = `
                PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
                PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
                PREFIX etourism: <http://www.semanticweb.org/vinhpt13/ontologies/2022/5/etourism#>
                SELECT ?subject ?tengoi ?diachi
                WHERE { ?subject 
                        rdf:type etourism:${loai_diem_den}, etourism:${khu_vuc};
                        etourism:ten_goi ?tengoi;
                        etourism:dia_chi ?diachi;
                }`;
        }
        return await this.querySparql(query);
    }

    async get_loai_luu_tru() {
        const query = `
            PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
            PREFIX etourism: <http://www.semanticweb.org/vinhpt13/ontologies/2022/5/etourism#>
            SELECT ?subject
            WHERE { ?subject rdfs:subClassOf etourism:Lưu_trú}
        `;
        return await this.querySparql(query);
    }

    async get_hang_sao() {
        const query = `
            PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
            PREFIX etourism: <http://www.semanticweb.org/vinhpt13/ontologies/2022/5/etourism#>
            SELECT ?subject
            WHERE { ?subject rdfs:subClassOf etourism:Hạng_sao}
        `;
        return await this.querySparql(query);
    }

    async get_danh_gia() {
        const query = `
            PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
            PREFIX etourism: <http://www.semanticweb.org/vinhpt13/ontologies/2022/5/etourism#>
            SELECT ?subject
            WHERE { ?subject rdfs:subClassOf etourism:Đánh_giá}
        `;
        return await this.querySparql(query);
    }

    async loc_luu_tru_filter(loai_luu_tru, khu_vuc, o_gan, danh_gia, hang_sao) {
        let query = ''

        if (o_gan) {
            query = `
            PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
            PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
            PREFIX etourism: <http://www.semanticweb.org/vinhpt13/ontologies/2022/5/etourism#>
            SELECT ?subject ?tengoi ?diachi ?dienthoai ?trangweb ?danhgia ?soluongdanhgia
            WHERE { ?subject 
                rdf:type etourism:${loai_luu_tru}, etourism:${khu_vuc};
                etourism:hang_sao "${hang_sao}";
                etourism:o_gan etourism:HNI_${o_gan};
                etourism:ten_goi ?tengoi;
                etourism:dia_chi ?diachi;
                etourism:so_dien_thoai ?dienthoai;
                etourism:trang_web ?trangweb;
                etourism:danh_gia ?danhgia;
                etourism:so_luong_danh_gia ?soluongdanhgia;
                FILTER (?danhgia >${danh_gia})
            }`;
        } else {
            query = `
            PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
            PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
            PREFIX etourism: <http://www.semanticweb.org/vinhpt13/ontologies/2022/5/etourism#>
            SELECT ?subject ?tengoi ?diachi ?dienthoai ?trangweb ?danhgia ?soluongdanhgia
            WHERE { ?subject 
                rdf:type etourism:${loai_luu_tru}, etourism:${khu_vuc};
                etourism:hang_sao "${hang_sao}";
                etourism:ten_goi ?tengoi;
                etourism:dia_chi ?diachi;
                etourism:so_dien_thoai ?dienthoai;
                etourism:trang_web ?trangweb;
                etourism:danh_gia ?danhgia;
                etourism:so_luong_danh_gia ?soluongdanhgia;
                FILTER (?danhgia >${danh_gia})
            }`;
        }
        return await this.querySparql(query);
    }

    async get_loai(name) {
        const query = `
            PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
            PREFIX etourism: <http://www.semanticweb.org/vinhpt13/ontologies/2022/5/etourism#>
            SELECT ?subject
            WHERE { ?subject rdfs:subClassOf etourism:${name}}
        `;
        return await this.querySparql(query);
    }

    async loc_an_uong_filter(loai_an_uong, khu_vuc, o_gan, danh_gia) {
        let query = ""
        if (o_gan) {
            query = `
            PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
            PREFIX etourism: <http://www.semanticweb.org/vinhpt13/ontologies/2022/5/etourism#>
            SELECT ?subject ?tengoi ?diachi ?dienthoai ?danhgia ?soluongdanhgia
            WHERE { ?subject 
                rdf:type etourism:${loai_an_uong}, etourism:${khu_vuc};
                etourism:o_gan etourism:HNI_${o_gan};
                etourism:ten_goi ?tengoi;
                etourism:dia_chi ?diachi;
                etourism:so_dien_thoai ?dienthoai;
                etourism:danh_gia ?danhgia;
                etourism:so_luong_danh_gia ?soluongdanhgia;
                FILTER (?danhgia >${danh_gia})
        }`;
        } else {
            query = `
            PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
            PREFIX etourism: <http://www.semanticweb.org/vinhpt13/ontologies/2022/5/etourism#>
            SELECT ?subject ?tengoi ?diachi ?dienthoai ?danhgia ?soluongdanhgia
            WHERE { ?subject 
                rdf:type etourism:${loai_an_uong}, etourism:${khu_vuc};
                etourism:ten_goi ?tengoi;
                etourism:dia_chi ?diachi;
                etourism:so_dien_thoai ?dienthoai;
                etourism:danh_gia ?danhgia;
                etourism:so_luong_danh_gia ?soluongdanhgia;
                FILTER (?danhgia >${danh_gia})
            }`;
        }
        return await this.querySparql(query);
    }

    async loc_mua_sam_filter(loai_mua_sam, khu_vuc, o_gan) {
        let query = ""
        if (o_gan) {
            query = `
            PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
            PREFIX etourism: <http://www.semanticweb.org/vinhpt13/ontologies/2022/5/etourism#>
            SELECT ?subject ?tengoi ?diachi ?dienthoai
            WHERE { ?subject 
                        rdf:type etourism:${loai_mua_sam}, etourism:${khu_vuc};
                        etourism:o_gan etourism:HNI_${o_gan};
                        etourism:ten_goi ?tengoi;
                        etourism:dia_chi ?diachi;
                        etourism:so_dien_thoai ?dienthoai;
            }`
        } else {
            query = `
            PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
            PREFIX etourism: <http://www.semanticweb.org/vinhpt13/ontologies/2022/5/etourism#>
            SELECT ?subject ?tengoi ?diachi ?dienthoai
            WHERE { ?subject 
                        rdf:type etourism:${loai_mua_sam}, etourism:${khu_vuc};
                        etourism:ten_goi ?tengoi;
                        etourism:dia_chi ?diachi;
                        etourism:so_dien_thoai ?dienthoai;
            }`
        }
        return await this.querySparql(query);
    }

    async getDetailMuaSam(name) {
        const query = `
            PREFIX owl: <http://www.w3.org/2002/07/owl#>
            PREFIX etourism: <http://www.semanticweb.org/vinhpt13/ontologies/2022/5/etourism#>
            SELECT ?subject ?diachi ?sodienthoai
	        WHERE { ?subject
		    etourism:ten_goi "${name}";
		    etourism:dia_chi ?diachi;
		    etourism:so_dien_thoai ?sodienthoai;
            }`;
        return await this.querySparql(query)
    }

    async getAnUongDetail(name) {
        const query = `
            PREFIX owl: <http://www.w3.org/2002/07/owl#>
            PREFIX etourism: <http://www.semanticweb.org/vinhpt13/ontologies/2022/5/etourism#>
            SELECT ?subject ?diachi ?sodienthoai ?danhgia ?soluongdanhgia
                WHERE { ?subject
                    etourism:ten_goi "${name}";
                    etourism:dia_chi ?diachi;
                    etourism:so_dien_thoai ?sodienthoai;
                    etourism:danh_gia ?danhgia;
                    etourism:so_luong_danh_gia ?soluongdanhgia;
            }`;
        return await this.querySparql(query)
    }

}

module.exports = JenaService
