import { StyleSheet } from 'react-native';
import { CommonStyle } from './CommonStyle';
export const ListItemStyle = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        height: CommonStyle.BTN_HEIGHT,
    },
    btnContainer: {
        flex: 1,
        marginLeft: 15,
        marginRight: 10,
        paddingVertical: 15,
        borderBottomWidth: 0.5,
        borderBottomColor: 'rgba(0,0,0,.05)',
    },
    selected: {
        color: '#000',
        fontWeight: 'bold',
    },
});
//# sourceMappingURL=ListItemStyle.js.map