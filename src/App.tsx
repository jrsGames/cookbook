import React from 'react';
import './App.css';
import { CookbookButton } from './components/CookbookButton/cookbookButton';
import { UploadInput } from './components/UploadInput/uploadInput';

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
				<CookbookButton label={"Filter"}/>
				<CookbookButton label={"Import"} onClick={() => this.uploadFile()}/>
				<CookbookButton label={"Export"}/>
			</div>
		);
	}
}