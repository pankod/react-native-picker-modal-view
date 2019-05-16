import React from 'react';

import Main from './src/Components/Main';

export default class App extends React.Component {
	constructor(props: {}) {
		super(props);
	}

	public render(): JSX.Element {
		return <Main />;
	}
}
