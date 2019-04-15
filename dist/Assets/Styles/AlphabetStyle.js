import { StyleSheet, Dimensions } from 'react-native';
const { height } = Dimensions.get('screen');
export const AlphabetStyle = StyleSheet.create({
    container: {
        marginVertical: 10,
        marginHorizontal: 10,
        zIndex: 2,
        height: height - 100,
    },
    alphabetButton: {
        paddingVertical: 5,
        paddingHorizontal: 5,
    },
    alphabetText: {
        fontSize: 10,
        textAlign: 'center',
    },
    selected: {
        fontWeight: 'bold',
    },
});
//# sourceMappingURL=AlphabetStyle.js.map