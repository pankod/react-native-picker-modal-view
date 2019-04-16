import * as React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { ListItemStyle } from '../Assets/Styles';
export class ListItemComponent extends React.Component {
    render() {
        const { onSelectMethod } = this.props;
        const { Name } = this.props.list;
        return (React.createElement(TouchableOpacity, { style: ListItemStyle.container, activeOpacity: 0.7, onPress: () => onSelectMethod(this.props.list) },
            React.createElement(View, { style: ListItemStyle.btnContainer },
                React.createElement(Text, null, Name))));
    }
}
//# sourceMappingURL=ListItem.js.map