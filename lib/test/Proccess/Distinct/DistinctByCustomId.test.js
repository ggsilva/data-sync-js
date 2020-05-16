const { expect: assertThat } = require('chai');
const DistinctByCustomId = require('../../../Proccess/Distinct/DistinctByCustomId');

describe('Distinct by CustomId', () => {

    it('1 item', async () => {
        const data = [
            { id: "1107" },
        ];

        assertThat(data).has.length(1);

        const subject = new DistinctByCustomId({ customId: 'id' });
        const distinctData = subject.apply(data);
        assertThat(distinctData).has.length(1);
        assertThat(distinctData).is.deep.equal([
            { id: "1107" }
        ]);
    });

    it('2 itens, 2 distinct', async () => {
        const data = [
            { id: "1107" },
            { id: "2015" }
        ];

        assertThat(data).has.length(2);

        const subject = new DistinctByCustomId({ customId: 'id' });
        const distinctData = subject.apply(data);
        assertThat(distinctData).has.length(2);
        assertThat(distinctData).is.deep.equal([
            { id: "1107" },
            { id: "2015" }
        ]);
    });

    it('2 itens, 1 distinct', async () => {
        const data = [
            { id: "1107" },
            { id: "1107" }
        ];

        assertThat(data).has.length(2);

        const subject = new DistinctByCustomId({ customId: 'id' });
        const distinctData = subject.apply(data);
        assertThat(distinctData).has.length(1);
        assertThat(distinctData).is.deep.equal([
            { id: "1107" }
        ]);
    });

    it('5 itens, 3 distinct', async () => {
        const data = [
            { idObject: "1107" },
            { idObject: "2910" },
            { idObject: "2911" },
            { idObject: "1107" },
            { idObject: "2911" }
        ];

        assertThat(data).has.length(5);

        const subject = new DistinctByCustomId({ customId: 'idObject' });
        const distinctData = subject.apply(data);
        assertThat(distinctData).has.length(3);
        assertThat(distinctData).is.deep.equal([
            { idObject: "1107" },
            { idObject: "2910" },
            { idObject: "2911" },
        ]);
    });

});
