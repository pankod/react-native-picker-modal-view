"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const react_native_1 = require("react-native");
const _Styles_1 = require("../Styles");
class ModalComponent extends React.Component {
    render() {
        const { animationType, onRequestClosed, closeable, } = this.props;
        return (React.createElement(react_native_1.Modal, { animationType: animationType, onRequestClose: () => onRequestClosed },
            React.createElement(react_native_1.SafeAreaView, { style: _Styles_1.ModalStyles.container }, closeable && React.createElement(react_native_1.Text, null, "Kapat"))));
    }
    onChangeMethod(key) {
        const { onChange } = this.props;
        return onChange(key);
    }
}
ModalComponent.defaultProps = {
    animationType: 'slide',
    closeable: true,
    hideAlphabetFilter: false,
};
exports.ModalComponent = ModalComponent;
//# sourceMappingURL=Modal.js.map