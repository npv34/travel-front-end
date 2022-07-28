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
            PREFIX etourism: <http://www.semanticweb.org/vinhpt13/ontologies/2022/5/etourism#>
            SELECT ?subject ?diachi
	        WHERE { ?subject
		    etourism:ten_goi "${name}";
		    etourism:dia_chi ?diachi;
            }`;
        let visited = await this.querySparql(query);
        return await this.querySparql(query)
    }

    async getLocationTravelAroundArea(subject) {
        const query = `
           PREFIX etourism: <http://www.semanticweb.org/vinhpt13/ontologies/2022/5/etourism#>
           SELECT ?subject ?tengoi ?diachi
	       WHERE { ?subject
		   etourism:o_gan etourism:HNI_Hồ_Hoàn_Kiếm;
		   rdf:type etourism:Điểm_đến;
		   etourism:ten_goi ?tengoi;
		   etourism:dia_chi ?diachi;
           }`;
        return await this.querySparql(query);
    }
}

module.exports = JenaService
