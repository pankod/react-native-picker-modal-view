// Global Imports
import * as React from 'react';
import {
	Modal,
	SafeAreaView,
	View,
	FlatList,
	KeyboardAvoidingView,
	Dimensions,
	NativeSyntheticEvent,
	NativeScrollEvent,
} from 'react-native';

// Local Imports
import { AlphabetComponent, ListItemComponent, SearchComponent, ScrollToTopComponent } from '@Components';
import { IModalInDtoProps, IModalListInDto, IModalInDtoState } from '@Interfaces';
import { ModalStyles } from '@Styles';

const { height } = Dimensions.get('window');
export class ModalComponent extends React.Component<IModalInDtoProps, IModalInDtoState> {

	private flatListRef = null;

	public state: IModalInDtoState = {
		modalVisible: false,
		searchText: '',
		stickyBottomButton: false,
		selectedAlpha: null,
	};

	public static defaultProps = {
		animationType: 'slide',
		closeable: true,
		hideAlphabetFilter: false,
		placeholderTextColor: '#252525',
		modalVisible: false,
		autoGenerateAlphabet: false,
		sortingLanguage: 'tr',
		removeClippedSubviews: true,
	};

	constructor(props: IModalInDtoProps) {
		super(props);
		this._onViewableItemsChanged = this._onViewableItemsChanged.bind(this);
	}

	public componentWillMount(): void {
		const { autoGenerateAlphabet, alphaBets, modalVisible } = this.props;
		if (autoGenerateAlphabet) {
			this.generateAlphabet();
		} else if (alphaBets) {
			this.setState({
				alphaBets,
			});
		}

		this.setState({
			modalVisible,
		});
	}

	public render(): JSX.Element {
		const {
			animationType,
			onRequestClosed,
			closeable,
			hideAlphabetFilter,
			placeholderTextColor,
			keyExtractor,
			showToTopButton,
			onEndReached,
			removeClippedSubviews,
			flatListProps,
		} = this.props;
		const { modalVisible, alphaBets, stickyBottomButton, selectedAlpha } = this.state;
		return (
			<Modal
				animationType={animationType}
				visible={modalVisible}
				onRequestClose={() => onRequestClosed}>
				<SafeAreaView style={ModalStyles.container}>
					<SearchComponent
						placeholderTextColor={placeholderTextColor}
						onClose={this.onClose.bind(this)}
						closeable={closeable}
						setText={(text: string) => this.setText(text)}
					/>
					<KeyboardAvoidingView style={ModalStyles.keyboardContainer} behavior="padding" enabled>
						<View style={ModalStyles.listArea}>

							<FlatList
								ref={(ref) => this.flatListRef = ref}
								data={this.getFilteredData()}
								keyExtractor={keyExtractor ? keyExtractor : this._keyExtractor.bind(this)}
								renderItem={({ item, index }) => this.renderItem(item, index)}
								onScroll={showToTopButton && this.onScrolling.bind(this)}
								initialNumToRender={20}
								onEndReached={onEndReached}
								removeClippedSubviews={removeClippedSubviews}
								viewabilityConfig={{
									minimumViewTime: 1000,
									viewAreaCoveragePercentThreshold: 50,
									waitForInteraction: true,
								}}
								onViewableItemsChanged={this._onViewableItemsChanged}
								{...flatListProps}
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
					{stickyBottomButton && <ScrollToTopComponent goToUp={() => this.scrollToUp()} />}
				</SafeAreaView>
			</Modal>
		);
	}

	private _onViewableItemsChanged({ viewableItems, changed }): void {
		if (viewableItems && viewableItems[0]) {
			const firstLetter = viewableItems[0].item.Name.charAt(0) || viewableItems[0].item.Value.charAt(0);
			this.setState({
				selectedAlpha: firstLetter,
			});
		}
	}

	private onClose(): void {
		const { onRequestClosed, modalVisible } = this.props;
		this.setState({
			modalVisible: !modalVisible,
		});
		onRequestClosed();
	}

	private scrollToUp(): void {
		if (this.flatListRef) {
			this.flatListRef.scrollToIndex({ animated: true, index: 0 });
			this.setState({
				selectedAlpha: null,
			});
		}
	}

	private onScrolling(e: NativeSyntheticEvent<NativeScrollEvent>): void {
		const { contentOffset } = e.nativeEvent;
		// const { stickyBottomButton } = this.state;

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
		return <ListItemComponent list={item} onChangeMethod={this.onChangeMethod.bind(this)} />;
	}

	private generateAlphabet(): void {
		const { list, sortingLanguage } = this.props;
		const singularAlpha = [];
		// tslint:disable-next-line: max-line-length
		list.map((x: IModalListInDto) => {
			if (singularAlpha.indexOf(x.Name.charAt(0)) === -1) {
				singularAlpha.push(x.Name.charAt(0));
			}
		});

		singularAlpha.sort((a, b) => a.localeCompare(b, sortingLanguage));

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

	private getFilteredData(): IModalListInDto[] {
		const { list } = this.props;
		const { searchText } = this.state;
		return list.filter((l: IModalListInDto) => l.Name.toLocaleLowerCase().indexOf(searchText.toLocaleLowerCase()) > -1);
	}

	private onChangeMethod(key: IModalListInDto): IModalListInDto {
		const { onSelected } = this.props;
		return onSelected(key);
	}

	private getIndex(alphabet: string): number {
		const list = this.getFilteredData();
		const findIndex = list.findIndex((x: IModalListInDto) => {
			return x.Name.charAt(0) === alphabet || x.Value.charAt(0) === alphabet;
		});
		return findIndex;
	}

	private setAlphabet(alphabet: string): void {
		// const { list } = this.props;
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
