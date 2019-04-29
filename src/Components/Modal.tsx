// Global Imports
import * as React from 'react';
import {
	Modal,
	View,
	FlatList,
	KeyboardAvoidingView,
	NativeSyntheticEvent,
	NativeScrollEvent,
	Platform,
	SafeAreaView,
} from 'react-native';

// Local Imports
import {
	AlphabetComponent,
	ListItemComponent,
	SearchComponent,
	ScrollToTopComponent,
	SelectBoxComponent,
} from '@Components';
import { IModalInDtoProps, IModalListInDto, IModalInDtoState } from '@Interfaces';
import { ModalStyles, CommonStyle } from '@Styles';

export class ModalComponent extends React.PureComponent<IModalInDtoProps, IModalInDtoState> {

	private flatListRef = null;
	private numToRender: number = 20;

	public state: IModalInDtoState = {
		modalVisible: false,
		searchText: '',
		stickyBottomButton: false,
		selectedAlpha: null,
		selectedObject: {} as IModalListInDto,
	};

	public static defaultProps = {
		showToTopButton: true,
		modalAnimationType: 'slide',
		showAlphabeticalIndex: false,
		searchInputTextColor: '#252525',
		autoGenerateAlphabeticalIndex: false,
		sortingLanguage: 'tr',
		removeClippedSubviews: false,
		selectPlaceholderText: 'Choose one...',
		searchPlaceholderText: 'Search...',
		autoSort: false,
		items: [],
		disabled: false,
		requireSelection: false,
	};

	constructor(props: IModalInDtoProps) {
		super(props);
		this._onViewableItemsChanged = this._onViewableItemsChanged.bind(this);
	}

	public componentWillUnmount(): void {
		this.clearComponent();
	}

