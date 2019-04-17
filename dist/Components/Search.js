import * as React from 'react';
import { View, TextInput, TouchableOpacity, Image } from 'react-native';
import { SearchStyle } from '../Assets/Styles';
export class SearchComponent extends React.PureComponent {
    render() {
        const { SearchInputProps, autoCorrect, placeholderTextColor, onClose, setText, closeable, searchText, onBackRequest, } = this.props;
        return (React.createElement(View, { style: SearchStyle.searchArea },
            React.createElement(TouchableOpacity, { onPress: () => onBackRequest() },
                React.createElement(Image, { source: require('../Assets/Images/left-arrow.png'), style: SearchStyle.backButton })),
            React.createElement(TextInput, Object.assign({ placeholder: searchText, placeholderTextColor: placeholderTextColor, style: SearchStyle.textInput, underlineColorAndroid: 'transparent', onChangeText: (text) => setText(text), autoCorrect: autoCorrect }, SearchInputProps)),
            closeable &&
                React.createElement(TouchableOpacity, { onPress: () => onClose() },
                    React.createElement(Image, { source: require('../Assets/Images/close.png'), style: SearchStyle.closeButton }))));
    }
}
//# sourceMappingURL=Search.js.map