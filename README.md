# React Native Picker Modal View

An alternative to [Picker](https://facebook.github.io/react-native/docs/picker) and [PickerIOS](https://facebook.github.io/react-native/docs/pickerios) components with an unified API and consistent look & feel on both plaforms. It's fully configurable and includes built-in support for text search and alphabetical index. Ideal for longer lists not suitable for "wheel-pickers".

<div align="center">

[![npm version](https://img.shields.io/npm/v/react-native-picker-modal-view.svg)](https://www.npmjs.com/package/react-native-picker-modal-view)
[![npm downloads per month](https://img.shields.io/npm/dm/react-native-picker-modal-view.svg)](https://www.npmjs.com/package/react-native-picker-modal-view)
[![dependencies Status](https://david-dm.org/pankod/react-native-picker-modal-view/status.svg)](https://david-dm.org/pankod/react-native-picker-modal-view)
[![dev-dependencies Status](https://david-dm.org/pankod/react-native-picker-modal-view/dev-status.svg)](https://david-dm.org/pankod/react-native-picker-modal-view?type=dev)
[![Build Status](https://travis-ci.com/pankod/react-native-picker-modal-view.svg?branch=master)](https://travis-ci.com/pankod/react-native-picker-modal-view)

</div>
<br/>

<div align="center">
 <img src="screenshots/ios.gif" width="200" height="400">
 <img src="screenshots/android.gif" width="200" height="400">
</div>

<br/>


<br/>
<div align="center"> <h3>React Native Picker Modal View<h3></div>
<div align="center">React Native Module to select item picker modal.</div>
<div align="center">
  <sub>Created by <a href="https://www.pankod.com">Pankod</a></sub>
</div>
<br/>



## Stores Supported:
| **Apple App Store**  |   **Google Play**  |  
:--------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------: | 
| **✓** | **✓** | 
| <img src="https://developer.apple.com/assets/elements/icons/app-store/app-store-128x128_2x.png" height="60" > | <img src="https://elegal.ph/site/wp-content/uploads/2017/08/google-play-icon-logo-favicon-1632434.svg_.jpg" height="60" float="right"> | 






## Getting started
```
$ npm install react-native-picker-modal-view --save
```

or

```
$ yarn add react-native-picker-modal-view
```

<!-- ## Usage -->


## Example
```javascript
import React, { Component } from 'react';
import PickerModal from 'react-native-picker-modal-view';

const items = [ { "Name": "United States", "Value": "United States", "Code": "US", "Id": 1 }, { "Name": "China", "Value": "China", "Code": "CN", "Id": 2 }, { "Name": "Japan", "Value": "Japan", "Code": "JP", "Id": 3 }, { "Name": "Germany", "Value": "Germany", "Code": "DE", "Id": 4 }, { "Name": "Turkey", "Value": "Turkey", "Code": "TR", "Id": 5 }, { "Name": "India", "Value": "India", "Code": "IN", "Id": 6 }, { "Name": "France", "Value": "France", "Code": "FR", "Id": 7 }, { "Name": "United Kingdom", "Value": "United Kingdom", "Code": "GB", "Id": 8 }, { "Name": "Italy", "Value": "Italy", "Code": "IT", "Id": 10 }, { "Name": "Brazil", "Value": "Brazil", "Code": "BR", "Id": 11 }, { "Name": "Canada", "Value": "Canada", "Code": "CA", "Id": 12 }, { "Name": "Korea, Republic of", "Value": "Korea, Republic of", "Code": "KR", "Id": 13 }, { "Name": "Russian Federation", "Value": "Russian Federation", "Code": "RU", "Id": 14 }, { "Name": "Spain", "Value": "Spain", "Code": "ES", "Id": 15 }, { "Name": "Australia", "Value": "Australia", "Code": "AU", "Id": 16 }, { "Name": "Mexico", "Value": "Mexico", "Code": "MX", "Id": 17 }, { "Name": "Indonesia", "Value": "Indonesia", "Code": "ID", "Id": 18 }, { "Name": "Netherlands", "Value": "Netherlands", "Code": "NL", "Id": 19 }, { "Name": "Saudi Arabia", "Value": "Saudi Arabia", "Code": "SA", "Id": 20 }, { "Name": "Switzerland", "Value": "Switzerland", "Code": "CH", "Id": 21 }, { "Name": "Turkey", "Value": "Turkey", "Code": "TR", "Id": 22 }, { "Name": "Poland", "Value": "Poland", "Code": "PL", "Id": 23 }, { "Name": "Sweden", "Value": "Sweden", "Code": "SE", "Id": 24 }, { "Name": "Belgium", "Value": "Belgium", "Code": "BE", "Id": 25 }, { "Name": "Thailand", "Value": "Thailand", "Code": "TH", "Id": 26 }, { "Name": "Austria", "Value": "Austria", "Code": "AT", "Id": 27 }, { "Name": "Norway", "Value": "Norway", "Code": "NO", "Id": 28 }, { "Name": "Denmark", "Value": "Denmark", "Code": "DK", "Id": 29 }, { "Name": "Colombia", "Value": "Colombia", "Code": "CO", "Id": 30 } ]

export default class example extends Component {

	constructor(props) {
		super(props);
		this.state = {
			selectedItem: {},
		};
	}

	close() {
		console.log("close key pressed");
	}

	selected(selected) {
		this.setState({
			selectedItem: selected
		})
	}

	onBackRequest() {
		console.log("back key pressed");
	}

	render() {
		return (
			<PickerModal
			onSelected={(selected) => this.selected(selected)}	
			onClosed={this.close.bind(this)}
			onBackButtonPressed={this.onBackRequest.bind(this)}
			items={items}
			sortingLanguage={'tr'}
			showToTopButton={true}
			selected={this.state.selectedItem}
			autoGenerateAlphabeticalIndex={true}
			selectPlaceholderText={'Choose one...'}
			onEndReached={() => console.log('list ended...')}
			searchPlaceholderText={'Search...'}
			requireSelection={false}
			autoSort={false}
			/>
		)
	}
}

```

<br/>

## Options
<br/>

| Properties | Type | Description | Default |
|------------|-------------------------------------|-------------|----------------------------------------------------------------|		
| **modalAnimationType**   | `string` | The RN Modal show/hide animation type                | `"slide"`       | 
| **showAlphabeticalIndex**   | `string` | Hides alphabetical index      | `"true"`        | 
| **onClosed**   | `Function` | Fired when the modal is closed    | |
| **onBackButtonPressed**   | `Function` |  Fired when the back key is pressed          | |
| **onSelected** <br> **required* | `Function`  | Returns selected item object | `"{ Id, Name, Value, [key: string]: any}"` 			| 
| **items** <br> **required* | `array`  | Array of list items | `"[{ Id, Name, Value, [key: string]: any}]"`		| 
| **alphabeticalIndexChars** | `array`  | Letters array for the alphabetical index | `"Predefined turkish alphabets"` | 
| **searchInputTextColor** | `string`  | Search input placeholder text color |  `"#252525"` | 
| **keyExtractor** | `Function`  | Flatlist defined {key} function |  `"Predefined return map index"` 	| 
| **autoGenerateAlphabeticalIndex** | `boolean`  | Auto-generates alphabetical index from list items data|  `"false"` | 
| **sortingLanguage** | `string`  | Country ISO (Alpha 2) Code for localeCompare |  `"tr"` | 
| **showToTopButton** | `boolean`  | Button for scroll to offset 0 |  `"true"` | 
| **onEndReached** | `Function`  | Fired when the list reaches the end |  | 
| **selectPlaceholderText** | `string`  | Select box placeholder text | `"Choose one..."` | 
| **searchPlaceholderText** | `string`  | Search input placeholder text | `"Search..."` | 
| **selected** | `object`  | Default selected object |  | 
| **autoSort** | `boolean`  | Auto-sort data list | `"false"` | 
| **disabled** | `boolean`  | Select box disabled boolean |  | 
| **requireSelection** | `boolean`  | Require at least one list item is selected| `"false"` |  

# Core Props of React Native
<br/>

| Properties | Type | Description | Default |
|------------|-------------------------------------|-------------|----------------------------------------------------------------|	
| **ModalProps** | `object`  | React Native Modal Props |  | 
| **FlatListProps** | `object`  | React Native Flatlist Props |  | 
| **SearchInputProps** | `object`  | React Native TextInput Props |  | 

<br/>
<br/>


#### Notes

- Auto-alphabetical index supported for Turkish and English languages.

#### Releases

- 1.0.0 - Initial release