	public componentWillReceiveProps(nextProps, nextState): void {
		if (
			// tslint:disable-next-line: max-line-length
			(this.props.selected && nextProps.selected) && this.props.selected.Name !== nextProps.selected.Name &&
			[this.props.selected.Id] !== [nextProps.selected.Id]
		) {
			this.setState({
				selectedObject: {} as IModalListInDto,
			});
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

	public componentWillMount(): void {
		const { autoGenerateAlphabeticalIndex, alphabeticalIndexChars } = this.props;
		if (autoGenerateAlphabeticalIndex) {
			this.generateAlphabet();
		} else if (alphabeticalIndexChars) {
			this.setState({
				alphabeticalIndexChars,
			});
		}
	}

	private _openModal(): void {
		const { items, autoGenerateAlphabeticalIndex, disabled } = this.props;

		if (autoGenerateAlphabeticalIndex) {
			this.generateAlphabet();
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
		const {
			modalAnimationType,
			onClosed,
			showAlphabeticalIndex,
			searchInputTextColor,
			keyExtractor,
			showToTopButton,
			onEndReached,
			removeClippedSubviews,
			FlatListProps,
			selectPlaceholderText,
			searchPlaceholderText,
			SearchInputProps,
			selected,
			disabled,
			items,
			requireSelection,
		} = this.props;
		const { modalVisible, alphabeticalIndexChars, stickyBottomButton, selectedAlpha, selectedObject } = this.state;
		return (
			<React.Fragment>
				<SelectBoxComponent
					disabled={(disabled || !items || items.length === 0)}
					selectedObject={selectedObject}
					chooseText={(selected && selected.Name) ? selected.Name : selectPlaceholderText}
					openModal={this.openModal.bind(this)}
				/>
				<Modal
					animationType={modalAnimationType}
					visible={modalVisible}
					onRequestClose={() => onClosed}>
					<SafeAreaView style={ModalStyles.container}>
						<SearchComponent
							searchText={searchPlaceholderText}
							placeholderTextColor={searchInputTextColor}
							onClose={this.onClose.bind(this)}
							onBackRequest={this.onBackRequest.bind(this)}
							forceSelect={requireSelection}
							setText={(text: string) => this.setText(text)}
							{...SearchInputProps}
						/>
						<KeyboardAvoidingView style={ModalStyles.keyboardContainer}
							behavior={Platform.OS === 'ios' ? 'padding' : null}
							enabled>
							<View style={ModalStyles.listArea}>

								<FlatList
									ref={(ref) => this.flatListRef = ref}
									data={this.getFilteredData()}
									keyExtractor={keyExtractor ? keyExtractor : this.keyExtractor.bind(this)}
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
									viewabilityConfig={{
										minimumViewTime: 500,
										viewAreaCoveragePercentThreshold: 100,
										waitForInteraction: true,
									}}
									getItemLayout={(_, index) => ({
										length: CommonStyle.BTN_HEIGHT,
										offset: CommonStyle.BTN_HEIGHT * index,
										index,
									})}
									onViewableItemsChanged={this._onViewableItemsChanged}
									{...FlatListProps}
								/>

								{
									!showAlphabeticalIndex &&
									<AlphabetComponent
										setAlphabet={(alphabet: string) => this.setAlphabet(alphabet)}
										alphabets={alphabeticalIndexChars}
										selectedAlpha={selectedAlpha}
									/>
								}
							</View>
						</KeyboardAvoidingView>
						{stickyBottomButton && <ScrollToTopComponent goToUp={this.scrollToUp.bind(this)} />}
					</SafeAreaView>
				</Modal>
			</React.Fragment >
		);
	}

	private _onViewableItemsChanged({ viewableItems, changed }): void {
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

		if (
			requireSelection &&
			(selectedObject && ![selectedObject.Id]) &&
			(selected && ![selected.Id])
		) {
			return;
		}

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
		const { selected } = this.props;
		return <ListItemComponent
			key={index.toString()}
			defaultSelected={selected}
			list={item}
			onSelectMethod={this.onSelectMethod.bind(this)}
		/>;
	}

	private renderItem(item: IModalListInDto, index: number): JSX.Element {
		return this._renderItem(item, index);
	}

	private _generateAlphabet(): void {
		const { items, sortingLanguage } = this.props;
		const singularAlpha = [];
		items.map((x: IModalListInDto) => {
			if (singularAlpha.indexOf(x.Name.charAt(0)) === -1) {
				singularAlpha.push(x.Name.charAt(0));
			}
		});

		if (sortingLanguage === 'tr') {
			singularAlpha.sort((a, b) => this.trCompare(a, b));
		} else {
			singularAlpha.sort((a, b) => a.localeCompare(b));
		}

		this.setState({
			alphabeticalIndexChars: singularAlpha,
		});
	}

	public generateAlphabet(): void {
		this._generateAlphabet();
	}

	private _keyExtractor(item: IModalListInDto, index: number): string {
		return index.toString();
	}

	public keyExtractor(item: IModalListInDto, index: number): string {
		return this._keyExtractor(item, index);
	}

	private _setText(text: string): void {
		this.setState({
			searchText: text,
		});
	}

	public setText(text: string): void {
		this._setText(text);
	}

	// source https://gist.github.com/ugurozpinar/9682734
	private _trCompare(a: any, b: any): number {
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

	public trCompare(a: any, b: any): number {
		return this._trCompare(a, b);
	}

	private compare(a: any, b: any): number {
		const aName = a.Name.toLocaleLowerCase();
		const bName = b.Name.toLocaleLowerCase();

		let comparison = 0;
		if (aName > bName) {
			comparison = 1;
		} else if (aName < bName) {
			comparison = -1;
		}
		return comparison;
	}

	private _getFilteredData(): IModalListInDto[] {
		const { items, autoSort } = this.props;
		const { searchText } = this.state;

		if (autoSort) {
			items.sort((a, b) => this.trCompare(a.Name, b.Name));
		}

		return items.filter((l: IModalListInDto) => l.Name.toLocaleLowerCase().indexOf(searchText.toLocaleLowerCase()) > -1);
	}

	public getFilteredData(): IModalListInDto[] {
		return this._getFilteredData();
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

	private _getIndex(alphabet: string): number {
		const list = this.getFilteredData();
		const findIndex = list.findIndex((x: IModalListInDto) => {
			return x.Name.charAt(0) === alphabet;
		});
		return findIndex;
	}

	public getIndex(alphabet: string): number {
		return this._getIndex(alphabet);
	}

	private _setAlphabet(alphabet: string): void {
		// const { list } = this.props;
		this.setState({
			selectedAlpha: alphabet,
		}, () => {
			const list = this.getFilteredData();
			const findIndex = this.getIndex(alphabet);
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
