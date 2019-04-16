// Global Imports
import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

export const ListItemStyle = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
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
		fontWeight: 'bold',
	} as TextStyle,
});
