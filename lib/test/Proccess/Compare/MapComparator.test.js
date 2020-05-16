const { expect: assertThat } = require('chai');
const MapComparator = require('../../../Proccess/Compare/MapComparator');

describe('Map Comparator', () => {

    it('Simple map', async () => {
        const map = {
            fields: [
                {
                    name: 'a',
                    fieldA: 'fieldA',
                    fieldB: 'fieldA'
                },
                {
                    name: 'c',
                    fieldA: 'fieldB.fieldC',
                    fieldB: 'fieldC'
                }
            ]
        };

        const subject = new MapComparator(map);

        const objA = {
            fieldA: '11',
            fieldB: {
                fieldC: '07'
            }
        };

        const objB = {
            fieldA: '11',
            fieldC: '07'
        };

        const { isEquals: isAEqualsB } = subject.compare(objA, objB);
        assertThat(isAEqualsB).is.true;

        const objC = {
            fieldA: '11',
            fieldB: {
                fieldC: '07'
            }
        };

        const objD = {
            fieldA: '11',
            fieldC: '08'
        };

        const { isEquals: isCEqualsD, notEqualsFields } = subject.compare(objC, objD);
        assertThat(isCEqualsD).is.false;
        assertThat(notEqualsFields).has.length(1);
        assertThat(notEqualsFields).is.deep.equal(['c']);
    });

    it('Complex map', async () => {
        const map = {
            fields: [
                {
                    name: 'a',
                    fieldA: 'fieldA',
                    fieldB: 'field_a.field_b'
                },
                {
                    name: 'c',
                    fieldA: 'fieldB.fieldC',
                    fieldB: 'field_c'
                },
                {
                    name: 'f',
                    fieldA: 'fieldD.fieldE.fieldF',
                    fieldB: 'field_d.field_e.field_g.field_f'
                },
                {
                    name: 'h',
                    fieldA: 'fieldD.fieldE.fieldG.fieldH',
                    fieldB: 'field_d.field_h'
                }
            ]
        };

        const subject = new MapComparator(map);

        const objA = {
            fieldA: '11',
            fieldB: {
                fieldC: '07'
            },
            fieldD: {
                fieldE: {
                    fieldF: '20',
                    fieldG: {
                        fieldH: '15'
                    }
                }
            }
        };

        const objB = {
            field_a: {
                field_b: '11'
            },
            field_c: '07',
            field_d: {
                field_e: {
                    field_g: {
                        field_f: '20'
                    }
                },
                field_h: '15'
            }
        };

        const { isEquals: isAEqualsB } = subject.compare(objA, objB);
        assertThat(isAEqualsB).is.true;

        const objC = {
            fieldA: '11',
            fieldB: {
                fieldC: '07'
            },
            fieldD: {
                fieldE: {
                    fieldF: '20',
                    fieldG: {
                        fieldH: '15'
                    }
                }
            }
        };

        const objD = {
            field_a: {
                field_b: '11'
            },
            field_c: '08',
            field_d: {
                field_e: {
                    field_g: {
                        field_f: '20'
                    }
                },
                field_h: '16'
            }
        };

        const { isEquals: isCEqualsD, notEqualsFields } = subject.compare(objC, objD);
        assertThat(isCEqualsD).is.false;
        assertThat(notEqualsFields).has.length(2);
        assertThat(notEqualsFields).is.deep.equal(['c', 'h']);
    });

});