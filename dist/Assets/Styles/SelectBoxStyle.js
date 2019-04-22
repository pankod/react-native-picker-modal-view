"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_native_1 = require("react-native");
exports.SelectBoxStyle = react_native_1.StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        paddingVertical: 10,
        position: 'relative',
        borderWidth: 1,
        borderColor: '#9E9E9E',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
    },
    chooseText: {
        fontWeight: '500',
    },
    downBtn: {
        width: 10,
        height: 10,
    },
    pressBtn: {
        marginVertical: 10,
    },
    disabledBtn: {
        borderColor: '#ddd',
    },
    disabledTxt: {
        color: '#ddd',
    },
    disabledImage: {
        opacity: 0.2,
    },
});
//# sourceMappingURL=SelectBoxStyle.js.map