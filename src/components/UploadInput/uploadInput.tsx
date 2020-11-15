import React from 'react';

export class UploadInput extends React.Component<{}> {
	
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
			<div className="UploadInput">
				<input type="file" id="fileUpload" style={{'display': 'none'}} onChange={() => this.readJsonFile()}/>
			</div>
		);
	}
}