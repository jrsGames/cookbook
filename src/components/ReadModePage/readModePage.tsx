import React from 'react';
import './readModePage.css';
import { GlobalState, Cookbook, Recipe } from '../../redux/initialState';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { getCookbook, getIncludedLabels, getExcludedLabels } from '../../redux/selectors';
import { EMPTY_COOKBOOK } from '../UploadInput/uploadInput';
import { AppBar, Toolbar, IconButton, Typography, Tooltip } from '@material-ui/core';
import GetAppIcon from '@material-ui/icons/GetApp';import { RecipeCard } from '../RecipeCard/recipeCard';
import { RecipeDetails } from '../RecipeDetails/recipeDetails';
import { setCookbook, deleteRecipe, copyRecipe, swapRecipes } from '../../redux/action_creators/BookState';
import { setIncludedLabels, setExcludedLabels } from '../../redux/action_creators/FilterState';
import Zoom from '@material-ui/core/Zoom';
import EditIcon from '@material-ui/icons/Edit';
import TuneIcon from '@material-ui/icons/Tune';
import { TitleDialog } from '../TitleDialog/titleDialog';
import { FilterDialog } from '../FilterDialog/filterDialog';


export const getRecipeIndexById = (recipes: Recipe[], id: string) => 
	recipes.findIndex((recipe) => recipe.id && recipe.id === id);

interface ReadModePageProps {
	getCookbook: () => Cookbook,
	setCookbook: (cookbook: Cookbook) => void,
	deleteRecipe: (id: string) => void,
	copyRecipe: (recipeId: string) => void,
	swapRecipes: (firstRecipeId: string, secondRecipeId: string) => void,
	getFilters: () => {include: string[], exclude: string[]},
	setFilteredLabels: (include: string[], exclude: string[]) => void,
}

interface ReadModePageState {
	cookbook: Cookbook,
	toBeSwapped: number | null,
	openRecipeIndex: number,
	titleDialogOpen: boolean,
	filterDialogOpen: boolean
}

class UnconnectedReadModePage extends React.Component<ReadModePageProps, ReadModePageState> {
	
	constructor(props: ReadModePageProps){
		super(props);
		this.state = {
			cookbook: props.getCookbook(),
			toBeSwapped: null,
			openRecipeIndex: -1,
			titleDialogOpen: false,
			filterDialogOpen: false
		}
	}
	
	componentDidUpdate(prevProps: ReadModePageProps) {
		if(prevProps.getCookbook() !== this.props.getCookbook()) {
			this.setState({cookbook: this.props.getCookbook()});
		}
	}
	
	openTitleDialog = () => {
		this.setState({ titleDialogOpen: true });
	}
	
	setNewTitle = (newTitle: string) => {
		const newCookbook: Cookbook = JSON.parse(JSON.stringify(this.state.cookbook));
		newCookbook.title = newTitle;
		this.props.setCookbook(newCookbook);
		this.closeTitleDialog();
	}
	
	closeTitleDialog = () => {
		this.setState({ titleDialogOpen: false });
	}
	
	openFilterDialog = () => {
		this.setState({ filterDialogOpen: true });
	}

	closeFilterDialog = () => {
		this.setState({ filterDialogOpen: false });
	}
	
	openRecipe = (index: number) => {
		this.setState({ openRecipeIndex: index });
	}
	
	copyRecipe(index: number){
		const newCookbook: Cookbook = JSON.parse(JSON.stringify(this.state.cookbook));
		const recipeIdToBeCopied = newCookbook.recipes[index].id || "";
		this.props.copyRecipe(recipeIdToBeCopied);
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
						<Typography variant="h6">
							{cookbook.title}
						</Typography>
						<Tooltip title="Title bearbeiten" TransitionComponent={Zoom} placement="bottom">
							<IconButton color="inherit" aria-label="menu" onClick={() => this.openTitleDialog()}>
								<EditIcon />
							</IconButton>
						</Tooltip>
						<TitleDialog
							open={this.state.titleDialogOpen}
							oldTitle={cookbook.title}
							closeDialog={() => this.closeTitleDialog()}
							setTitle={(newTitle: string) => this.setNewTitle(newTitle)}
						/>
						<div className="RightHandButtons">
							<Tooltip title="Kochbuch filtern" TransitionComponent={Zoom} placement="bottom">
								<IconButton color="inherit" aria-label="menu" onClick={() => this.openFilterDialog()}>
									<TuneIcon />
								</IconButton>
							</Tooltip>
							<FilterDialog
								open={this.state.filterDialogOpen}
								closeDialog={() => this.closeFilterDialog()}
								oldIncluded={this.props.getFilters().include}
								oldExcluded={this.props.getFilters().exclude}
								setFilteredLabels={(incl: string[], excl: string[]) => this.props.setFilteredLabels(incl, excl)}
							/>
							<Tooltip title="Kochbuch exportieren" TransitionComponent={Zoom} placement="bottom">
								<IconButton color="inherit" aria-label="menu" onClick={() => this.exportCookbook()}>
									<GetAppIcon />
								</IconButton>
							</Tooltip>
						</div>
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
					/>
			</div>
		);
	}
}

const mapStateToProps = (state: GlobalState) => ({
	getCookbook: () => getCookbook(state) || EMPTY_COOKBOOK,
	getFilters: () => ({
		include: getIncludedLabels(state),
		exclude: getExcludedLabels(state)
	})
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	setCookbook: (cookbook: Cookbook) => dispatch(setCookbook(cookbook)),
	deleteRecipe: (id: string) => dispatch(deleteRecipe(id)),
	copyRecipe: (recipeId: string) => dispatch(copyRecipe(recipeId)),
	swapRecipes: (firstRecipeId: string, secondRecipeId: string) => dispatch(swapRecipes(firstRecipeId, secondRecipeId)),
	setFilteredLabels: (included: string[], excluded: string[]) => {
		dispatch(setIncludedLabels(included));
		dispatch(setExcludedLabels(excluded));
	}
});

export const ReadModePage = connect(mapStateToProps, mapDispatchToProps)(UnconnectedReadModePage);