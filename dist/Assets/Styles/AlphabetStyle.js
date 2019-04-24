"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_native_1 = require("react-native");
const { height } = react_native_1.Dimensions.get('screen');
exports.AlphabetStyle = react_native_1.StyleSheet.create({
    container: {
        marginHorizontal: 10,
        zIndex: 2,
    },
    alphabetButton: {
        paddingVertical: 5,
        paddingHorizontal: 5,
    },
    alphabetText: {
        fontSize: 10,
        textAlign: 'center',
    },
    selected: {
        fontWeight: 'bold',
    },
});
//# sourceMappingURL=AlphabetStyle.js.map