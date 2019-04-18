// Global Imports
import { StyleSheet, ViewStyle, TextStyle, Dimensions } from 'react-native';

const { height } = Dimensions.get('screen');

// Local Imports

export const AlphabetStyle = StyleSheet.create({
	container: {
		marginHorizontal: 10,
		zIndex: 2,
	} as ViewStyle,
	alphabetButton: {
		paddingVertical: 5,
		paddingHorizontal: 5,
	} as ViewStyle,
	alphabetText: {
		fontSize: 10,
		textAlign: 'center',
	} as TextStyle,
	selected: {
		fontWeight: 'bold',
	} as TextStyle,
});
