import * as React from 'react';
import { Modal, SafeAreaView, View, FlatList, KeyboardAvoidingView, Dimensions, } from 'react-native';
import { AlphabetComponent, ListItemComponent, SearchComponent, ScrollToTopComponent } from './';
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
        };
        this._onViewableItemsChanged = this._onViewableItemsChanged.bind(this);
    }
    componentWillMount() {
        const { autoGenerateAlphabet, alphaBets, modalVisible } = this.props;
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
    render() {
        const { animationType, onRequestClosed, closeable, hideAlphabetFilter, placeholderTextColor, keyExtractor, showToTopButton, onEndReached, removeClippedSubviews, flatListProps, } = this.props;
        const { modalVisible, alphaBets, stickyBottomButton, selectedAlpha } = this.state;
        return (React.createElement(Modal, { animationType: animationType, visible: modalVisible, onRequestClose: () => onRequestClosed },
            React.createElement(SafeAreaView, { style: ModalStyles.container },
                React.createElement(SearchComponent, { placeholderTextColor: placeholderTextColor, onClose: this.onClose.bind(this), closeable: closeable, setText: (text) => this.setText(text) }),
                React.createElement(KeyboardAvoidingView, { style: ModalStyles.keyboardContainer, behavior: "padding", enabled: true },
                    React.createElement(View, { style: ModalStyles.listArea },
                        React.createElement(FlatList, Object.assign({ ref: (ref) => this.flatListRef = ref, data: this.getFilteredData(), keyExtractor: keyExtractor ? keyExtractor : this._keyExtractor.bind(this), renderItem: ({ item, index }) => this.renderItem(item, index), onScroll: showToTopButton && this.onScrolling.bind(this), initialNumToRender: 20, onEndReached: onEndReached, removeClippedSubviews: removeClippedSubviews, viewabilityConfig: {
                                minimumViewTime: 1000,
                                viewAreaCoveragePercentThreshold: 50,
                                waitForInteraction: true,
                            }, onViewableItemsChanged: this._onViewableItemsChanged }, flatListProps)),
                        !hideAlphabetFilter &&
                            React.createElement(AlphabetComponent, { setAlphabet: (alphabet) => this.setAlphabet(alphabet), alphaBets: alphaBets, selectedAlpha: selectedAlpha }))),
                stickyBottomButton && React.createElement(ScrollToTopComponent, { goToUp: () => this.scrollToUp() }))));
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
        return React.createElement(ListItemComponent, { list: item, onChangeMethod: this.onChangeMethod.bind(this) });
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
        const { list } = this.props;
        const { searchText } = this.state;
        return list.filter((l) => l.Name.toLocaleLowerCase().indexOf(searchText.toLocaleLowerCase()) > -1);
    }
    onChangeMethod(key) {
        const { onSelected } = this.props;
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
};
//# sourceMappingURL=Modal.js.map