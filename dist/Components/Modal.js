import * as React from 'react';
import { Modal, View, FlatList, KeyboardAvoidingView, Platform, SafeAreaView, TouchableOpacity } from 'react-native';
import { AlphabetComponent, ListItemComponent, SearchComponent, ScrollToTopComponent, SelectBoxComponent } from './';
import { ModalStyles, CommonStyle } from '../Assets/Styles';
import { generateAlphabet, getFilteredData, getIndex } from '../Helpers';
export class ModalComponent extends React.PureComponent {
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
        this.viewabilityConfig = {
            minimumViewTime: 500,
            waitForInteraction: true,
            viewAreaCoveragePercentThreshold: 95
        };
    }
    _clearComponent() {
        this.setState({
            stickyBottomButton: false,
            searchText: '',
            selectedAlpha: null,
        });
    }
    clearComponent() {
        this._clearComponent();
    }
    componentDidMount() {
        const { autoGenerateAlphabeticalIndex, alphabeticalIndexChars, items, sortingLanguage } = this.props;
        if (autoGenerateAlphabeticalIndex) {
            this.setState({ alphabeticalIndexChars: generateAlphabet(items, sortingLanguage) });
        }
        else if (alphabeticalIndexChars) {
            this.setState({
                alphabeticalIndexChars,
            });
        }
    }
    _openModal() {
        const { items, autoGenerateAlphabeticalIndex, disabled, sortingLanguage } = this.props;
        if (autoGenerateAlphabeticalIndex) {
            this.setState({ alphabeticalIndexChars: generateAlphabet(items, sortingLanguage) });
        }
        if (items.length > 0 && !disabled) {
            this.setState({
                modalVisible: true,
            });
        }
    }
    openModal() {
        this._openModal();
    }
    render() {
        const { autoSort, modalAnimationType, onClosed, showAlphabeticalIndex, searchInputTextColor, keyExtractor, showToTopButton, onEndReached, removeClippedSubviews, FlatListProps, selectPlaceholderText, searchPlaceholderText, SearchInputProps, selected, disabled, items, requireSelection, renderSelectView, ModalProps, backButtonDisabled, renderSearch } = this.props;
        const { modalVisible, alphabeticalIndexChars, stickyBottomButton, selectedAlpha, selectedObject, searchText } = this.state;
        return (React.createElement(React.Fragment, null,
            React.createElement(SelectBoxComponent, { renderSelectView: renderSelectView, items: items, disabled: disabled, selectedObject: selectedObject, chooseText: (selected && selected.Name) ? selected.Name : selectPlaceholderText, openModal: this.openModal.bind(this) }),
            React.createElement(Modal, Object.assign({ animationType: modalAnimationType, visible: modalVisible, onRequestClose: () => onClosed }, ModalProps),
                React.createElement(SafeAreaView, { style: ModalStyles.container },
                    renderSearch ? renderSearch(this.onClose.bind(this), this.onBackRequest.bind(this)) : (React.createElement(SearchComponent, Object.assign({ searchText: searchPlaceholderText, placeholderTextColor: searchInputTextColor, onClose: this.onClose.bind(this), onBackRequest: this.onBackRequest.bind(this), forceSelect: requireSelection, setText: (text) => this.setText(text), backButtonDisabled: backButtonDisabled }, SearchInputProps))),
                    React.createElement(KeyboardAvoidingView, { style: ModalStyles.keyboardContainer, behavior: Platform.OS === 'ios' ? 'padding' : null, enabled: true },
                        React.createElement(View, { style: ModalStyles.listArea },
                            React.createElement(FlatList, Object.assign({ ref: (ref) => this.flatListRef = ref, keyExtractor: keyExtractor ? keyExtractor : (item, index) => index.toString(), data: getFilteredData(items, autoSort, searchText), renderItem: ({ item, index }) => this.renderItem(item, index), onScroll: showToTopButton && this.onScrolling.bind(this), initialNumToRender: this.numToRender, keyboardShouldPersistTaps: 'always', keyboardDismissMode: 'interactive', onEndReached: onEndReached, maxToRenderPerBatch: 20, legacyImplementation: false, updateCellsBatchingPeriod: 50, removeClippedSubviews: removeClippedSubviews, viewabilityConfig: this.viewabilityConfig, getItemLayout: (_, index) => ({
                                    length: CommonStyle.BTN_HEIGHT,
                                    offset: CommonStyle.BTN_HEIGHT * index,
                                    index
                                }), onViewableItemsChanged: this._onViewableItemsChanged }, FlatListProps)),
                            React.createElement(AlphabetComponent, { showAlphabeticalIndex: showAlphabeticalIndex, setAlphabet: (alphabet) => this.setAlphabet(alphabet), alphabets: alphabeticalIndexChars, selectedAlpha: selectedAlpha }))),
                    React.createElement(ScrollToTopComponent, { goToUp: this.scrollToUp.bind(this), stickyBottomButton: stickyBottomButton })))));
    }
    _onViewableItemsChanged({ viewableItems }) {
        if (viewableItems && viewableItems[0]) {
            const firstLetter = viewableItems[0].item.Name.charAt(0);
            this.setState({
                selectedAlpha: firstLetter,
            });
        }
    }
    _onClose() {
        const { onClosed, onSelected, requireSelection, selected } = this.props;
        const { modalVisible, selectedObject } = this.state;
        if (requireSelection && (selectedObject && ![selectedObject.Id]) && (selected && ![selected.Id]))
            return;
        if (!requireSelection) {
            onSelected({});
        }
        this.setState({
            selectedObject: {},
            modalVisible: !modalVisible,
        });
        this.clearComponent();
        if (onClosed) {
            onClosed();
        }
    }
    onClose() {
        this._onClose();
    }
    _onBackRequest() {
        const { onBackButtonPressed } = this.props;
        const { modalVisible } = this.state;
        this.setState({
            modalVisible: !modalVisible,
        });
        this.clearComponent();
        if (onBackButtonPressed) {
            onBackButtonPressed();
        }
    }
    onBackRequest() {
        this._onBackRequest();
    }
    _scrollToUp() {
        if (this.flatListRef) {
            this.setState({
                selectedAlpha: null,
            }, () => {
                this.flatListRef.scrollToOffset({ animated: true, offset: 0 });
            });
        }
    }
    scrollToUp() {
        this._scrollToUp();
    }
    _onScrolling(e) {
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
    onScrolling(e) {
        this._onScrolling(e);
    }
    _renderItem(item, index) {
        const { selected, renderListItem } = this.props;
        return ((renderListItem &&
            React.createElement(TouchableOpacity, { key: index.toString(), onPress: () => this.onSelectMethod(item) }, renderListItem(selected, item)))
            ||
                React.createElement(ListItemComponent, { key: index.toString(), defaultSelected: selected, list: item, onSelectMethod: this.onSelectMethod.bind(this) }));
    }
    renderItem(item, index) {
        return this._renderItem(item, index);
    }
    _setText(text) {
        this.setState({
            searchText: text,
        });
    }
    setText(text) {
        this._setText(text);
    }
    _onSelectMethod(key) {
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
    onSelectMethod(key) {
        return this._onSelectMethod(key);
    }
    _setAlphabet(alphabet) {
        this.setState({
            selectedAlpha: alphabet,
        }, () => {
            const list = getFilteredData(this.props.items, this.props.autoSort, this.state.searchText);
            const findIndex = getIndex(alphabet, this.props.items, this.props.autoSort, this.state.searchText);
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
    setAlphabet(alphabet) {
        this._setAlphabet(alphabet);
    }
}
ModalComponent.defaultProps = { showToTopButton: true, modalAnimationType: 'slide', showAlphabeticalIndex: false, searchInputTextColor: '#252525', autoGenerateAlphabeticalIndex: false, sortingLanguage: 'tr', removeClippedSubviews: false, selectPlaceholderText: 'Choose one...', searchPlaceholderText: 'Search...', autoSort: false, items: [], disabled: false, requireSelection: false, };
//# sourceMappingURL=Modal.js.map