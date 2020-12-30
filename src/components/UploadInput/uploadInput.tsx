import React from 'react';
import { GlobalState, READ_VIEW, Cookbook, Recipe } from '../../redux/initialState';
import { Dispatch } from 'redux';
import { setView, setFileName } from '../../redux/action_creators/ViewState';
import { connect } from 'react-redux';
import { setCookbookString, setCookbook } from '../../redux/action_creators/BookState';
import { isCookbook } from '../../helpers';
import { getCookbook } from '../../redux/selectors';
import { START_COOKBOOK } from '../EntryPage/entryPage';


interface UploadInputProps {
	enterReadMode: () => void;
	setCookbook: (cookbook: Cookbook) => void;
	setCookbookString: (cookbook: Cookbook) => void;
	getCookbook: () => Cookbook | null;
	setFileName: (name: string) => void
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
						this.props.setFileName(importedFile.name);
						const parsedCookbook: Cookbook = parseToCookbook(reader.result);
						this.props.setCookbook(parsedCookbook);
						this.props.setCookbookString(parsedCookbook);
					}
				}
			}
			reader.readAsText(importedFile, 'utf-8');
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
	const presentNames: string [] = [];
	oldCookbookCopy.recipes.forEach((recipe) => {
		presentNames.push(recipe.name)
		if(recipe.id) {
			presentIds.push(recipe.id);
		}
	});
	newCookbook.recipes.forEach((recipe) => {
		setId(recipe);
		while(presentIds.indexOf((recipe.id) as string) > -1) {
			setId(recipe, true);
		}
		while(presentNames.indexOf(recipe.name) > -1) {
			recipe.name += "*"
		}
		oldCookbookCopy.recipes.push(recipe);
	})
	return oldCookbookCopy;
}

export const generateNewId = (existingIds?: string[]) => {
	let id: string = Math.floor(Math.random() * 10000000).toString();
	if(existingIds){
		while(existingIds?.indexOf(id) > -1) {
			id = Math.floor(Math.random() * 10000000).toString();
		}
	}
	return id;
	
}

export const setId = (recipe: Recipe, overwrite: boolean = false) => {
	if(overwrite || !recipe.id) {
		recipe.id = generateNewId();
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
	setCookbook: (cookbook: Cookbook) => dispatch(setCookbook(cookbook)),
	setCookbookString: (cookbook: Cookbook) => dispatch(setCookbookString(JSON.stringify(cookbook))),
	setFileName: (name: string) => dispatch(setFileName(name))
});

export const UploadInput = connect(mapStateToProps, mapDispatchToProps)(UnconnectedUploadInput);