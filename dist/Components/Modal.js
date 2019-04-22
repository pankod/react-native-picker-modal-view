"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const react_native_1 = require("react-native");
const _Components_1 = require("./");
const _Styles_1 = require("../Assets/Styles");
class ModalComponent extends React.PureComponent {
    constructor(props) {
        super(props);
        this.flatListRef = null;
        this.numToRender = 20;
        this.state = {
            modalVisible: false,
            searchText: '',
            stickyBottomButton: false,
            selectedAlpha: null,
            selectedObject: {},
        };
        this._onViewableItemsChanged = this._onViewableItemsChanged.bind(this);
    }
    componentWillUnmount() {
        this.clearComponent();
    }
    componentWillReceiveProps(nextProps, nextState) {
        if ((this.props.defaultSelected && nextProps.defaultSelected) && this.props.defaultSelected.Name !== nextProps.defaultSelected.Name &&
            [this.props.defaultSelected.Id] !== [nextProps.defaultSelected.Id]) {
            this.setState({
                selectedObject: {},
            });
        }
    }
    clearComponent() {
        this.setState({
            stickyBottomButton: false,
            searchText: '',
            selectedAlpha: null,
        });
    }
    componentWillMount() {
        const { autoGenerateAlphabet, alphabets } = this.props;
        if (autoGenerateAlphabet) {
            this.generateAlphabet();
        }
        else if (alphabets) {
            this.setState({
                alphabets,
            });
        }
    }
    openModal() {
        const { list, autoGenerateAlphabet, disabled } = this.props;
        if (autoGenerateAlphabet) {
            this.generateAlphabet();
        }
        if (list.length > 0 && !disabled) {
            this.setState({
                modalVisible: true,
            });
        }
    }
    render() {
        const { animationType, onRequestClosed, hideAlphabetFilter, placeholderTextColor, keyExtractor, showToTopButton, onEndReached, removeClippedSubviews, FlatListProps, chooseText, searchText, autoCorrect, SearchInputProps, defaultSelected, disabled, list, forceSelect, } = this.props;
        const { modalVisible, alphabets, stickyBottomButton, selectedAlpha, selectedObject } = this.state;
        return (React.createElement(React.Fragment, null,
            React.createElement(_Components_1.SelectBoxComponent, { disabled: (disabled || !list || list.length === 0), selectedObject: selectedObject, chooseText: (defaultSelected && defaultSelected.Name) ? defaultSelected.Name : chooseText, openModal: this.openModal.bind(this) }),
            React.createElement(react_native_1.Modal, { animationType: animationType, visible: modalVisible, onRequestClose: () => onRequestClosed },
                React.createElement(react_native_1.SafeAreaView, { style: _Styles_1.ModalStyles.container },
                    React.createElement(_Components_1.SearchComponent, Object.assign({ autoCorrect: autoCorrect, searchText: searchText, placeholderTextColor: placeholderTextColor, onClose: this.onClose.bind(this), onBackRequest: this.onBackRequest.bind(this), forceSelect: forceSelect, setText: (text) => this.setText(text) }, SearchInputProps)),
                    React.createElement(react_native_1.KeyboardAvoidingView, { style: _Styles_1.ModalStyles.keyboardContainer, behavior: react_native_1.Platform.OS === 'ios' ? 'padding' : null, enabled: true },
                        React.createElement(react_native_1.View, { style: _Styles_1.ModalStyles.listArea },
                            React.createElement(react_native_1.FlatList, Object.assign({ ref: (ref) => this.flatListRef = ref, data: this.getFilteredData(), keyExtractor: keyExtractor ? keyExtractor : this._keyExtractor.bind(this), renderItem: ({ item, index }) => this.renderItem(item, index), onScroll: showToTopButton && this.onScrolling.bind(this), initialNumToRender: this.numToRender, keyboardShouldPersistTaps: 'always', keyboardDismissMode: 'interactive', onEndReached: onEndReached, maxToRenderPerBatch: 20, legacyImplementation: false, updateCellsBatchingPeriod: 50, removeClippedSubviews: removeClippedSubviews, viewabilityConfig: {
                                    minimumViewTime: 500,
                                    viewAreaCoveragePercentThreshold: 100,
                                    waitForInteraction: true,
                                }, getItemLayout: (_, index) => ({
                                    length: _Styles_1.CommonStyle.BTN_HEIGHT,
                                    offset: _Styles_1.CommonStyle.BTN_HEIGHT * index,
                                    index,
                                }), onViewableItemsChanged: this._onViewableItemsChanged }, FlatListProps)),
                            !hideAlphabetFilter &&
                                React.createElement(_Components_1.AlphabetComponent, { setAlphabet: (alphabet) => this.setAlphabet(alphabet), alphabets: alphabets, selectedAlpha: selectedAlpha }))),
                    stickyBottomButton && React.createElement(_Components_1.ScrollToTopComponent, { goToUp: this.scrollToUp.bind(this) })))));
    }
    _onViewableItemsChanged({ viewableItems, changed }) {
        if (viewableItems && viewableItems[0]) {
            const firstLetter = viewableItems[0].item.Name.charAt(0);
            this.setState({
                selectedAlpha: firstLetter,
            });
        }
    }
    onClose() {
        const { onRequestClosed, onSelected, forceSelect, defaultSelected } = this.props;
        const { modalVisible, selectedObject } = this.state;
        if (forceSelect &&
            (selectedObject && ![selectedObject.Id]) &&
            (defaultSelected && ![defaultSelected.Id])) {
            return;
        }
        if (!forceSelect) {
            onSelected({});
        }
        this.setState({
            selectedObject: {},
            modalVisible: !modalVisible,
        });
        this.clearComponent();
        if (onRequestClosed) {
            onRequestClosed();
        }
    }
    onBackRequest() {
        const { onBackRequest, onSelected } = this.props;
        const { modalVisible } = this.state;
        this.setState({
            modalVisible: !modalVisible,
        });
        this.clearComponent();
        if (onBackRequest) {
            onBackRequest();
        }
    }
    scrollToUp() {
        if (this.flatListRef) {
            this.setState({
                selectedAlpha: null,
            }, () => {
                this.flatListRef.scrollToOffset({ animated: true, offset: 0 });
            });
        }
    }
    onScrolling(e) {
        const { contentOffset } = e.nativeEvent;
        if (contentOffset.y > 100) {
            this.setState({
                stickyBottomButton: true,
            });
        }
        else {
            this.setState({
                stickyBottomButton: false,
            });
        }
    }
    renderItem(item, index) {
        const { defaultSelected } = this.props;
        return React.createElement(_Components_1.ListItemComponent, { defaultSelected: defaultSelected, list: item, onSelectMethod: this.onSelectMethod.bind(this) });
    }
    generateAlphabet() {
        const { list, sortingLanguage } = this.props;
        const singularAlpha = [];
        list.map((x) => {
            if (singularAlpha.indexOf(x.Name.charAt(0)) === -1) {
                singularAlpha.push(x.Name.charAt(0));
            }
        });
        if (sortingLanguage === 'tr') {
            singularAlpha.sort(this.trCompare);
        }
        else {
            singularAlpha.sort((a, b) => a.localeCompare(b));
        }
        this.setState({
            alphabets: singularAlpha,
        });
    }
    _keyExtractor(item, index) {
        return index.toString();
    }
    setText(text) {
        this.setState({
            searchText: text,
        });
    }
    trCompare(a, b) {
        const alphabets = 'AaBbCcÇçDdEeFfGgĞğHhIıİiJjKkLlMmNnOoÖöPpQqRrSsŞşTtUuÜüVvWwXxYyZz0123456789';
        if (a.length === 0 || b.length === 0) {
            return a.length - b.length;
        }
        for (let i = 0; i < a.length && i < b.length; i++) {
            const ai = alphabets.indexOf(a[i]);
            const bi = alphabets.indexOf(b[i]);
            if (ai !== bi) {
                return ai - bi;
            }
        }
        return 0;
    }
    compare(a, b) {
        const aName = a.Name.toLocaleLowerCase();
        const bName = b.Name.toLocaleLowerCase();
        let comparison = 0;
        if (aName > bName) {
            comparison = 1;
        }
        else if (aName < bName) {
            comparison = -1;
        }
        return comparison;
    }
    getFilteredData() {
        const { list, autoSort } = this.props;
        const { searchText } = this.state;
        if (autoSort) {
            list.sort((a, b) => this.trCompare(a.Name, b.Name));
        }
        return list.filter((l) => l.Name.toLocaleLowerCase().indexOf(searchText.toLocaleLowerCase()) > -1);
    }
    onSelectMethod(key) {
        const { onSelected } = this.props;
        this.setState({
            modalVisible: false,
            selectedObject: key,
        });
        this.clearComponent();
        if (key && ![key.Id]) {
            return onSelected({});
        }
        return onSelected(key);
    }
    getIndex(alphabet) {
        const list = this.getFilteredData();
        const findIndex = list.findIndex((x) => {
            return x.Name.charAt(0) === alphabet;
        });
        return findIndex;
    }
    setAlphabet(alphabet) {
        this.setState({
            selectedAlpha: alphabet,
        }, () => {
            const list = this.getFilteredData();
            const findIndex = this.getIndex(alphabet);
            if (findIndex >= 0 && findIndex <= (list.length - (this.numToRender / 2))) {
                setTimeout(() => {
                    this.flatListRef.scrollToIndex({ animated: true, index: findIndex, viewPosition: 0 });
                }, 100);
            }
            else {
                this.flatListRef.scrollToEnd();
            }
        });
    }
}
ModalComponent.defaultProps = {
    showToTopButton: true,
    animationType: 'slide',
    hideAlphabetFilter: false,
    placeholderTextColor: '#252525',
    autoGenerateAlphabet: false,
    sortingLanguage: 'tr',
    removeClippedSubviews: false,
    chooseText: 'Choose one...',
    searchText: 'Search...',
    autoCorrect: true,
    autoSort: false,
    list: [],
    disabled: false,
    forceSelect: false,
};
exports.ModalComponent = ModalComponent;
//# sourceMappingURL=Modal.js.map