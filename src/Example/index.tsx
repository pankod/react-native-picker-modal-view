import * as React from 'react';
import { ModalComponent as PickerModal } from '@Components';
import { IModalListInDto } from '@Interfaces';
import { LanguagesEnum } from '@Enum';

import * as data from './data.json';

interface IState {
	modalVisible: boolean;
	selectedItem: IModalListInDto;
}

export class Example extends React.PureComponent<{}, IState> {

	constructor(props) {
		super(props);
		this.state = {
			modalVisible: false,
			selectedItem: null,
		};
	}

	public close(): void {
		this.setState({ modalVisible: false });
	}

	public selected(selected: IModalListInDto): IModalListInDto {
		this.setState({ selectedItem: selected });

		return selected;
	}

	private onBackRequest(): void {
		console.log('back key pressed');
	}

	public render(): JSX.Element {
		return (
			<PickerModal
				onSelected={(selected: IModalListInDto) => this.selected(selected)}
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
				closeable={true}
				modalVisible={this.state.modalVisible}
				list={data}
				sortingLanguage={LanguagesEnum.tr} // default alphabet sorting is tr
				showToTopButton={true} // show top to up button while pass the screen half
				defaultSelected={this.state.selectedItem}
				autoCorrect={false} // auto correcting for input
				// keyExtractor={(item, index) => item.Id.toString()}
				autoGenerateAlphabet={true} // using first letter while auto generate alphabets array in data list
				chooseText={'Dropdown placeholder text...'}
				onEndReached={() => console.log('list ended...')} // list end trigger
				searchText={'Search anything'} // search box placeholder text
				alphaBets={['A', 'E', 'O', 'M', 'N']} // if autoGenerateAlphabet variable is false, use custom alphabets
				forceSelect={true} // force select and user can not close modal
				autoSort={true} // generate sorting to use Name in data array
			// SearchInputProps={} // search input box props as React Native TextInputProps
			// ModalProps={} // modal props as React Native Modal ModalBaseProps | ModalPropsIOS | ModalPropsAndroid
			// FlatListProps={} // flatlist props as React Native FlatListProps<any>
			/>
		);
	}

}
