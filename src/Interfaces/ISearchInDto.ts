// Global Imports
import { TextInputProps } from 'react-native';

export interface ISearch {
	placeholderTextColor: string;
	onClose: () => void;
	closeable: boolean;
	setText: (text: string) => void;
	searchText: string;
	autoCorrect: boolean;
	SearchInputProps?: TextInputProps;
}
