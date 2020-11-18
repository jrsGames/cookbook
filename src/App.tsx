import React from 'react';
import './App.css';
import { UploadInput } from './components/UploadInput/uploadInput';
import { EntryPage } from './components/EntryPage/entryPage';
import { CreateModePage } from './components/CreateModePage/createModePage';
import { ReadModePage } from './components/ReadModePage/readModePage';
import { LoadingModePage } from './components/LoadingModePage/loadingModePage';

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
				<LoadingModePage/>
				<CreateModePage/>
				<ReadModePage/>
			</div>
		);
	}
}