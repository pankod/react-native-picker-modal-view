// Global Imports
import * as React from 'react';
import { Modal, SafeAreaView, Text, View } from 'react-native';

// Local Imports
import { AlphabetComponent } from '@Components';
import { IModalInDto, IModalListInDto } from '@Interfaces';
import { ModalStyles } from '@Styles';

export class ModalComponent extends React.Component<IModalInDto, {}> {

	public static defaultProps = {
		animationType: 'slide',
		closeable: true,
		hideAlphabetFilter: false,
	};

	public render(): JSX.Element {
		const {
			animationType,
			onRequestClosed,
			closeable,
		} = this.props;
		return (
			<Modal
				animationType={animationType}
				onRequestClose={() => onRequestClosed}>
				<SafeAreaView style={ModalStyles.container}>
					{closeable && <Text>Kapat</Text>}
				</SafeAreaView>
			</Modal>
		);
	}

	private onChangeMethod(key: IModalListInDto): IModalListInDto {
		const { onChange } = this.props;
		return onChange(key);
	}
}
