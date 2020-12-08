import React from 'react';
import { GlobalState, READ_VIEW, Cookbook, Recipe } from '../../redux/initialState';
import { Dispatch } from 'redux';
import { setView } from '../../redux/action_creators/ViewState';
import { connect } from 'react-redux';
import { setCookbookString, setCookbook } from '../../redux/action_creators/BookState';
import { isCookbook } from '../../helpers';
import { getCookbook } from '../../redux/selectors';
import { START_COOKBOOK } from '../EntryPage/entryPage';


interface UploadInputProps {
	enterReadMode: () => void;
	setCookbook: (cookbook: Cookbook) => void;
	getCookbook: () => Cookbook | null;
}

class UnconnectedUploadInput extends React.Component<UploadInputProps> {

	readJsonFile: () => void = () => {
		let x = document.getElementById("fileUpload") as HTMLInputElement;
		if(x && x.files && x.files.length === 1){
			let importedFile = x.files[0];
			let reader = new FileReader();
			reader.onload = () => {
				if(typeof reader.result === "string"){
					if(this.props.getCookbook()) {
						const secondCookbook: Cookbook = parseToCookbook(reader.result);
						const newCookbook: Cookbook = addNewRecipes((this.props.getCookbook()) as Cookbook, secondCookbook);
						this.props.setCookbook(newCookbook);
					} else {
						const parsedCookbook: Cookbook = parseToCookbook(reader.result);
						this.props.setCookbook(parsedCookbook);
					}
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

const addNewRecipes = (oldCookbook: Cookbook, newCookbook: Cookbook) => {
	const oldCookbookCopy: Cookbook = JSON.parse(JSON.stringify(oldCookbook));
	const presentIds: string[] = [];
	oldCookbookCopy.recipes.forEach((recipe) => {
		if(recipe.id) {
			presentIds.push(recipe.id);
		}
	});
	newCookbook.recipes.forEach((recipe) => {
		setId(recipe);
		if(presentIds.indexOf((recipe.id) as string) === -1) {
			oldCookbookCopy.recipes.push(recipe);
		}
	})
	return oldCookbookCopy;
}

export const generateId = () => Math.floor(Math.random() * 1000000).toString();

export const setId = (recipe: Recipe) => {
	if(!recipe.id) {
		recipe.id = generateId();
	}
}

export const parseToCookbook: (input: string) => Cookbook = (input) => {
	try {
		JSON.parse(input);
	} catch(e) {
		console.log("The file content is not a valid JSON. It is:");
		console.log(input);
		return START_COOKBOOK;
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
	return START_COOKBOOK;
}

const mapStateToProps = (state: GlobalState) => ({
	getCookbook: () => getCookbook(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	enterReadMode: () => dispatch(setView(READ_VIEW)),
	setCookbook: (cookbook: Cookbook) => {
		dispatch(setCookbookString(JSON.stringify(cookbook)));
		dispatch(setCookbook(cookbook));
	}
});

export const UploadInput = connect(mapStateToProps, mapDispatchToProps)(UnconnectedUploadInput);