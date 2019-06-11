import * as React from 'react';
import { Button, SafeAreaView, Text, View } from 'react-native';

import Splash from '@pankod/project-splash';
import PickerModal from 'react-native-picker-modal-view';

import data from '../../../top20.json';

export default class Main extends React.Component<{}, { selectedItem: {}, intro: boolean }> {
	constructor(props: {}) {
		super(props);

		this.state = {
			intro: true,
			selectedItem: {}
		};
	}

	public componentDidMount(): void {
		setTimeout(() => {
			this.setState({ intro: false });
		}, 2000);
	}

	public render(): JSX.Element {
		const { intro, selectedItem } = this.state;

		if (intro) {
			return (
				<Splash />
			);
		}

		return (
			<SafeAreaView style={{ flex: 1, justifyContent: 'center', marginHorizontal: 20 }}>

				<PickerModal
					renderSelectView={(disabled, selected, showModal) =>
						<Button disabled={disabled} title={'Show me!'} onPress={showModal} />
					}
					onSelected={this.onSelected.bind(this)}
					onClosed={this.onClosed.bind(this)}
					onBackButtonPressed={this.onBackButtonPressed.bind(this)}
					items={data}
					sortingLanguage={'tr'}
					showToTopButton={true}
					selected={selectedItem}
					showAlphabeticalIndex={true}
					autoGenerateAlphabeticalIndex={true}
					selectPlaceholderText={'Choose one...'}
					onEndReached={() => console.log('list ended...')}
					searchPlaceholderText={'Search...'}
					requireSelection={false}
					autoSort={false}
				/>
				<View style={{ padding: 10, alignItems: 'center', backgroundColor: '#ddd' }}>
					<Text>Chosen: </Text>
					<Text>{JSON.stringify(selectedItem)}</Text>
				</View>
			</SafeAreaView>
		);
	}

	private onClosed(): void {
		console.log('close key pressed');
	}

	private onSelected(selected: any): void {
		this.setState({ selectedItem: selected });

		return selected;
	}

	private onBackButtonPressed(): void {
		console.log('back key pressed');
	}
}
