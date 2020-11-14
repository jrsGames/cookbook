import React from 'react';
import { LoginPage } from './components/LoginPage/loginpage';
import './App.css';

export class App extends React.Component<{}> {
	
	render() {
		return (
			<div className="App">
				<LoginPage />
			</div>
		);
	}
}