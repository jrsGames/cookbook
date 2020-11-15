import React from 'react';
import { GlobalState, READ_VIEW } from '../../redux/initialState';
import { Dispatch } from 'redux';
import { setView } from '../../redux/action_creators/GeneralState';
import { connect } from 'react-redux';

interface UploadInputProps {
	enterReadMode: () => void
}

class UnconnectedUploadInput extends React.Component<UploadInputProps> {
	
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
	
	readCookbook: () => void = () => {
		this.readJsonFile();
		this.props.enterReadMode();
	}
	render() {
		return (
			<div className="UploadInput">
				<input type="file" id="fileUpload" style={{'display': 'none'}} onChange={() => this.readCookbook()}/>
			</div>
		);
	}
}

const mapStateToProps = (state: GlobalState) => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	enterReadMode: () => dispatch(setView(READ_VIEW))
});

export const UploadInput = connect(mapStateToProps, mapDispatchToProps)(UnconnectedUploadInput);