export const getPropertyValueByString = (object: object, propertyName: string): any => {
    var parts = propertyName.split("."),
        length = parts.length,
        i,
        property = object;

    for (i = 0; i < length; i++) {
        property = property[parts[i]];
    }

    return property;
}