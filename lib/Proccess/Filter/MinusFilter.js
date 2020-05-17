const MapComparator = require('../Compare/MapComparator');


class MinusFilter {

    constructor(fieldMap) {
        this.fieldMap = fieldMap;
        this.comparator = new MapComparator(this.fieldMap);
    }

    applyAMinusB(itensA, itensB) {
        return itensA.filter(itemA =>
            !itensB.some(itemB => {
                return this.comparator.compare(itemA, itemB).isEquals;
            })
        );
    }

    applyBMinusA(itensA, itensB) {
        return itensB.filter(itemB =>
            !itensA.some(itemA => {
                return this.comparator.compare(itemA, itemB).isEquals;
            })
        );
    }

}

module.exports = MinusFilter;