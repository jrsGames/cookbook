import React from 'react';
import './App.css';
import { TabBar } from './components/TabBar/tabBar';
import { CookbookButton } from './components/CookbookButton/cookbookButton';

export class App extends React.Component<{}> {
	
	render() {
		return (
			<div className="App">
				<TabBar/>
				<CookbookButton label={"Filter"}/>
			</div>
		);
	}
}