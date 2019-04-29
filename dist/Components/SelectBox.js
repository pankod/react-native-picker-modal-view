import * as React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { SelectBoxStyle } from '../Assets/Styles';
export class SelectBoxComponent extends React.PureComponent {
    render() {
        const { openModal, selectedObject, chooseText, disabled } = this.props;
        return (React.createElement(TouchableOpacity, { activeOpacity: 0.7, onPress: () => openModal(), style: [SelectBoxStyle.pressBtn, disabled && SelectBoxStyle.disabledBtn] },
            React.createElement(View, { style: SelectBoxStyle.container },
                React.createElement(Text, { style: [disabled ? SelectBoxStyle.disabledTxt : SelectBoxStyle.chooseText] }, (selectedObject && selectedObject.Name) ? selectedObject.Name : chooseText),
                React.createElement(Image, { source: require('../Assets/Images/down.png'), style: [SelectBoxStyle.downBtn, disabled && SelectBoxStyle.disabledImage] }))));
    }
}
//# sourceMappingURL=SelectBox.js.map