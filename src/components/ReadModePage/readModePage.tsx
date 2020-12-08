import React from 'react';
import './readModePage.css';
import { GlobalState, Cookbook, Recipe } from '../../redux/initialState';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { getCookbook, getIncludedLabels, getExcludedLabels } from '../../redux/selectors';
import { EMPTY_COOKBOOK } from '../UploadInput/uploadInput';
import { AppBar, Toolbar, IconButton, Typography, Tooltip, TextField, InputAdornment } from '@material-ui/core';
import GetAppIcon from '@material-ui/icons/GetApp';
import { RecipeCard } from '../RecipeCard/recipeCard';
import { RecipeDetails } from '../RecipeDetails/recipeDetails';
import { setCookbook, deleteRecipe, copyRecipe, swapRecipes, restoreCookbook } from '../../redux/action_creators/BookState';
import Zoom from '@material-ui/core/Zoom';
import EditIcon from '@material-ui/icons/Edit';
import TuneIcon from '@material-ui/icons/Tune';
import MergeTypeIcon from '@material-ui/icons/MergeType';
import CasinoIcon from '@material-ui/icons/Casino';
import { TitleDialog } from '../TitleDialog/titleDialog';
import { FilterDialog } from '../FilterDialog/filterDialog';
import Autocomplete from '@material-ui/lab/Autocomplete';
import SearchIcon from '@material-ui/icons/Search';
import RestoreIcon from '@material-ui/icons/Restore';
import { RightHandButton } from '../RightHandButton/rightHandButton';


export const getRecipeIndexById = (recipes: Recipe[], id: string) => 
	recipes.findIndex((recipe) => recipe.id && recipe.id === id);

interface ReadModePageProps {
	getCookbook: () => Cookbook,
	setCookbook: (cookbook: Cookbook) => void,
	deleteRecipe: (id: string) => void,
	copyRecipe: (recipeId: string) => void,
	swapRecipes: (firstRecipeId: string, secondRecipeId: string) => void,
	getIncludedLabels: () => string[],
	getExcludedLabels: () => string[],
	restoreCookbook: () => void
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
		if(prevProps.getCookbook() !== this.props.getCookbook() ||
			prevProps.getIncludedLabels() !== this.props.getIncludedLabels() ||
			prevProps.getExcludedLabels() !== this.props.getExcludedLabels()
		) {
			this.setState({cookbook: this.props.getCookbook()});
		}
	}
	
	filterCookbook = (cookbook: Cookbook) => {
		const newCookbook: Cookbook = cookbook;
		const newRecipes: Recipe[] = JSON.parse(JSON.stringify(cookbook.recipes));
		newCookbook.recipes = newRecipes.filter(this.containsRequiredLabels);
		return newCookbook;
	}
	
	containsRequiredLabels = (recipe: Recipe) => {
		let fulfilled: boolean = true;
		this.props.getIncludedLabels().forEach((label) => {
			if(fulfilled && recipe.labels.indexOf(label) === -1) {
				fulfilled = false;
			}
		});
		recipe.labels.forEach((label) => {
			if(fulfilled && this.props.getExcludedLabels().indexOf(label) > -1) {
				fulfilled = false;
			}
		});
		return fulfilled;
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

	exportCookbook = () => {
		let content = JSON.stringify(this.filterCookbook(this.props.getCookbook()));
		let link = document.createElement("a");
		const dataURI = "data:text/json;base64," + btoa(content);
		link.setAttribute("href", dataURI);
		link.setAttribute("download", "kochbuch.json");
		document.body.appendChild(link); // Firefox
		link.click();
	}
	
	mergeRecipes: () => void = () => {
		var x = document.getElementById("fileUpload");
		if(x){
			x.click();
		}		
	}
	
	openRandomRecipe: () => void = () => {
		const filteredCookbook: Cookbook = this.filterCookbook(this.state.cookbook);
		const recipeNumber = filteredCookbook.recipes.length;
		if(recipeNumber > 0) {
			const randomIndex = Math.floor(Math.random() * recipeNumber);
			const randomId = filteredCookbook.recipes[randomIndex].id;
			this.openRecipeById((randomId) as string);
		}
	}
	
	openRecipeById: (id: string) => void = (id) => {
		let goOn: boolean = true;
		this.state.cookbook.recipes.forEach((recipe, index) => {
			if(goOn && recipe.id === id) {
				this.openRecipe(index);
				goOn = false;
			}
		})
	}
	
	openRecipeByName: (name: string | null) => void = (name) => {
		let goOn: boolean = true;
		this.state.cookbook.recipes.forEach((recipe, index) => {
			if(goOn && recipe.name === name as string) {
				this.openRecipe(index);
				goOn = false;
			}
		})
	}
	
	
	render() {
		let cookbook: Cookbook = JSON.parse(JSON.stringify(this.state.cookbook));
		cookbook = this.filterCookbook(cookbook);
		
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
						<Autocomplete
							className="SearchField"
							freeSolo
							options={cookbook.recipes.map((recipe) => recipe.name)}
							onChange={(_event, value) => this.openRecipeByName(value)}
							renderInput={(params) => (
								<TextField
									className="SearchTextField"
									{...params}
									variant="standard"
									onChange={(event) => this.openRecipeByName(event.target.value)}
									InputProps={{
										...params.InputProps,
										type: 'search',
										startAdornment: (
											<InputAdornment className="SearchIcon" position="start">
												<SearchIcon />
											</InputAdornment>
										),
									}}
								/>
							)}
						/>
						<div className="RightHandButtons">
							<RightHandButton title="Wiederherstellen" onClick={() => this.props.restoreCookbook()} icon={<RestoreIcon/>}/>
							<RightHandButton title="Zufallsrezept" onClick={() => this.openRandomRecipe()} icon={<CasinoIcon/>}/>
							<RightHandButton title="Kombinieren" onClick={() => this.mergeRecipes()} icon={<MergeTypeIcon/>}/>
							<RightHandButton
								title="Kochbuch filtern"
								onClick={() => this.openFilterDialog()}
								icon={<TuneIcon/>}
								active={this.props.getIncludedLabels().concat(this.props.getExcludedLabels()).length > 0}
							/>
							<FilterDialog open={this.state.filterDialogOpen} closeDialog={() => this.closeFilterDialog()} />
							<RightHandButton title="Kochbuch exportieren" onClick={() => this.exportCookbook()} icon={<GetAppIcon/>}/>
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
	getIncludedLabels: () => getIncludedLabels(state),
	getExcludedLabels: () => getExcludedLabels(state)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	restoreCookbook: () => dispatch(restoreCookbook()),
	setCookbook: (cookbook: Cookbook) => dispatch(setCookbook(cookbook)),
	deleteRecipe: (id: string) => dispatch(deleteRecipe(id)),
	copyRecipe: (recipeId: string) => dispatch(copyRecipe(recipeId)),
	swapRecipes: (firstRecipeId: string, secondRecipeId: string) => dispatch(swapRecipes(firstRecipeId, secondRecipeId))
});

export const ReadModePage = connect(mapStateToProps, mapDispatchToProps)(UnconnectedReadModePage);