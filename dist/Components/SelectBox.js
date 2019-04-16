import * as React from 'react';
import { Text, TouchableOpacity } from 'react-native';
export class SelectBoxComponent extends React.PureComponent {
    render() {
        const { openModal } = this.props;
        return (React.createElement(TouchableOpacity, { activeOpacity: 0.7, onPress: () => openModal() },
            React.createElement(Text, null, "Se\u00E7iniz")));
    }
}
//# sourceMappingURL=SelectBox.js.map