"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const react_native_1 = require("react-native");
const _Styles_1 = require("../Assets/Styles");
class ScrollToTopComponent extends React.PureComponent {
    render() {
        const { goToUp } = this.props;
        return (React.createElement(react_native_1.TouchableOpacity, { onPress: () => goToUp(), activeOpacity: 0.8, style: _Styles_1.ScrollToTopStyle.container },
            React.createElement(react_native_1.Image, { source: require('../Assets/Images/up.png'), style: _Styles_1.ScrollToTopStyle.upBtn })));
    }
}
exports.ScrollToTopComponent = ScrollToTopComponent;
//# sourceMappingURL=ScrollToTop.js.map