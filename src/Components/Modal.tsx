// Global Imports
import * as React from 'react';
import { Modal, View, FlatList, KeyboardAvoidingView, NativeSyntheticEvent, NativeScrollEvent, Platform, SafeAreaView, TouchableOpacity } from 'react-native';
// Local Imports
import { AlphabetComponent, ListItemComponent, SearchComponent, ScrollToTopComponent, SelectBoxComponent } from '@Components';
import { IModalProps, IModalListInDto, IModalState } from '@Interfaces';
import { ModalStyles, CommonStyle } from '@Styles';
import { generateAlphabet, getFilteredData, getIndex } from '@Helpers';
export class ModalComponent extends React.PureComponent<IModalProps, IModalState> {

	private flatListRef = null;
	private numToRender: number = 20;

	public state: IModalState = {
		modalVisible: false,
		searchText: '',
		stickyBottomButton: false,
		selectedAlpha: null,
		selectedObject: {} as IModalListInDto,
	};

	public static defaultProps = { showToTopButton: true, modalAnimationType: 'slide', showAlphabeticalIndex: false, searchInputTextColor: '#252525', autoGenerateAlphabeticalIndex: false, sortingLanguage: 'tr', removeClippedSubviews: false, selectPlaceholderText: 'Choose one...', searchPlaceholderText: 'Search...', autoSort: false, items: [], disabled: false, requireSelection: false, };
	private viewabilityConfig: { minimumViewTime: number; waitForInteraction: boolean; viewAreaCoveragePercentThreshold: number; };

	constructor(props: IModalProps) {
		super(props);
		this._onViewableItemsChanged = this._onViewableItemsChanged.bind(this);
		this.viewabilityConfig = {
			minimumViewTime: 500,
			waitForInteraction: true,
			viewAreaCoveragePercentThreshold: 95
		}
	}
	private _clearComponent(): void {
		this.setState({
			stickyBottomButton: false,
			searchText: '',
			selectedAlpha: null,
		});
	}

	public clearComponent(): void {
		this._clearComponent();
	}

	public componentDidMount(): void {
		const { autoGenerateAlphabeticalIndex, alphabeticalIndexChars, items, sortingLanguage } = this.props;
		if (autoGenerateAlphabeticalIndex) {
			this.setState({ alphabeticalIndexChars: generateAlphabet(items, sortingLanguage) });
		} else if (alphabeticalIndexChars) {
			this.setState({
				alphabeticalIndexChars,
			});
		}
	}

