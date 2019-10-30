export const getPropertyValueByString = (object: object, propertyName: string): any => {
    var parts = propertyName.split("."),
        length = parts.length,
        property = object;

    for (let i = 0; i < length; i++) {
        property = property[parts[i]];
    }

    return property;
}