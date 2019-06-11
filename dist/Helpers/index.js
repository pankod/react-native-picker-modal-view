export const generateAlphabet = (items, sortingLanguage) => {
    const singularAlpha = [];
    items.map((x) => {
        if (singularAlpha.indexOf(x.Name.charAt(0)) === -1) {
            singularAlpha.push(x.Name.charAt(0));
        }
    });
    if (sortingLanguage === 'tr') {
        return singularAlpha.sort((a, b) => trCompare(a, b));
    }
    else {
        return singularAlpha.sort((a, b) => a.localeCompare(b));
    }
};
export const trCompare = (a, b) => {
    const alphabets = 'AaBbCcÇçDdEeFfGgĞğHhIıİiJjKkLlMmNnOoÖöPpQqRrSsŞşTtUuÜüVvWwXxYyZz0123456789';
    if (a.length === 0 || b.length === 0) {
        return a.length - b.length;
    }
    for (let i = 0; i < a.length && i < b.length; i++) {
        const ai = alphabets.indexOf(a[i]);
        const bi = alphabets.indexOf(b[i]);
        if (ai !== bi) {
            return ai - bi;
        }
    }
    return 0;
};
export const getIndex = (alphabet, items, autoSort, searchText) => {
    const list = getFilteredData(items, autoSort, searchText);
    const findIndex = list.findIndex((x) => {
        return x.Name.charAt(0) === alphabet;
    });
    return findIndex;
};
export const getFilteredData = (items, autoSort, searchText) => {
    if (autoSort) {
        items.sort((a, b) => trCompare(a.Name, b.Name));
    }
    return items.filter((l) => l.Name.toLocaleLowerCase().indexOf(searchText.toLocaleLowerCase()) > -1);
};
//# sourceMappingURL=index.js.map