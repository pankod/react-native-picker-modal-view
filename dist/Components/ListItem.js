"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const react_native_1 = require("react-native");
const _Styles_1 = require("../Assets/Styles");
class ListItemComponent extends React.PureComponent {
    render() {
        const { onSelectMethod, defaultSelected, list: { Name } } = this.props;
        return (React.createElement(react_native_1.TouchableOpacity, { style: _Styles_1.ListItemStyle.container, activeOpacity: 0.7, onPress: () => onSelectMethod(this.props.list) },
            React.createElement(react_native_1.View, { style: _Styles_1.ListItemStyle.btnContainer },
                React.createElement(react_native_1.Text, { style: [(defaultSelected && Name === defaultSelected.Name) && _Styles_1.ListItemStyle.selected] }, Name))));
    }
}
exports.ListItemComponent = ListItemComponent;
//# sourceMappingURL=ListItem.js.map