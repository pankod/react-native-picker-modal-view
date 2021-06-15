import {TextStyle} from "react-native";

export interface IAlphabetsInDto {
	alphabets: string[];
	showAlphabeticalIndex: boolean;
	selectedAlpha?: string;
	alphabetTextStyle?: TextStyle;

	setAlphabet: (alphabet: string) => void;
}
