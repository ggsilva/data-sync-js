const { expect: assertThat } = require('chai');
const MinusFilter = require('../../../Proccess/Filter/MinusFilter');

describe('Minus Filter', () => {

    describe('A minus B', () => {

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

            const subject = new MinusFilter(map);

            const minusList = subject.applyAMinusB(listA, listB);
            assertThat(minusList).has.length(1);

            const [item] = minusList;
            assertThat(item).is.deep.equal({ fieldA: '29', fieldB: { fieldC: '11' } });
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

            const subject = new MinusFilter(map);

            const minusList = subject.applyAMinusB(listA, listB);
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

            const subject = new MinusFilter(map);

            const minusList = subject.applyAMinusB(listA, listB);
            assertThat(minusList).is.empty;
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

            const subject = new MinusFilter(map);

            const minusList = subject.applyAMinusB(listA, listB);
            assertThat(minusList).has.length(2);

            const [item1, item2] = minusList;
            assertThat(item1).is.deep.equal({ fieldA: '11', fieldB: { fieldC: '07' } });
            assertThat(item2).is.deep.equal({ fieldA: '29', fieldB: { fieldC: '10' } });
        });

    });


    describe('B minus A', () => {

        it('A with 2 itens, B with 3 itens', () => {
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

            const listB = [
                { fieldA: '11', fieldC: '07' },
                { fieldA: '29', fieldC: '11' },
                { fieldA: '29', fieldC: '10' }
            ];

            const subject = new MinusFilter(map);

            const minusList = subject.applyBMinusA(listA, listB);
            assertThat(minusList).has.length(1);

            const [item] = minusList;
            assertThat(item).is.deep.equal({ fieldA: '29', fieldC: '11' });
        });

        it('A with 1 itens, B with 0 itens', () => {
            const map = {
                fields: [
                    { name: 'a', fieldA: 'fieldA', fieldB: 'fieldA' },
                    { name: 'c', fieldA: 'fieldB.fieldC', fieldB: 'fieldC' }
                ]
            };

            const listA = [
                { fieldA: '11', fieldB: { fieldC: '07' } }
            ];

            const listB = [];

            const subject = new MinusFilter(map);

            const minusList = subject.applyBMinusA(listA, listB);
            assertThat(minusList).is.empty;
        });

        it('A with 2 itens, B with 1 itens', () => {
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

            const listB = [
                { fieldA: '11', fieldC: '07' }
            ];

            const subject = new MinusFilter(map);

            const minusList = subject.applyBMinusA(listA, listB);
            assertThat(minusList).is.empty;
        });

        it('A with 0 itens, B with 2 itens', () => {
            const map = {
                fields: [
                    { name: 'a', fieldA: 'fieldA', fieldB: 'fieldA' },
                    { name: 'c', fieldA: 'fieldB.fieldC', fieldB: 'fieldC' }
                ]
            };

            const listA = [];

            const listB = [
                { fieldA: '11', fieldC: '07' },
                { fieldA: '29', fieldC: '10' }
            ];

            const subject = new MinusFilter(map);

            const minusList = subject.applyBMinusA(listA, listB);
            assertThat(minusList).has.length(2);

            const [item1, item2] = minusList;
            assertThat(item1).is.deep.equal({ fieldA: '11', fieldC: '07' });
            assertThat(item2).is.deep.equal({ fieldA: '29', fieldC: '10' });
        });

    });

});