// Global Imports
import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from 'react-native';

export const SelectBoxStyle = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
		paddingHorizontal: 10,
		paddingVertical: 10,
		position: 'relative',
		borderWidth: 1,
		borderColor: '#ddd',
		justifyContent: 'space-between',
		flexDirection: 'row',
		alignContent: 'center',
		alignItems: 'center',
	} as ViewStyle,
	chooseText: {
		fontWeight: '500',
	} as TextStyle,
	downBtn: {
		width: 10,
		height: 10,
	} as ImageStyle,
});
