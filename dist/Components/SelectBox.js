import * as React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { SelectBoxStyle } from '../Assets/Styles';
export class SelectBoxComponent extends React.PureComponent {
    render() {
        const { openModal, selectedObject, chooseText } = this.props;
        return (React.createElement(TouchableOpacity, { activeOpacity: 0.7, onPress: () => openModal() },
            React.createElement(View, { style: SelectBoxStyle.container },
                !selectedObject ?
                    React.createElement(Text, { style: SelectBoxStyle.chooseText }, chooseText) :
                    React.createElement(Text, { style: SelectBoxStyle.chooseText }, selectedObject.Name),
                React.createElement(Image, { source: require('../Assets/Images/down.png'), style: SelectBoxStyle.downBtn }))));
    }
}
//# sourceMappingURL=SelectBox.js.map