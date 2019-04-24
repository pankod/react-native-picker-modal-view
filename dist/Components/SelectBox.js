"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const react_native_1 = require("react-native");
const _Styles_1 = require("../Assets/Styles");
class SelectBoxComponent extends React.PureComponent {
    render() {
        const { openModal, selectedObject, chooseText, disabled } = this.props;
        return (React.createElement(react_native_1.TouchableOpacity, { activeOpacity: 0.7, onPress: () => openModal(), style: [_Styles_1.SelectBoxStyle.pressBtn, disabled && _Styles_1.SelectBoxStyle.disabledBtn] },
            React.createElement(react_native_1.View, { style: _Styles_1.SelectBoxStyle.container },
                React.createElement(react_native_1.Text, { style: [disabled ? _Styles_1.SelectBoxStyle.disabledTxt : _Styles_1.SelectBoxStyle.chooseText] }, (selectedObject && selectedObject.Name) ? selectedObject.Name : chooseText),
                React.createElement(react_native_1.Image, { source: require('../Assets/Images/down.png'), style: [_Styles_1.SelectBoxStyle.downBtn, disabled && _Styles_1.SelectBoxStyle.disabledImage] }))));
    }
}
exports.SelectBoxComponent = SelectBoxComponent;
//# sourceMappingURL=SelectBox.js.map