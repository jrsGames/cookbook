import React from 'react';
import './App.css';
import { TabBar } from './components/TabBar/tabBar';

export class App extends React.Component<{}> {
	
	render() {
		return (
			<div className="App">
				<TabBar/>
			</div>
		);
	}
}