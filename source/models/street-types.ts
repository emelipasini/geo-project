export const enum StreetTypes {
    Avenue = 2,
    Boulevard = 15,
    Street = 16,
}

export const replaceNumberForName = (streetType: number): string => {
    if (streetType === StreetTypes.Avenue) {
        return "Avenue";
    } else if (streetType === StreetTypes.Boulevard) {
        return "Boulevard";
    } else if (streetType === StreetTypes.Street) {
        return "Street";
    }

    return streetType.toString();
};
