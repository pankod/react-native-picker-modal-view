// Global Imports
import { StyleSheet, ViewStyle, ImageStyle } from 'react-native';

export const SearchStyle = StyleSheet.create({
	closeButton: {
		width: 10,
		height: 10,
		marginLeft: 20,
	} as ImageStyle,
	searchArea: {
		flexDirection: 'row',
		alignContent: 'center',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingVertical: 10,
		backgroundColor: 'rgba(0,0,0,.01)',
		paddingHorizontal: 20,
	} as ViewStyle,
	textInput: {
		flex: 1,
		borderColor: '#ccc',
		borderWidth: 0.5,
		borderRadius: 5,
		padding: 10,
	} as ViewStyle,
});
