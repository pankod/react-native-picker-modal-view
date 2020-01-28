// Global Imports
import { StyleSheet, ViewStyle, ImageStyle, Platform, NativeModules } from 'react-native';

// const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : NativeModules.StatusBarManager.HEIGHT;

export const SearchStyle = StyleSheet.create({
	closeButton: {
		width: 13,
		height: 13,
	} as ImageStyle,
	backButton: {
		width: 15,
		height: 15,
	} as ImageStyle,
	searchArea: {
		flexDirection: 'row',
		alignContent: 'center',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingVertical: 10,
	} as ViewStyle,
	textInput: {
		flex: 1,
		borderColor: '#ccc',
		borderWidth: 0.5,
		borderRadius: 5,
		color: '#000',
		padding: 10,
	} as ViewStyle,
	nonCloseButton: {
		marginRight: 20,
	} as ViewStyle,
	nonBackButton: {
		marginLeft: 20,
	} as ViewStyle,
	leftBtn: {
		paddingVertical: 20,
		paddingHorizontal: 20,
	} as ViewStyle,
	rightBtn: {
		paddingVertical: 20,
		paddingHorizontal: 20,
	} as ViewStyle,
});
