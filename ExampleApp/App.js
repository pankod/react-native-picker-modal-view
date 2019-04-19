/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, View, SafeAreaView, Text, ImageBackground } from 'react-native';
import PickerModal from 'react-native-picker-modal-view';

const city = [{ "Id": 1, "CountryId": 0, "Name": "Ankara", "Value": "Ankara" }, { "Id": 2, "CountryId": 0, "Name": "İstanbul", "Value": "İstanbul" }, { "Id": 4, "CountryId": 0, "Name": "İzmir", "Value": "İzmir" }, { "Id": 5, "CountryId": 0, "Name": "Adana", "Value": "Adana" }, { "Id": 6, "CountryId": 0, "Name": "Adıyaman", "Value": "Adıyaman" }, { "Id": 7, "CountryId": 0, "Name": "Afyon", "Value": "Afyon" }, { "Id": 8, "CountryId": 0, "Name": "Ağrı", "Value": "Ağrı" }, { "Id": 9, "CountryId": 0, "Name": "Amasya", "Value": "Amasya" }, { "Id": 10, "CountryId": 0, "Name": "Aksaray", "Value": "Aksaray" }, { "Id": 11, "CountryId": 0, "Name": "Antalya", "Value": "Antalya" }, { "Id": 12, "CountryId": 0, "Name": "Ardahan", "Value": "Ardahan" }, { "Id": 13, "CountryId": 0, "Name": "Artvin", "Value": "Artvin" }, { "Id": 14, "CountryId": 0, "Name": "Aydın", "Value": "Aydın" }, { "Id": 15, "CountryId": 0, "Name": "Balıkesir", "Value": "Balıkesir" }, { "Id": 16, "CountryId": 0, "Name": "Bartın", "Value": "Bartın" }, { "Id": 17, "CountryId": 0, "Name": "Batman", "Value": "Batman" }, { "Id": 18, "CountryId": 0, "Name": "Bayburt", "Value": "Bayburt" }, { "Id": 19, "CountryId": 0, "Name": "Bilecik", "Value": "Bilecik" }, { "Id": 20, "CountryId": 0, "Name": "Bingöl", "Value": "Bingöl" }, { "Id": 21, "CountryId": 0, "Name": "Bitlis", "Value": "Bitlis" }, { "Id": 22, "CountryId": 0, "Name": "Bolu", "Value": "Bolu" }, { "Id": 23, "CountryId": 0, "Name": "Burdur", "Value": "Burdur" }, { "Id": 24, "CountryId": 0, "Name": "Bursa", "Value": "Bursa" }, { "Id": 25, "CountryId": 0, "Name": "Çanakkale", "Value": "Çanakkale" }, { "Id": 26, "CountryId": 0, "Name": "Çankırı", "Value": "Çankırı" }, { "Id": 27, "CountryId": 0, "Name": "Çorum", "Value": "Çorum" }, { "Id": 28, "CountryId": 0, "Name": "Denizli", "Value": "Denizli" }, { "Id": 29, "CountryId": 0, "Name": "Diyarbakır", "Value": "Diyarbakır" }, { "Id": 30, "CountryId": 0, "Name": "Düzce", "Value": "Düzce" }, { "Id": 31, "CountryId": 0, "Name": "Edirne", "Value": "Edirne" }, { "Id": 32, "CountryId": 0, "Name": "Elazığ", "Value": "Elazığ" }, { "Id": 33, "CountryId": 0, "Name": "Erzincan", "Value": "Erzincan" }, { "Id": 34, "CountryId": 0, "Name": "Erzurum", "Value": "Erzurum" }, { "Id": 35, "CountryId": 0, "Name": "Eskişehir", "Value": "Eskişehir" }, { "Id": 36, "CountryId": 0, "Name": "Gaziantep", "Value": "Gaziantep" }, { "Id": 37, "CountryId": 0, "Name": "Giresun", "Value": "Giresun" }, { "Id": 38, "CountryId": 0, "Name": "Gümüşhane", "Value": "Gümüşhane" }, { "Id": 39, "CountryId": 0, "Name": "Hakkari", "Value": "Hakkari" }, { "Id": 40, "CountryId": 0, "Name": "Hatay", "Value": "Hatay" }, { "Id": 41, "CountryId": 0, "Name": "Iğdır", "Value": "Iğdır" }, { "Id": 42, "CountryId": 0, "Name": "Isparta", "Value": "Isparta" }, { "Id": 43, "CountryId": 0, "Name": "İçel (Mersin)", "Value": "İçel (Mersin)" }, { "Id": 44, "CountryId": 0, "Name": "Kahramanmaraş", "Value": "Kahramanmaraş" }, { "Id": 45, "CountryId": 0, "Name": "Karabük", "Value": "Karabük" }, { "Id": 46, "CountryId": 0, "Name": "Karaman", "Value": "Karaman" }, { "Id": 47, "CountryId": 0, "Name": "Kars", "Value": "Kars" }, { "Id": 48, "CountryId": 0, "Name": "Kastamonu", "Value": "Kastamonu" }, { "Id": 49, "CountryId": 0, "Name": "Kayseri", "Value": "Kayseri" }, { "Id": 50, "CountryId": 0, "Name": "Kırıkkale", "Value": "Kırıkkale" }, { "Id": 51, "CountryId": 0, "Name": "Kırklareli", "Value": "Kırklareli" }, { "Id": 52, "CountryId": 0, "Name": "Kırşehir", "Value": "Kırşehir" }, { "Id": 53, "CountryId": 0, "Name": "Kilis", "Value": "Kilis" }, { "Id": 54, "CountryId": 0, "Name": "Kocaeli", "Value": "Kocaeli" }, { "Id": 55, "CountryId": 0, "Name": "Konya", "Value": "Konya" }, { "Id": 56, "CountryId": 0, "Name": "Kütahya", "Value": "Kütahya" }, { "Id": 57, "CountryId": 0, "Name": "Malatya", "Value": "Malatya" }, { "Id": 58, "CountryId": 0, "Name": "Manisa", "Value": "Manisa" }, { "Id": 59, "CountryId": 0, "Name": "Mardin", "Value": "Mardin" }, { "Id": 60, "CountryId": 0, "Name": "Muğla", "Value": "Muğla" }, { "Id": 61, "CountryId": 0, "Name": "Muş", "Value": "Muş" }, { "Id": 62, "CountryId": 0, "Name": "Nevşehir", "Value": "Nevşehir" }, { "Id": 63, "CountryId": 0, "Name": "Niğde", "Value": "Niğde" }, { "Id": 64, "CountryId": 0, "Name": "Ordu", "Value": "Ordu" }, { "Id": 65, "CountryId": 0, "Name": "Osmaniye", "Value": "Osmaniye" }, { "Id": 66, "CountryId": 0, "Name": "Rize", "Value": "Rize" }, { "Id": 67, "CountryId": 0, "Name": "Sakarya", "Value": "Sakarya" }, { "Id": 68, "CountryId": 0, "Name": "Samsun", "Value": "Samsun" }, { "Id": 69, "CountryId": 0, "Name": "Siirt", "Value": "Siirt" }, { "Id": 70, "CountryId": 0, "Name": "Sinop", "Value": "Sinop" }, { "Id": 71, "CountryId": 0, "Name": "Sivas", "Value": "Sivas" }, { "Id": 72, "CountryId": 0, "Name": "Şanlıurfa", "Value": "Şanlıurfa" }, { "Id": 73, "CountryId": 0, "Name": "Şırnak", "Value": "Şırnak" }, { "Id": 74, "CountryId": 0, "Name": "Tekirdağ", "Value": "Tekirdağ" }, { "Id": 75, "CountryId": 0, "Name": "Tokat", "Value": "Tokat" }, { "Id": 76, "CountryId": 0, "Name": "Trabzon", "Value": "Trabzon" }, { "Id": 77, "CountryId": 0, "Name": "Tunceli", "Value": "Tunceli" }, { "Id": 78, "CountryId": 0, "Name": "Uşak", "Value": "Uşak" }, { "Id": 79, "CountryId": 0, "Name": "Van", "Value": "Van" }, { "Id": 80, "CountryId": 0, "Name": "Yalova", "Value": "Yalova" }, { "Id": 81, "CountryId": 0, "Name": "Yozgat", "Value": "Yozgat" }, { "Id": 82, "CountryId": 0, "Name": "Zonguldak", "Value": "Zonguldak" }]

