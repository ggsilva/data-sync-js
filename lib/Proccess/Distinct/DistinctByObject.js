const isObject = (obj) => {
    return (typeof obj) === "object"
};

const isEqual = (objA, objB) => {
    const keysA = Object.keys(objA).sort();
    const keysB = Object.keys(objB).sort();

    if (JSON.stringify(keysA) !== JSON.stringify(keysB))
        return false;

    return keysA.every(key => {
        if (isObject(objA[key]) && isObject(objB[key]))
            return isEqual((objA[key]), (objB[key]))
        return objA[key] === objB[key];
    });
};

const isInclude = (list, item) => {
    return list.some(listItem => {
        return isEqual(item, listItem);
    });
};

class DistinctByObject {

    apply(itens) {
        const distinctItens = [];
        itens.map(item => {
            if (!isInclude(distinctItens, item))
                distinctItens.push(item);
        })
        return distinctItens;
    }

}

module.exports = DistinctByObject;