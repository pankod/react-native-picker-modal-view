import { StyleSheet, Platform, NativeModules } from 'react-native';
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : NativeModules.StatusBarManager.HEIGHT;
export const SearchStyle = StyleSheet.create({
    closeButton: {
        width: 10,
        height: 10,
        marginLeft: 20,
    },
    searchArea: {
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: STATUSBAR_HEIGHT,
        paddingBottom: 10,
        backgroundColor: 'rgba(0,0,0,.01)',
        paddingHorizontal: 20,
    },
    textInput: {
        flex: 1,
        borderColor: '#ccc',
        borderWidth: 0.5,
        borderRadius: 5,
        padding: 10,
    },
});
//# sourceMappingURL=SearchStyle.js.map