console.disableYellowBox = true;

export default class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			selectedItem: {},
			intro: true
		};
	}

	close() {
		this.setState({ modalVisible: false });
	}

	selected(selected) {
		this.setState({ selectedItem: selected });
		return selected;
	}

	onBackRequest() {
		this.setState({ modalVisible: false });
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
								onSelected={(selected) => this.selected(selected)}
								// selected Item as IModalListInDto {
								// 	Id: string | number;
								// 	Name: string;
								// 	Value: string;
								// 	[key: string]: any;
								// 	CountryId?: ICity;
								// 	CityId?: ITown;
								// }
								onRequestClosed={this.close.bind(this)} // close request
								onBackRequest={this.onBackRequest.bind(this)} // back key press trigger
								list={city}
								sortingLanguage={'tr'} // default alphabet sorting is tr
								showToTopButton={true} // show top to up button while pass the screen half
								defaultSelected={this.state.selectedItem}
								autoCorrect={false} // auto correcting for input
								// keyExtractor={(item, index) => item.Id.toString()}
								autoGenerateAlphabet={true} // using first letter while auto generate alphabets array in data list
								chooseText={'Choose country...'}
								onEndReached={() => console.log('list ended...')} // list end trigger
								searchText={'Search anything'} // search box placeholder text
								// alphaBets={['A', 'E', 'O', 'M', 'N']} // if autoGenerateAlphabet variable is false, use custom alphabets
								forceSelect={false} // force select and user can not close modal, close button hidden
								autoSort={true} // generate sorting to use Name in data array
							// SearchInputProps={} // search input box props as React Native TextInputProps
							// ModalProps={} // modal props as React Native Modal ModalBaseProps | ModalPropsIOS | ModalPropsAndroid
							// FlatListProps={} // flatlist props as React Native FlatListProps<any>
							/>

							{this.state.selectedItem && <View style={{ alignItems: 'center', backgroundColor: '#ddd' }}>
								<Text>Choosen: </Text>
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
