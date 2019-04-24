"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_native_1 = require("react-native");
const CommonStyle_1 = require("./CommonStyle");
exports.ListItemStyle = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        height: CommonStyle_1.CommonStyle.BTN_HEIGHT,
    },
    btnContainer: {
        flex: 1,
        marginLeft: 15,
        marginRight: 10,
        paddingVertical: 15,
        borderBottomWidth: 0.5,
        borderBottomColor: 'rgba(0,0,0,.05)',
    },
    selected: {
        fontWeight: 'bold',
    },
});
//# sourceMappingURL=ListItemStyle.js.map