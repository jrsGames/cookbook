import React from 'react';
import './App.css';
import { UploadInput } from './components/UploadInput/uploadInput';
import { EntryPage } from './components/EntryPage/entryPage';

export class App extends React.Component<{}> {
	
	uploadFile: () => void = () => {
		var x = document.getElementById("fileUpload");
		if(x){
			x.click();
		}
	}

	render() {
		return (
			<div className="App">
				<UploadInput/>
				<EntryPage/>
			</div>
		);
	}
}