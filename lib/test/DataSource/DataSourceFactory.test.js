const { expect: assertThat } = require('chai');
const APIDataSource = require('../../DataSource/APIDataSource');
const DataSourceFactory = require('../../DataSource/DataSourceFactory');

let subject;

describe('Data Source Factory', () => {

    beforeEach(() => {
        subject = DataSourceFactory;
    });

    it('API Data Source', async () => {
        const config = { isApi: true };

        const dataSource = subject.newDataSource(config);
        assertThat(dataSource).is.instanceOf(APIDataSource);
        assertThat(dataSource.config).is.equal(config);
    });

    it('Data Source null', async () => {
        const config = { isOther: true };

        const dataSource = subject.newDataSource(config);
        assertThat(dataSource).is.null;
    });

});