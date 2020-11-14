import React from 'react';
import { LoginPage } from './components/LoginPage/loginpage';
import { TabBar } from './components/TabBar/tabBar';
import './App.css';
import { TourBoard } from './components/TourBoard/tourBoard';

export class App extends React.Component<{}> {
	
	render() {
		return (
			<div className="App">
				<LoginPage />
				<TourBoard />
				<TabBar />
			</div>
		);
	}
}