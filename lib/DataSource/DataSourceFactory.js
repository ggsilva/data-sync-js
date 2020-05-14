const APIDataSource = require('./APIDataSource');


const newDataSource = (config) => {
    if (config.isApi)
        return new APIDataSource(config);
    return null;
};

module.exports = { newDataSource };