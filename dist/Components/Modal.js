import * as React from 'react';
import { Modal, View, FlatList, KeyboardAvoidingView, Dimensions, } from 'react-native';
import { AlphabetComponent, ListItemComponent, SearchComponent, ScrollToTopComponent, SelectBoxComponent, } from './';
import { ModalStyles } from '../Assets/Styles';
const { height } = Dimensions.get('window');
export class ModalComponent extends React.Component {
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
            this.props.defaultSelected.Id !== nextProps.defaultSelected.Id) {
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
        const { autoGenerateAlphabet, alphaBets } = this.props;
        if (autoGenerateAlphabet) {
            this.generateAlphabet();
        }
        else if (alphaBets) {
            this.setState({
                alphaBets,
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
        const { animationType, onRequestClosed, closeable, hideAlphabetFilter, placeholderTextColor, keyExtractor, showToTopButton, onEndReached, removeClippedSubviews, FlatListProps, chooseText, searchText, autoCorrect, SearchInputProps, defaultSelected, disabled, list, forceSelect, } = this.props;
        const { modalVisible, alphaBets, stickyBottomButton, selectedAlpha, selectedObject } = this.state;
        return (React.createElement(React.Fragment, null,
            React.createElement(SelectBoxComponent, { disabled: (disabled || !list || list.length === 0), selectedObject: selectedObject, chooseText: (defaultSelected && defaultSelected.Name) ? defaultSelected.Name : chooseText, openModal: this.openModal.bind(this) }),
            React.createElement(Modal, { animationType: animationType, visible: modalVisible, onRequestClose: () => onRequestClosed },
                React.createElement(View, { style: ModalStyles.container },
                    React.createElement(SearchComponent, Object.assign({ autoCorrect: autoCorrect, searchText: searchText, placeholderTextColor: placeholderTextColor, onClose: this.onClose.bind(this), onBackRequest: this.onBackRequest.bind(this), closeable: !forceSelect && closeable, setText: (text) => this.setText(text) }, SearchInputProps)),
                    React.createElement(KeyboardAvoidingView, { style: ModalStyles.keyboardContainer, behavior: "padding", enabled: true },
                        React.createElement(View, { style: ModalStyles.listArea },
                            React.createElement(FlatList, Object.assign({ ref: (ref) => this.flatListRef = ref, data: this.getFilteredData(), keyExtractor: keyExtractor ? keyExtractor : this._keyExtractor.bind(this), renderItem: ({ item, index }) => this.renderItem(item, index), onScroll: showToTopButton && this.onScrolling.bind(this), initialNumToRender: this.numToRender, keyboardShouldPersistTaps: 'always', keyboardDismissMode: 'on-drag', onEndReached: onEndReached, removeClippedSubviews: removeClippedSubviews, viewabilityConfig: {
                                    minimumViewTime: 100,
                                    viewAreaCoveragePercentThreshold: 100,
                                    waitForInteraction: true,
                                }, onViewableItemsChanged: this._onViewableItemsChanged }, FlatListProps)),
                            !hideAlphabetFilter &&
                                React.createElement(AlphabetComponent, { setAlphabet: (alphabet) => this.setAlphabet(alphabet), alphaBets: alphaBets, selectedAlpha: selectedAlpha }))),
                    stickyBottomButton && React.createElement(ScrollToTopComponent, { goToUp: () => this.scrollToUp() })))));
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
            (selectedObject && !selectedObject.Id) &&
            (defaultSelected && !defaultSelected.Id)) {
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
        return React.createElement(ListItemComponent, { defaultSelected: defaultSelected, list: item, onSelectMethod: this.onSelectMethod.bind(this) });
    }
    generateAlphabet() {
        const { list, sortingLanguage } = this.props;
        const singularAlpha = [];
        list.map((x) => {
            if (singularAlpha.indexOf(x.Name.charAt(0)) === -1) {
                singularAlpha.push(x.Name.charAt(0));
            }
        });
        singularAlpha.sort((a, b) => a.localeCompare(b, sortingLanguage));
        this.setState({
            alphaBets: singularAlpha,
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
            list.sort(this.compare);
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
        if (key && !key.Id) {
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
                this.flatListRef.scrollToIndex({ animated: true, index: findIndex, viewPosition: 0 });
            }
            else {
                this.flatListRef.scrollToEnd();
            }
        });
    }
}
ModalComponent.defaultProps = {
    animationType: 'slide',
    closeable: true,
    hideAlphabetFilter: false,
    placeholderTextColor: '#252525',
    autoGenerateAlphabet: false,
    sortingLanguage: 'tr',
    removeClippedSubviews: true,
    chooseText: 'Choose one...',
    searchText: 'Search anything...',
    autoCorrect: true,
    autoSort: false,
    list: [],
    disabled: false,
    forceSelect: false,
};
//# sourceMappingURL=Modal.js.map