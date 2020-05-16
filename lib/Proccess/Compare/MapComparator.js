const valueField = (obj, fields) => {
    const [baseField, ...childFields] = fields.split('.')

    if (childFields.length > 0)
        return valueField(obj[baseField], childFields.join('.'))

    return obj[baseField];
};

const isEqualsField = (field, objA, objB) => {
    const valueFieldA = valueField(objA, field.fieldA)
    const valueFieldB = valueField(objB, field.fieldB)
    return valueFieldA === valueFieldB;
};

const isEqualsObject = (fieldMap, objA, objB) => {
    return fieldMap.fields.every(field => {
        return isEqualsField(field, objA, objB);
    });
};

const notEqualsFields = (fieldMap, objA, objB) => {
    let fields = [];

    fieldMap.fields.map(field => {
        if (!isEqualsField(field, objA, objB))
            fields.push(field.name)
    })

    return fields.sort();
};



class MapComparator {

    constructor(fieldMap) {
        this.fieldMap = fieldMap;
    }

    compare(objA, objB) {
        return {
            isEquals: isEqualsObject(this.fieldMap, objA, objB),
            notEqualsFields: notEqualsFields(this.fieldMap, objA, objB)
        };
    }

}

module.exports = MapComparator;