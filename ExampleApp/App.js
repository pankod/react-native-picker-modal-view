/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, View, SafeAreaView, Text, ImageBackground, Button } from 'react-native';
import PickerModal from 'react-native-picker-modal-view';

const data = require("./top20.json")

console.disableYellowBox = true;

export default class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			selectedItem: {},
			intro: false,
			modalVisible: false,
		};
	}

	close() {
		console.log("close key pressed");
	}

	selected(selected) {
		this.setState({ selectedItem: selected, modalVisible: false });
		return selected;
	}

	onBackRequest() {
		console.log("back key pressed");
	}

	componentDidMount() {
		// for intro :)
		setTimeout(() => {
			this.setState({ intro: false });
		}, 2000);
	}

	render() {
		return (
			<React.Fragment>
				{this.state.intro ? (
					<ImageBackground style={styles.imgContainer} resizeMode={'contain'} source={require('./logo.png')}>
					</ImageBackground>
				) : (
						<SafeAreaView style={{ flex: 1, justifyContent: 'center', marginHorizontal: 20 }}>

							<PickerModal
								renderSelectView={(disabled, selected, showModal) =>
									<Button disabled={disabled} title={"Show me!"} onPress={showModal} />
								}
								onSelected={(selected) => this.selected(selected)}
								// selected Item as IModalListInDto {
								// 	Id: string | number;
								// 	Name: string;
								// 	Value: string;
								// 	[key: string]: any;
								// 	CountryId?: ICity;
								// 	CityId?: ITown;
								// }
								onClosed={this.close.bind(this)} // close request
								onBackButtonPressed={this.onBackRequest.bind(this)} // back key press trigger
								items={data}
								sortingLanguage={'tr'} // default alphabet sorting is tr
								showToTopButton={true} // show top to up button while pass the screen half
								selected={this.state.selectedItem}
								// keyExtractor={(item, index) => item.Id.toString()}
								autoGenerateAlphabeticalIndex={true} // using first letter while auto generate alphabets array in data list
								selectPlaceholderText={'Choose one...'}
								onEndReached={() => console.log('list ended...')} // list end trigger
								searchPlaceholderText={'Search...'} // search box placeholder text
								// alphaBets={['A', 'E', 'O', 'M', 'N']} // if autoGenerateAlphabet variable is false, use custom alphabets
								requireSelection={false} // force select and user can not close modal, close button hidden
								autoSort={false} // generate sorting to use Name in data array
							// SearchInputProps={} // search input box props as React Native TextInputProps
							// ModalProps={} // modal props as React Native Modal ModalBaseProps | ModalPropsIOS | ModalPropsAndroid
							// FlatListProps={} // flatlist props as React Native FlatListProps<any>
							/>

							{this.state.selectedItem && <View style={{ padding: 10, alignItems: 'center', backgroundColor: '#ddd' }}>
								<Text>Chosen: </Text>
								<Text>{JSON.stringify(this.state.selectedItem)}</Text>
							</View>}
						</SafeAreaView>
					)
				}
			</React.Fragment>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
	imgContainer: {
		flex: 1,
		backgroundColor: '#F9D92D',
		top: 0,
		left: 0,
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: 1
	}
});
