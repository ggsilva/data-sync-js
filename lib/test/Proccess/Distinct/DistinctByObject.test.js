const { expect: assertThat } = require('chai');
const DistinctByObject = require('../../../Proccess/Distinct/DistinctByObject');

describe('Distinct by Object', () => {

    it('1 item', async () => {
        const data = [
            { a: '11', b: '07' }
        ];

        assertThat(data).has.length(1);

        const subject = new DistinctByObject();
        const distinctData = subject.apply(data);
        assertThat(distinctData).has.length(1);
        assertThat(distinctData).is.deep.equal([
            { a: '11', b: '07' }
        ]);
    });

    it('2 itens, 2 distinct', async () => {
        const data = [
            { a: '11', b: '07' },
            { a: '29', b: '10' }
        ];

        assertThat(data).has.length(2);

        const subject = new DistinctByObject();
        const distinctData = subject.apply(data);
        assertThat(distinctData).has.length(2);
        assertThat(distinctData).is.deep.equal([
            { a: '11', b: '07' },
            { a: '29', b: '10' }
        ]);
    });

    it('2 itens, 1 distinct', async () => {
        const data = [
            { a: '11', b: '07' },
            { a: '11', b: '07' }
        ];

        assertThat(data).has.length(2);

        const subject = new DistinctByObject();
        const distinctData = subject.apply(data);
        assertThat(distinctData).has.length(1);
        assertThat(distinctData).is.deep.equal([
            { a: '11', b: '07' }
        ]);
    });

    it('5 itens, 3 distinct', async () => {
        const data = [
            { a: '11', b: '07' },
            { a: '29', b: '10' },
            { a: '11', b: '07' },
            { a: '29' },
            { b: '10', a: '29' }
        ];

        assertThat(data).has.length(5);

        const subject = new DistinctByObject();
        const distinctData = subject.apply(data);
        assertThat(distinctData).has.length(3);
        assertThat(distinctData).is.deep.equal([
            { a: '11', b: '07' },
            { a: '29', b: '10' },
            { a: '29' }
        ]);
    });

    it('6 complex itens, 4 distinct', async () => {
        const data = [
            { a: '11', b: { c: '07', d: { e: '2015' } } },
            { a: '29', b: { c: '10', d: { e: '2012' } } },
            { a: '11', b: { c: '07', d: { e: '2015' } } },
            { a: '11', b: { c: '07', d: { e: '2016' } } },
            { a: '29', b: { c: '10', d: {} } },
            { a: '29', b: { c: '10', d: { e: '2012' } } }
        ];

        assertThat(data).has.length(6);

        const subject = new DistinctByObject();
        const distinctData = subject.apply(data);
        assertThat(distinctData).has.length(4);
        assertThat(distinctData).is.deep.equal([
            { a: '11', b: { c: '07', d: { e: '2015' } } },
            { a: '29', b: { c: '10', d: { e: '2012' } } },
            { a: '11', b: { c: '07', d: { e: '2016' } } },
            { a: '29', b: { c: '10', d: {} } },
        ]);
    });

});