	private _openModal(): void {
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

	public openModal(): void {
		this._openModal();
	}

	public render(): JSX.Element {
		const { autoSort, modalAnimationType, onClosed, showAlphabeticalIndex, searchInputTextColor, keyExtractor, showToTopButton, onEndReached, removeClippedSubviews, FlatListProps, selectPlaceholderText, searchPlaceholderText, SearchInputProps, selected, disabled, items, requireSelection, renderSelectView, ModalProps, backButtonDisabled, renderSearch } = this.props;

		const { modalVisible, alphabeticalIndexChars, stickyBottomButton, selectedAlpha, selectedObject, searchText } = this.state;

		return (
			<React.Fragment>
				<SelectBoxComponent
					renderSelectView={renderSelectView}
					items={items}
					disabled={disabled}
					selectedObject={selectedObject}
					chooseText={(selected && selected.Name) ? selected.Name : selectPlaceholderText}
					openModal={this.openModal.bind(this)}
				/>
				<Modal
					animationType={modalAnimationType}
					visible={modalVisible}
					onRequestClose={() => onClosed}
					{...ModalProps}
				>
					<SafeAreaView style={ModalStyles.container}>
						{
							renderSearch ? renderSearch(
									this.onClose.bind(this), 
									this.onBackRequest.bind(this)
								) : (
								<SearchComponent
									searchText={searchPlaceholderText}
									placeholderTextColor={searchInputTextColor}
									onClose={this.onClose.bind(this)}
									onBackRequest={this.onBackRequest.bind(this)}
									forceSelect={requireSelection}
									setText={(text: string) => this.setText(text)}
									backButtonDisabled={backButtonDisabled}
									{...SearchInputProps}
								/>
							)
						}
						<KeyboardAvoidingView style={ModalStyles.keyboardContainer}
							behavior={Platform.OS === 'ios' ? 'padding' : null}
							enabled>
							<View style={ModalStyles.listArea}>
								<FlatList
									ref={(ref) => this.flatListRef = ref}
									keyExtractor={keyExtractor ? keyExtractor : (item, index) => index.toString()}
									data={getFilteredData(items, autoSort, searchText)}
									renderItem={({ item, index }) => this.renderItem(item, index)}
									onScroll={showToTopButton && this.onScrolling.bind(this)}
									initialNumToRender={this.numToRender}
									keyboardShouldPersistTaps={'always'}
									keyboardDismissMode={'interactive'}
									onEndReached={onEndReached}
									maxToRenderPerBatch={20}
									legacyImplementation={false}
									updateCellsBatchingPeriod={50}
									removeClippedSubviews={removeClippedSubviews}
									viewabilityConfig={this.viewabilityConfig}
									getItemLayout={(_, index) => ({
										length: CommonStyle.BTN_HEIGHT,
										offset: CommonStyle.BTN_HEIGHT * index,
										index
									})}
									onViewableItemsChanged={this._onViewableItemsChanged}
									{...FlatListProps}
								/>
								<AlphabetComponent
									showAlphabeticalIndex={showAlphabeticalIndex}
									setAlphabet={(alphabet: string) => this.setAlphabet(alphabet)}
									alphabets={alphabeticalIndexChars}
									selectedAlpha={selectedAlpha}
								/>
							</View>
						</KeyboardAvoidingView>
						<ScrollToTopComponent goToUp={this.scrollToUp.bind(this)} stickyBottomButton={stickyBottomButton} />
					</SafeAreaView>
				</Modal>
			</React.Fragment >
		);
	}

	private _onViewableItemsChanged({ viewableItems }): void {
		if (viewableItems && viewableItems[0]) {
			const firstLetter = viewableItems[0].item.Name.charAt(0);
			this.setState({
				selectedAlpha: firstLetter,
			});
		}
	}

	private _onClose(): void {
		const { onClosed, onSelected, requireSelection, selected } = this.props;
		const { modalVisible, selectedObject } = this.state;

		if (requireSelection && (selectedObject && ![selectedObject.Id]) && (selected && ![selected.Id])) return;

		if (!requireSelection) {
			onSelected({} as IModalListInDto);
		}

		this.setState({
			selectedObject: {} as IModalListInDto,
			modalVisible: !modalVisible,
		});
		this.clearComponent();
		if (onClosed) {
			onClosed();
		}
	}

	public onClose(): void {
		this._onClose();
	}

	private _onBackRequest(): void {
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

	public onBackRequest(): void {
		this._onBackRequest();
	}

	private _scrollToUp(): void {
		if (this.flatListRef) {
			this.setState({
				selectedAlpha: null,
			}, () => {
				this.flatListRef.scrollToOffset({ animated: true, offset: 0 });
			});
		}
	}

	public scrollToUp(): void {
		this._scrollToUp();
	}

	private _onScrolling(e: NativeSyntheticEvent<NativeScrollEvent>): void {
		const { contentOffset } = e.nativeEvent;

		if (contentOffset.y > 100) {
			this.setState({
				stickyBottomButton: true,
			});
		} else {
			this.setState({
				stickyBottomButton: false,
			});
		}
	}

	public onScrolling(e: NativeSyntheticEvent<NativeScrollEvent>): void {
		this._onScrolling(e);
	}

	private _renderItem(item: IModalListInDto, index: number): JSX.Element {
		const { selected, renderListItem } = this.props;

		return (
			(renderListItem &&
				<TouchableOpacity
					key={index.toString()}
					onPress={() => this.onSelectMethod(item)}
				>
					{renderListItem(selected, item)}
				</TouchableOpacity>)
			||
			<ListItemComponent
				key={index.toString()}
				defaultSelected={selected}
				list={item}
				onSelectMethod={this.onSelectMethod.bind(this)}
			/>
		)
	}

	public renderItem(item: IModalListInDto, index: number): JSX.Element {
		return this._renderItem(item, index);
	}

	private _setText(text: string): void {
		this.setState({
			searchText: text,
		});
	}

	public setText(text: string): void {
		this._setText(text);
	}

	private _onSelectMethod(key: IModalListInDto): IModalListInDto | void {
		const { onSelected } = this.props;
		this.setState({
			modalVisible: false,
			selectedObject: key as IModalListInDto,
		});
		this.clearComponent();

		if (key && ![key.Id]) {
			return onSelected({} as IModalListInDto);
		}

		return onSelected(key);
	}

	public onSelectMethod(key: IModalListInDto): IModalListInDto | void {
		return this._onSelectMethod(key);
	}

	private _setAlphabet(alphabet: string): void {
		this.setState({
			selectedAlpha: alphabet,
		}, () => {
			const list = getFilteredData(this.props.items, this.props.autoSort, this.state.searchText);
			const findIndex = getIndex(alphabet, this.props.items, this.props.autoSort, this.state.searchText);

			if (findIndex >= 0 && findIndex <= (list.length - (this.numToRender / 2))) {
				setTimeout(() => {
					this.flatListRef.scrollToIndex({ animated: true, index: findIndex, viewPosition: 0 });
				}, 100);
			} else {
				this.flatListRef.scrollToEnd();
			}
		});
	}

	public setAlphabet(alphabet: string): void {
		this._setAlphabet(alphabet);
	}
}
