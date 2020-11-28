import React from 'react';
import './readModePage.css';
import { GlobalState, Cookbook, Recipe } from '../../redux/initialState';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { getCookbook } from '../../redux/selectors';
import { EMPTY_COOKBOOK, generateId } from '../UploadInput/uploadInput';
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { RecipeCard } from '../RecipeCard/recipeCard';
import { RecipeDetails } from '../RecipeDetails/recipeDetails';
import { setCookbook, deleteRecipe, copyRecipe, swapRecipes } from '../../redux/action_creators/BookState';

export const getRecipeIndexById = (recipes: Recipe[], id: string) => 
	recipes.findIndex((recipe) => recipe.id && recipe.id === id);

interface ReadModePageProps {
	getCookbook: () => Cookbook,
	setCookbook: (cookbook: Cookbook) => void,
	deleteRecipe: (id: string) => void,
	copyRecipe: (recipeId: string, newRecipeId: string) => void,
	swapRecipes: (firstRecipeId: string, secondRecipeId: string) => void
}

interface ReadModePageState {
	cookbook: Cookbook,
	toBeSwapped: number | null,
	openRecipeIndex: number
}

class UnconnectedReadModePage extends React.Component<ReadModePageProps, ReadModePageState> {
	
	constructor(props: ReadModePageProps){
		super(props);
		this.state = {
			cookbook: props.getCookbook(),
			toBeSwapped: null,
			openRecipeIndex: -1
		}
	}
	
	componentDidUpdate(prevProps: ReadModePageProps) {
		if(prevProps.getCookbook() !== this.props.getCookbook()) {
			this.setState({cookbook: this.props.getCookbook()});
		}
	}
	
	openRecipe = (index: number) => {
		this.setState({ openRecipeIndex: index });
	}
	
	copyRecipe(index: number){
		const newCookbook: Cookbook = JSON.parse(JSON.stringify(this.state.cookbook));
		const recipeIdToBeCopied = newCookbook.recipes[index].id || "";
		this.props.copyRecipe(recipeIdToBeCopied, generateId());
	}
	
	swapRecipe(index: number){
		if(this.state.toBeSwapped !== null) {
			const newCookbook: Cookbook = JSON.parse(JSON.stringify(this.state.cookbook));
			const firstRecipeId = newCookbook.recipes[this.state.toBeSwapped].id || "";
			const secondRecipeId = newCookbook.recipes[index].id || "";
			this.setState({
				toBeSwapped: null
			});
			this.props.swapRecipes(firstRecipeId, secondRecipeId)
		} else {
			this.setState({
				toBeSwapped: index
			});
		}
	}
	
	deleteRecipe(index: number){
		const newCookbook: Cookbook = JSON.parse(JSON.stringify(this.state.cookbook));
		const id = newCookbook.recipes[index].id || "";
		this.props.deleteRecipe(id);
	}
	
	closeDetailsDialog = () => {
		this.setState({ openRecipeIndex: -1});
	}
	
	updateCookbookWithRecipe = (recipe: Recipe) => {
		const newCookbook = this.props.getCookbook();
		if(newCookbook) {
			newCookbook.recipes = JSON.parse(JSON.stringify(newCookbook.recipes));
			newCookbook.recipes[this.state.openRecipeIndex] = recipe;
			this.props.setCookbook(newCookbook);	
		}
	}
	
	exportCookbook = () => {
		let content = JSON.stringify(this.props.getCookbook());
		let link = document.createElement("a");
		const dataURI = "data:text/json;base64," + btoa(content);
		link.setAttribute("href", dataURI);
		link.setAttribute("download", "kochbuch.json");
		document.body.appendChild(link); // Firefox
		link.click();
	}
	
	render() {
		const cookbook: Cookbook = JSON.parse(JSON.stringify(this.state.cookbook));
		
		return (
			<div className="ReadModePage">
				<AppBar position="static">
					<Toolbar>
						<IconButton edge="start" color="inherit" aria-label="menu" onClick={() => this.exportCookbook()}>
							<MenuIcon/>
						</IconButton>
						<Typography variant="h6">
							{cookbook.title}
						</Typography>
					</Toolbar>
				</AppBar>
				<div className="RecipeList">
					{cookbook.recipes.map((recipe, index) => {
						const isLast = index === cookbook.recipes.length - 1;
						return <RecipeCard
									key={index}
									recipe={recipe}
									addSpaceBelow={isLast}
									onOpenClick={() => this.openRecipe(index)}
									onCopyClick={() => this.copyRecipe(index)}
									onSwapClick={() => this.swapRecipe(index)}
									swapping={this.state.toBeSwapped === index}
									onDeleteClick={() => this.deleteRecipe(index)}
								/>;
					})}
				</div>
				<RecipeDetails
					recipe={
						this.state.openRecipeIndex > -1 ?
						JSON.parse(JSON.stringify(this.state.cookbook.recipes[this.state.openRecipeIndex])) :
						null
					}
					index={this.state.openRecipeIndex}
					closeDialog={() => this.closeDetailsDialog()}
					setRecipe={(recipe: Recipe) => this.updateCookbookWithRecipe(recipe)}
					/>
			</div>
		);
	}
}

const mapStateToProps = (state: GlobalState) => ({
	getCookbook: () => getCookbook(state) || EMPTY_COOKBOOK
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	setCookbook: (cookbook: Cookbook) => dispatch(setCookbook(cookbook)),
	deleteRecipe: (id: string) => dispatch(deleteRecipe(id)),
	copyRecipe: (recipeId: string, newRecipeId: string) => dispatch(copyRecipe(recipeId, newRecipeId)),
	swapRecipes: (firstRecipeId: string, secondRecipeId: string) => dispatch(swapRecipes(firstRecipeId, secondRecipeId))
});

export const ReadModePage = connect(mapStateToProps, mapDispatchToProps)(UnconnectedReadModePage);