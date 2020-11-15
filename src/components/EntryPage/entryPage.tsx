import React from 'react';
import './entryPage.css';
import { CookbookButton } from '../CookbookButton/cookbookButton';

export class EntryPage extends React.Component<{}> {
	
	uploadFile: () => void = () => {
		var x = document.getElementById("fileUpload");
		if(x){
			x.click();
		}
	}
	
	render() {
		return (
			<div className="EntryPage">
				<CookbookButton label={"Import"} onClick={() => this.uploadFile()}/>
				<CookbookButton label={"Export"}/>
			</div>
		);
	}
}