"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const react_native_1 = require("react-native");
const _Styles_1 = require("../Assets/Styles");
class SearchComponent extends React.PureComponent {
    render() {
        const { SearchInputProps, placeholderTextColor, onClose, setText, forceSelect, searchText, onBackRequest, } = this.props;
        return (React.createElement(react_native_1.View, { style: _Styles_1.SearchStyle.searchArea },
            React.createElement(react_native_1.TouchableOpacity, { onPress: () => onBackRequest(), style: _Styles_1.SearchStyle.leftBtn },
                React.createElement(react_native_1.Image, { source: require('../Assets/Images/left-arrow.png'), style: _Styles_1.SearchStyle.backButton })),
            React.createElement(react_native_1.TextInput, Object.assign({ placeholder: searchText, placeholderTextColor: placeholderTextColor, style: [_Styles_1.SearchStyle.textInput, forceSelect && _Styles_1.SearchStyle.nonCloseButton], underlineColorAndroid: 'transparent', onChangeText: (text) => setText(text) }, SearchInputProps)),
            !forceSelect &&
                React.createElement(react_native_1.TouchableOpacity, { onPress: () => onClose(), style: _Styles_1.SearchStyle.leftBtn },
                    React.createElement(react_native_1.Image, { source: require('../Assets/Images/close.png'), style: _Styles_1.SearchStyle.closeButton }))));
    }
}
exports.SearchComponent = SearchComponent;
//# sourceMappingURL=Search.js.map