"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const react_native_1 = require("react-native");
const _Styles_1 = require("../Assets/Styles");
class AlphabetComponent extends React.PureComponent {
    render() {
        const { alphabets, setAlphabet, selectedAlpha } = this.props;
        return (React.createElement(react_native_1.View, { style: _Styles_1.AlphabetStyle.container },
            React.createElement(react_native_1.ScrollView, { showsVerticalScrollIndicator: false, keyboardShouldPersistTaps: "always" }, alphabets.map((a, index) => React.createElement(react_native_1.TouchableOpacity, { onPress: () => setAlphabet(a), key: index, style: _Styles_1.AlphabetStyle.alphabetButton },
                React.createElement(react_native_1.Text, { style: [_Styles_1.AlphabetStyle.alphabetText, selectedAlpha === a && _Styles_1.AlphabetStyle.selected] }, a))))));
    }
}
AlphabetComponent.defaultProps = {
    alphabets: ['A', 'B', 'C', 'Ç', 'D', 'E', 'F', 'G', 'H', 'I', 'İ', 'J', 'K', 'L', 'M', 'N', 'O', 'Ö', 'P', 'Q', 'R', 'S', 'Ş', 'T', 'U', 'Ü', 'V', 'W', 'X', 'Y', 'Z'],
};
exports.AlphabetComponent = AlphabetComponent;
//# sourceMappingURL=Alphabet.js.map