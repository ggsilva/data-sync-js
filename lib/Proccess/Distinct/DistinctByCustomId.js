class DistinctByCustomId {

    constructor(config) {
        this.customId = config.customId;
    }

    apply(itens) {
        const distinctItens = [];
        const proccessedItens = {};

        itens.map(item => {
            if (proccessedItens[item[this.customId]])
                return;

            distinctItens.push(item);
            proccessedItens[item[this.customId]] = true;
        })

        return distinctItens;
    }

}

module.exports = DistinctByCustomId;