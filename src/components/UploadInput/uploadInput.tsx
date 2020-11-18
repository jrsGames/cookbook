import React from 'react';
import { GlobalState, LOADING_VIEW } from '../../redux/initialState';
import { Dispatch } from 'redux';
import { setView } from '../../redux/action_creators/GeneralState';
import { connect } from 'react-redux';
import { setCookbookString } from '../../redux/action_creators/BookState';

interface UploadInputProps {
	enterLoadingMode: () => void;
	setCookbookString: (cookbook: string) => void;
}

class UnconnectedUploadInput extends React.Component<UploadInputProps> {

	readJsonFile: () => void = () => {
		let x = document.getElementById("fileUpload") as HTMLInputElement;
		if(x && x.files && x.files.length === 1){
			let importedFile = x.files[0];
			let reader = new FileReader();
			reader.onload = () => {
				if(typeof reader.result === "string"){
					this.props.setCookbookString(reader.result);
				}
			}
			reader.readAsText(importedFile);
		}
	}
	
	readCookbook: () => void = () => {
		this.readJsonFile();
		this.props.enterLoadingMode();
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
	enterLoadingMode: () => dispatch(setView(LOADING_VIEW)),
	setCookbookString: (cookbook: string) => dispatch(setCookbookString(cookbook))
});

export const UploadInput = connect(mapStateToProps, mapDispatchToProps)(UnconnectedUploadInput);