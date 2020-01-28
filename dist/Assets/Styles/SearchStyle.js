import { StyleSheet } from 'react-native';
export const SearchStyle = StyleSheet.create({
    closeButton: {
        width: 13,
        height: 13,
    },
    backButton: {
        width: 15,
        height: 15,
    },
    searchArea: {
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
    },
    textInput: {
        flex: 1,
        borderColor: '#ccc',
        borderWidth: 0.5,
        borderRadius: 5,
        color: '#000',
        padding: 10,
    },
    nonCloseButton: {
        marginRight: 20,
    },
    nonBackButton: {
        marginLeft: 20,
    },
    leftBtn: {
        paddingVertical: 20,
        paddingHorizontal: 20,
    },
    rightBtn: {
        paddingVertical: 20,
        paddingHorizontal: 20,
    },
});
//# sourceMappingURL=SearchStyle.js.map