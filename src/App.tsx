import React from 'react';
import './App.css';
import { TabBar } from './components/TabBar/tabBar';
import { CookbookButton } from './components/CookbookButton/cookbookButton';

export class App extends React.Component<{}> {
	
	uploadFile: () => void = () => {
		var x = document.getElementById("fileUpload");
		if(x){
			x.click();
		}
	}
	
	readJsonFile: () => void = () => {
		var x = document.getElementById("fileUpload") as HTMLInputElement;
		if(x && x.files && x.files.length === 1){
			var importedFile = x.files[0];
			var reader = new FileReader();
			reader.onload = function() {
				console.log(reader.result);
			};
			reader.readAsText(importedFile);
		}
	}
	
	render() {
		return (
			<div className="App">
				<TabBar/>
				<div>
					<input type="file" id="fileUpload" style={{'display': 'none'}} onChange={() => this.readJsonFile()}/>
					<CookbookButton label={"Filter"}/>
					<CookbookButton label={"Import"} onClick={() => this.uploadFile()}/>
					<CookbookButton label={"Export"}/>
				</div>
			</div>
		);
	}
}