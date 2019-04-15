import * as React from 'react';
import { View, TextInput, TouchableOpacity, Image } from 'react-native';
import { SearchStyle } from '../Assets/Styles';
export class SearchComponent extends React.PureComponent {
    render() {
        const { placeholderTextColor, onClose, setText, closeable } = this.props;
        return (React.createElement(View, { style: SearchStyle.searchArea },
            React.createElement(TextInput, { placeholder: 'Search...', placeholderTextColor: placeholderTextColor, style: SearchStyle.textInput, underlineColorAndroid: 'transparent', onChangeText: (text) => setText(text) }),
            closeable &&
                React.createElement(TouchableOpacity, { onPress: () => onClose() },
                    React.createElement(Image, { source: require('../Assets/Images/close.png'), style: SearchStyle.closeButton }))));
    }
}
//# sourceMappingURL=SearchComponent.js.map