const { expect: assertThat } = require('chai');
const EqualsFilter = require('../../../Proccess/Filter/EqualsFilter');

describe('Equals Filter', () => {

    describe('Apply', () => {

        it('A with 3 itens, B with 2 itens', () => {
            const map = {
                fields: [
                    { name: 'a', fieldA: 'fieldA', fieldB: 'fieldA' },
                    { name: 'c', fieldA: 'fieldB.fieldC', fieldB: 'fieldC' }
                ]
            };

            const listA = [
                { fieldA: '11', fieldB: { fieldC: '07' } },
                { fieldA: '29', fieldB: { fieldC: '11' } },
                { fieldA: '29', fieldB: { fieldC: '10' } }
            ];

            const listB = [
                { fieldA: '11', fieldC: '07' },
                { fieldA: '29', fieldC: '10' }
            ];

            const subject = new EqualsFilter(map);

            const minusList = subject.apply(listA, listB);
            assertThat(minusList).has.length(2);

            const [item1, item2] = minusList;
            assertThat(item1).is.deep.equal({ fieldA: '11', fieldB: { fieldC: '07' } });
            assertThat(item2).is.deep.equal({ fieldA: '29', fieldB: { fieldC: '10' } });
        });

        it('A with 0 itens, B with 1 itens', () => {
            const map = {
                fields: [
                    { name: 'a', fieldA: 'fieldA', fieldB: 'fieldA' },
                    { name: 'c', fieldA: 'fieldB.fieldC', fieldB: 'fieldC' }
                ]
            };

            const listA = [];

            const listB = [
                { fieldA: '11', fieldC: '07' }
            ];

            const subject = new EqualsFilter(map);

            const minusList = subject.apply(listA, listB);
            assertThat(minusList).is.empty;
        });

        it('A with 1 itens, B with 2 itens', () => {
            const map = {
                fields: [
                    { name: 'a', fieldA: 'fieldA', fieldB: 'fieldA' },
                    { name: 'c', fieldA: 'fieldB.fieldC', fieldB: 'fieldC' }
                ]
            };

            const listA = [
                { fieldA: '11', fieldB: { fieldC: '07' } }
            ];

            const listB = [
                { fieldA: '11', fieldC: '07' },
                { fieldA: '29', fieldC: '10' }
            ];

            const subject = new EqualsFilter(map);

            const minusList = subject.apply(listA, listB);
            assertThat(minusList).has.length(1);

            const [item1] = minusList;
            assertThat(item1).is.deep.equal({ fieldA: '11', fieldB: { fieldC: '07' } });
        });

        it('A with 2 itens, B with 0 itens', () => {
            const map = {
                fields: [
                    { name: 'a', fieldA: 'fieldA', fieldB: 'fieldA' },
                    { name: 'c', fieldA: 'fieldB.fieldC', fieldB: 'fieldC' }
                ]
            };

            const listA = [
                { fieldA: '11', fieldB: { fieldC: '07' } },
                { fieldA: '29', fieldB: { fieldC: '10' } }
            ];

            const listB = [];

            const subject = new EqualsFilter(map);

            const minusList = subject.apply(listA, listB);
            assertThat(minusList).is.empty;
        });

    });

});