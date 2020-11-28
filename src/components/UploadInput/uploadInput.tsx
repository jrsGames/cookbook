import React from 'react';
import { GlobalState, READ_VIEW, Cookbook, Recipe } from '../../redux/initialState';
import { Dispatch } from 'redux';
import { setView } from '../../redux/action_creators/GeneralState';
import { connect } from 'react-redux';
import { setCookbookString, setCookbook } from '../../redux/action_creators/BookState';
import { isCookbook } from '../../helpers';

export const EMPTY_COOKBOOK: Cookbook = {
		title: "",
		recipes: []
};

interface UploadInputProps {
	enterReadMode: () => void;
	setCookbook: (cookbook: string) => void;
}

class UnconnectedUploadInput extends React.Component<UploadInputProps> {

	readJsonFile: () => void = () => {
		let x = document.getElementById("fileUpload") as HTMLInputElement;
		if(x && x.files && x.files.length === 1){
			let importedFile = x.files[0];
			let reader = new FileReader();
			reader.onload = () => {
				if(typeof reader.result === "string"){
					this.props.setCookbook(reader.result);
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

export const setId = (recipe: Recipe) => {
	if(!recipe.id) {
		recipe.id = Math.floor(Math.random() * 1000000).toString();
	}
}

const parseToCookbook: (input: string) => Cookbook = (input) => {
	try {
		JSON.parse(input);
	} catch(e) {
		console.log("The file content is not a valid JSON. It is:");
		console.log(input);
		return EMPTY_COOKBOOK;
	}
	const content: any = JSON.parse(input);
	if(isCookbook(content)){
		const cookbook = (content) as Cookbook;
		cookbook.recipes.forEach((recipe) => {
			setId(recipe);
		});
		return cookbook;
	}
	console.log("The file content is not a valid Cookbook. It is:");
	console.log(content);
	return EMPTY_COOKBOOK;
}

const mapStateToProps = (state: GlobalState) => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	enterReadMode: () => dispatch(setView(READ_VIEW)),
	setCookbook: (cookbook: string) => {
		const parsedCookbook = parseToCookbook(cookbook);
		dispatch(setCookbookString(JSON.stringify(parsedCookbook)));
		dispatch(setCookbook(parsedCookbook));
	}
});

export const UploadInput = connect(mapStateToProps, mapDispatchToProps)(UnconnectedUploadInput);