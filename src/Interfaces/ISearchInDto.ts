export interface ISearch {
	placeholderTextColor: string;
	onClose: () => void;
	closeable: boolean;
	setText: (text: string) => void;
}
