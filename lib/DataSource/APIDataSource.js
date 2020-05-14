const axios = require('axios');

class APIDataSource {

    constructor(config) {
        this.config = config;
    }

    async run() {
        try {
            const { data } = await this.api().get(this.config.route);
            return data;
        } catch (error) {
            console.error(error);
        }
    }

    api() {
        return axios.create({
            baseURL: this.config.baseUrl
        });
    }

}

module.exports = APIDataSource;