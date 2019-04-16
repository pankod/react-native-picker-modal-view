import * as React from 'react';
import { Modal, SafeAreaView, View, FlatList, KeyboardAvoidingView, Dimensions, } from 'react-native';
import { AlphabetComponent, ListItemComponent, SearchComponent, ScrollToTopComponent, SelectBoxComponent, } from './';
import { ModalStyles } from '../Assets/Styles';
const { height } = Dimensions.get('window');
export class ModalComponent extends React.Component {
    constructor(props) {
        super(props);
        this.flatListRef = null;
        this.state = {
            modalVisible: false,
            searchText: '',
            stickyBottomButton: false,
            selectedAlpha: null,
            selectedObject: null,
        };
        this._onViewableItemsChanged = this._onViewableItemsChanged.bind(this);
    }
    componentWillUnmount() {
        this.clearComponent();
    }
    clearComponent() {
        this.setState({
            searchText: '',
            selectedAlpha: null,
        });
    }
    componentWillMount() {
        const { autoGenerateAlphabet, alphaBets, modalVisible, defaultSelected } = this.props;
        if (autoGenerateAlphabet) {
            this.generateAlphabet();
        }
        else if (alphaBets) {
            this.setState({
                alphaBets,
            });
        }
        this.setState({
            modalVisible,
        });
    }
    componentWillReceiveProps(nextProps, nextState) {
        const { modalVisible } = this.state;
        if (modalVisible !== nextProps.modalVisible) {
            this.setState({
                modalVisible: !modalVisible,
            });
        }
    }
    openModal() {
        this.setState({
            modalVisible: true,
        });
    }
    render() {
        const { animationType, onRequestClosed, closeable, hideAlphabetFilter, placeholderTextColor, keyExtractor, showToTopButton, onEndReached, removeClippedSubviews, FlatListProps, chooseText, searchText, autoCorrect, SearchInputProps, } = this.props;
        const { modalVisible, alphaBets, stickyBottomButton, selectedAlpha, selectedObject } = this.state;
        return (React.createElement(React.Fragment, null,
            React.createElement(SelectBoxComponent, { selectedObject: selectedObject, chooseText: chooseText, openModal: this.openModal.bind(this) }),
            React.createElement(Modal, { animationType: animationType, visible: modalVisible, onRequestClose: () => onRequestClosed },
                React.createElement(SafeAreaView, { style: ModalStyles.container },
                    React.createElement(SearchComponent, Object.assign({ autoCorrect: autoCorrect, searchText: searchText, placeholderTextColor: placeholderTextColor, onClose: this.onClose.bind(this), closeable: closeable, setText: (text) => this.setText(text) }, SearchInputProps)),
                    React.createElement(KeyboardAvoidingView, { style: ModalStyles.keyboardContainer, behavior: "padding", enabled: true },
                        React.createElement(View, { style: ModalStyles.listArea },
                            React.createElement(FlatList, Object.assign({ ref: (ref) => this.flatListRef = ref, data: this.getFilteredData(), keyExtractor: keyExtractor ? keyExtractor : this._keyExtractor.bind(this), renderItem: ({ item, index }) => this.renderItem(item, index), onScroll: showToTopButton && this.onScrolling.bind(this), initialNumToRender: 20, keyboardShouldPersistTaps: 'always', keyboardDismissMode: 'on-drag', onEndReached: onEndReached, removeClippedSubviews: removeClippedSubviews, viewabilityConfig: {
                                    minimumViewTime: 1000,
                                    viewAreaCoveragePercentThreshold: 50,
                                    waitForInteraction: true,
                                }, onViewableItemsChanged: this._onViewableItemsChanged }, FlatListProps)),
                            !hideAlphabetFilter &&
                                React.createElement(AlphabetComponent, { setAlphabet: (alphabet) => this.setAlphabet(alphabet), alphaBets: alphaBets, selectedAlpha: selectedAlpha }))),
                    stickyBottomButton && React.createElement(ScrollToTopComponent, { goToUp: () => this.scrollToUp() })))));
    }
    _onViewableItemsChanged({ viewableItems, changed }) {
        if (viewableItems && viewableItems[0]) {
            const firstLetter = viewableItems[0].item.Name.charAt(0) || viewableItems[0].item.Value.charAt(0);
            this.setState({
                selectedAlpha: firstLetter,
            });
        }
    }
    onClose() {
        const { onRequestClosed, modalVisible } = this.props;
        this.setState({
            modalVisible: !modalVisible,
        });
        this.clearComponent();
        onRequestClosed();
    }
    scrollToUp() {
        if (this.flatListRef) {
            this.flatListRef.scrollToIndex({ animated: true, index: 0 });
            this.setState({
                selectedAlpha: null,
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
    getFilteredData() {
        const { list, defaultSelected } = this.props;
        const { searchText } = this.state;
        return list.filter((l) => l.Name.toLocaleLowerCase().indexOf(searchText.toLocaleLowerCase()) > -1);
    }
    onSelectMethod(key) {
        const { onSelected } = this.props;
        this.setState({
            selectedObject: key,
        });
        console.log(key);
        this.clearComponent();
        return onSelected(key);
    }
    getIndex(alphabet) {
        const list = this.getFilteredData();
        const findIndex = list.findIndex((x) => {
            return x.Name.charAt(0) === alphabet || x.Value.charAt(0) === alphabet;
        });
        return findIndex;
    }
    setAlphabet(alphabet) {
        this.setState({
            selectedAlpha: alphabet,
        }, () => {
            const findIndex = this.getIndex(alphabet);
            if (findIndex >= 0) {
                this.flatListRef.scrollToIndex({ animated: true, index: findIndex, viewPosition: 0 });
            }
        });
    }
}
ModalComponent.defaultProps = {
    animationType: 'slide',
    closeable: true,
    hideAlphabetFilter: false,
    placeholderTextColor: '#252525',
    modalVisible: false,
    autoGenerateAlphabet: false,
    sortingLanguage: 'tr',
    removeClippedSubviews: true,
    chooseText: 'Choose one...',
    searchText: 'Search anything...',
    autoCorrect: true,
};
//# sourceMappingURL=Modal.js.map