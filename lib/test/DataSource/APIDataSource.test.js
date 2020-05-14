const { expect: assertThat } = require('chai');
const { MetisApiGet } = require('metisjs');
const APIDataSource = require('../../DataSource/APIDataSource');

let subject;

describe('API Data Source', () => {

    let mockApiSource;

    beforeEach(() => {
        const properties = {
            api: 'source',
            port: 1107
        };

        mockApiSource = new MetisApiGet(properties);
        mockApiSource.start();

        subject = new APIDataSource();
    });

    afterEach(() => {
        mockApiSource.close();
    });

    it('Return a list', async () => {
        const mockReturn = {
            body: [
                { id: '11' },
                { id: '07' },
            ]
        };
        mockApiSource.setMockReturn(mockReturn);

        const config = {
            baseUrl: 'http://localhost:1107',
            route: 'source',
            isGet: true
        };

        subject = new APIDataSource(config);

        const response = await subject.run();

        assertThat(response).has.length(2);

        const [item1, item2] = response;
        assertThat(item1).is.deep.equal({ id: '11' });
        assertThat(item2).is.deep.equal({ id: '07' });
    });

    it('Return simple object', async () => {
        const mockReturn = {
            body: { id: '1107' }
        };
        mockApiSource.setMockReturn(mockReturn);

        const config = {
            baseUrl: 'http://localhost:1107',
            route: 'source',
            isGet: true
        };

        subject = new APIDataSource(config);

        const response = await subject.run();
        assertThat(response).is.deep.equal({ id: '1107' });
    });

});