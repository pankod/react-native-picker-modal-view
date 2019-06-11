import * as React from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { AlphabetStyle } from '../Assets/Styles';
export class AlphabetComponent extends React.PureComponent {
    render() {
        const { alphabets, setAlphabet, selectedAlpha, showAlphabeticalIndex } = this.props;
        if (showAlphabeticalIndex) {
            return (React.createElement(View, { style: AlphabetStyle.container },
                React.createElement(ScrollView, { showsVerticalScrollIndicator: false, keyboardShouldPersistTaps: "always" }, alphabets.map((a, index) => React.createElement(TouchableOpacity, { onPress: () => setAlphabet(a), key: index, style: AlphabetStyle.alphabetButton },
                    React.createElement(Text, { style: [AlphabetStyle.alphabetText, selectedAlpha === a && AlphabetStyle.selected] }, a))))));
        }
        return null;
    }
}
AlphabetComponent.defaultProps = {
    alphabets: ['A', 'B', 'C', 'Ç', 'D', 'E', 'F', 'G', 'H', 'I', 'İ', 'J', 'K', 'L', 'M', 'N', 'O', 'Ö', 'P', 'Q', 'R', 'S', 'Ş', 'T', 'U', 'Ü', 'V', 'W', 'X', 'Y', 'Z'],
};
//# sourceMappingURL=Alphabet.js.map