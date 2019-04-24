// Global Imports
import { StyleSheet, ViewStyle, ImageStyle } from 'react-native';

export const ScrollToTopStyle = StyleSheet.create({
	container: {
		position: 'absolute',
		bottom: 20,
		right: 50,
		backgroundColor: '#dfe4ea',
		width: 40,
		height: 40,
		borderRadius: 40,
		justifyContent: 'center',
		alignItems: 'center',
	} as ViewStyle,
	upBtn: {
		width: 15,
		height: 15,
	} as ImageStyle,
});
