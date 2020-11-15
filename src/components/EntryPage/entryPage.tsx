import React from 'react';
import './entryPage.css';
import Button from '@material-ui/core/Button';

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
				<Button className='ImportButton' color="primary" variant="contained" onClick={() => this.uploadFile()}>
					Import Cookbook
				</Button>
				<Button className='CreateNewButton' variant="contained"> Create New Cookbook </Button>
			</div>
		);
	}
}