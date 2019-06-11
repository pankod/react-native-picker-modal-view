// JSDOM
export interface Global {
	document: Document;
	window: Window;
	navigator: {
		userAgent: string
	}
}

declare var global: Global;
const { JSDOM } = require('jsdom');
const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
const { window } = jsdom;

function copyProps(src, target) {
	const props: any = Object.getOwnPropertyNames(src)
		.filter((prop) => typeof target[prop] === 'undefined')
		.map((prop) => Object.getOwnPropertyDescriptor(src, prop));
	Object.defineProperties(target, props);
}

global.window = window;
global.document = window.document;
global.navigator = {
	userAgent: "node.js",
};
copyProps(window, global);

// JSDOM done

// Mock and Enzyme
jest.mock('react-native', () => require('react-native-mock-render'), { virtual: true })

const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

Enzyme.configure({ adapter: new Adapter() });
// Mock and Enzyme done

jest.useFakeTimers()
