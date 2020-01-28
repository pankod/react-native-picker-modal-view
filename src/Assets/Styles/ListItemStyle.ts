// Global Imports
import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

// Local Imports
import { CommonStyle } from './CommonStyle';

export const ListItemStyle = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		height: CommonStyle.BTN_HEIGHT,
	} as ViewStyle,
	btnContainer: {
		flex: 1,
		marginLeft: 15,
		marginRight: 10,
		paddingVertical: 15,
		borderBottomWidth: 0.5,
		borderBottomColor: 'rgba(0,0,0,.05)',
	} as ViewStyle,
	selected: {
    color: '#000',
		fontWeight: 'bold',
	} as TextStyle,
});
