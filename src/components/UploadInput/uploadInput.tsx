import React from 'react';
import { GlobalState, READ_VIEW } from '../../redux/initialState';
import { Dispatch } from 'redux';
import { setView } from '../../redux/action_creators/GeneralState';
import { connect } from 'react-redux';
import { setCookbookString, setCookbook } from '../../redux/action_creators/BookState';

interface UploadInputProps {
	enterReadMode: () => void;
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
	enterReadMode: () => dispatch(setView(READ_VIEW)),
	setCookbookString: (cookbook: string) => {
		dispatch(setCookbookString(cookbook));
		dispatch(setCookbook(JSON.parse(cookbook)));
	}
});

export const UploadInput = connect(mapStateToProps, mapDispatchToProps)(UnconnectedUploadInput);