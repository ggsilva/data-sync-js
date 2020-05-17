const MapComparator = require('../Compare/MapComparator');


class EqualsFilter {

    constructor(fieldMap) {
        this.fieldMap = fieldMap;
        this.comparator = new MapComparator(this.fieldMap);
    }

    apply(itensA, itensB) {
        return itensA.filter(itemA =>
            itensB.some(itemB => {
                return this.comparator.compare(itemA, itemB).isEquals;
            })
        );
    }

}

module.exports = EqualsFilter;