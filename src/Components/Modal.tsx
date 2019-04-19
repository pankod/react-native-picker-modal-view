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
			(this.props.defaultSelected && nextProps.defaultSelected) && this.props.defaultSelected.Name !== nextProps.defaultSelected.Name &&
			[this.props.defaultSelected.Id] !== [nextProps.defaultSelected.Id]
		) {
			this.setState({
				selectedObject: {} as IModalListInDto,
			});
		}
	}

	private clearComponent(): void {
		this.setState({
			stickyBottomButton: false,
			searchText: '',
			selectedAlpha: null,
		});
	}

	public componentWillMount(): void {
		const { autoGenerateAlphabet, alphaBets } = this.props;
		if (autoGenerateAlphabet) {
			this.generateAlphabet();
		} else if (alphaBets) {
			this.setState({
				alphaBets,
			});
		}
	}

	private openModal(): void {
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

	public render(): JSX.Element {
		const {
			animationType,
			onRequestClosed,
			hideAlphabetFilter,
			placeholderTextColor,
			keyExtractor,
			showToTopButton,
			onEndReached,
			removeClippedSubviews,
			FlatListProps,
			chooseText,
			searchText,
			autoCorrect,
			SearchInputProps,
			defaultSelected,
			disabled,
			list,
			forceSelect,
		} = this.props;
		const { modalVisible, alphaBets, stickyBottomButton, selectedAlpha, selectedObject } = this.state;
		return (
			<React.Fragment>
				<SelectBoxComponent
					disabled={(disabled || !list || list.length === 0)}
					selectedObject={selectedObject}
					chooseText={(defaultSelected && defaultSelected.Name) ? defaultSelected.Name : chooseText}
					openModal={this.openModal.bind(this)}
				/>
				<Modal
					animationType={animationType}
					visible={modalVisible}
					onRequestClose={() => onRequestClosed}>
					<SafeAreaView style={ModalStyles.container}>
						<SearchComponent
							autoCorrect={autoCorrect}
							searchText={searchText}
							placeholderTextColor={placeholderTextColor}
							onClose={this.onClose.bind(this)}
							onBackRequest={this.onBackRequest.bind(this)}
							forceSelect={forceSelect}
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
									keyExtractor={keyExtractor ? keyExtractor : this._keyExtractor.bind(this)}
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
									!hideAlphabetFilter &&
									<AlphabetComponent
										setAlphabet={(alphabet: string) => this.setAlphabet(alphabet)}
										alphaBets={alphaBets}
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

	private onClose(): void {
		const { onRequestClosed, onSelected, forceSelect, defaultSelected } = this.props;
		const { modalVisible, selectedObject } = this.state;

		if (
			forceSelect &&
			(selectedObject && ![selectedObject.Id]) &&
			(defaultSelected && ![defaultSelected.Id])
		) {
			return;
		}

		if (!forceSelect) {
			onSelected({} as IModalListInDto);
		}

		this.setState({
			selectedObject: {} as IModalListInDto,
			modalVisible: !modalVisible,
		});
		this.clearComponent();
		if (onRequestClosed) {
			onRequestClosed();
		}
	}

	private onBackRequest(): void {
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

	private scrollToUp(): void {
		if (this.flatListRef) {
			this.setState({
				selectedAlpha: null,
			}, () => {
				this.flatListRef.scrollToOffset({ animated: false, offset: 0 });
			});
		}
	}

	private onScrolling(e: NativeSyntheticEvent<NativeScrollEvent>): void {
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

	private renderItem(item: IModalListInDto, index: number): JSX.Element {
		const { defaultSelected } = this.props;
		return <ListItemComponent
			defaultSelected={defaultSelected}
			list={item}
			onSelectMethod={this.onSelectMethod.bind(this)}
		/>;
	}

	private generateAlphabet(): void {
		const { list, sortingLanguage } = this.props;
		const singularAlpha = [];
		list.map((x: IModalListInDto) => {
			if (singularAlpha.indexOf(x.Name.charAt(0)) === -1) {
				singularAlpha.push(x.Name.charAt(0));
			}
		});

		if (sortingLanguage === 'tr') {
			singularAlpha.sort(this.trCompare);
		} else {
			singularAlpha.sort((a, b) => a.localeCompare(b));
		}

		this.setState({
			alphaBets: singularAlpha,
		});
	}

	private _keyExtractor(item: IModalListInDto, index: number) {
		return index.toString();
	}

	private setText(text: string): void {
		this.setState({
			searchText: text,
		});
	}

	// source https://gist.github.com/ugurozpinar/9682734
	private trCompare(a: any, b: any): number {
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

	private getFilteredData(): IModalListInDto[] {
		const { list, autoSort } = this.props;
		const { searchText } = this.state;

		if (autoSort) {
			list.sort(this.compare);
		}
		return list.filter((l: IModalListInDto) => l.Name.toLocaleLowerCase().indexOf(searchText.toLocaleLowerCase()) > -1);
	}

	private onSelectMethod(key: IModalListInDto): IModalListInDto | void {
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

	private getIndex(alphabet: string): number {
		const list = this.getFilteredData();
		const findIndex = list.findIndex((x: IModalListInDto) => {
			return x.Name.charAt(0) === alphabet;
		});
		return findIndex;
	}

	private setAlphabet(alphabet: string): void {
		// const { list } = this.props;
		this.setState({
			selectedAlpha: alphabet,
		}, () => {
			const list = this.getFilteredData();
			const findIndex = this.getIndex(alphabet);
			if (findIndex >= 0 && findIndex <= (list.length - (this.numToRender / 2))) {
				setTimeout(() => {
					this.flatListRef.scrollToIndex({ animated: false, index: findIndex, viewPosition: 0 });
				}, 100);
			} else {
				this.flatListRef.scrollToEnd();
			}
		});
	}
}
