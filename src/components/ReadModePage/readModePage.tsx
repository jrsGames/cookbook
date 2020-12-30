import React from 'react';
import './readModePage.css';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { GlobalState, Cookbook, Recipe, ENTRY_VIEW, DEFAULT_FILE_NAME } from '../../redux/initialState';
import { getCookbook, getIncludedLabels, getExcludedLabels, getFileName } from '../../redux/selectors';
import { setView, setFileName } from '../../redux/action_creators/ViewState';
import { setCookbook, deleteRecipe, copyRecipe, swapRecipes, restoreCookbook, setCookbookString } from '../../redux/action_creators/BookState';
import { generateNewId } from '../UploadInput/uploadInput';
import { RecipeCard } from '../RecipeCard/recipeCard';
import { RecipeDetails } from '../RecipeDetails/recipeDetails';
import { RightHandButton } from '../RightHandButton/rightHandButton';
import { START_COOKBOOK } from '../EntryPage/entryPage';
import { TitleDialog } from '../TitleDialog/titleDialog';
import { FilterDialog } from '../FilterDialog/filterDialog';
import { SimpleDialog } from '../SimpleDialog/simpleDialog';
import { AppBar, Toolbar, IconButton, Typography, Tooltip, TextField, InputAdornment, Zoom } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import GetAppIcon from '@material-ui/icons/GetApp';
import EditIcon from '@material-ui/icons/Edit';
import TuneIcon from '@material-ui/icons/Tune';
import MergeTypeIcon from '@material-ui/icons/MergeType';
import CasinoIcon from '@material-ui/icons/Casino';
import SearchIcon from '@material-ui/icons/Search';
import RestoreIcon from '@material-ui/icons/Restore';
import HomeIcon from '@material-ui/icons/Home';
import AddCircleIcon from '@material-ui/icons/AddCircle';


export const getRecipeIndexById = (recipes: Recipe[], id: string) => 
	recipes.findIndex((recipe) => recipe.id && recipe.id === id);

const generateNewRecipeName = (existingRecipeNames: string[]) => {
	let name = "Neuer Titel";
	while(existingRecipeNames.indexOf(name) > -1) {
		name += "*";
	}
	return name
}

interface ReadModePageProps {
	getCookbook: () => Cookbook,
	setCookbook: (cookbook: Cookbook) => void,
	deleteRecipe: (id: string) => void,
	copyRecipe: (recipeId: string) => void,
	swapRecipes: (firstRecipeId: string, secondRecipeId: string) => void,
	getIncludedLabels: () => string[],
	getExcludedLabels: () => string[],
	restoreCookbook: () => void,
	goToEntryPage: () => void,
	getFileName: () => string
}

interface ReadModePageState {
	cookbook: Cookbook,
	toBeSwapped: string | null,
	openRecipeIndex: number,
	titleDialogOpen: boolean,
	filterDialogOpen: boolean,
	restoreDialogOpen: boolean,
	homeDialogOpen: boolean,
	openInEditMode: boolean
}

class UnconnectedReadModePage extends React.Component<ReadModePageProps, ReadModePageState> {
	
	constructor(props: ReadModePageProps){
		super(props);
		this.state = {
			cookbook: props.getCookbook(),
			toBeSwapped: null,
			openRecipeIndex: -1,
			titleDialogOpen: false,
			filterDialogOpen: false,
			restoreDialogOpen: false,
			homeDialogOpen: false,
			openInEditMode: false
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
	
	openHomeDialog = () => {
		this.setState({ homeDialogOpen: true });
	}
	
	closeHomeDialog = () => {
		this.setState({ homeDialogOpen: false });
	}

	openFilterDialog = () => {
		this.setState({ filterDialogOpen: true });
	}
	
	closeFilterDialog = () => {
		this.setState({ filterDialogOpen: false });
	}
	
	openRestoreDialog = () => {
		this.setState({ restoreDialogOpen: true });
	}
	
	closeRestoreDialog = () => {
		this.setState({ restoreDialogOpen: false });
	}
	
	openRecipeInReadMode = (index: number) => {
		this.setState({ openRecipeIndex: index, openInEditMode: false });
	}
	
	openRecipeInEditMode = (index: number) => {
		this.setState({ openRecipeIndex: index, openInEditMode: true });
	}
	
	addNewRecipe(){
		const newCookbook: Cookbook = JSON.parse(JSON.stringify(this.props.getCookbook()));
		let newRecipes: Recipe[] = JSON.parse(JSON.stringify(this.props.getCookbook().recipes));
		const defaultRecipe: Recipe = {
			name: generateNewRecipeName(
				JSON.parse(JSON.stringify(this.props.getCookbook().recipes)).map((recipe: Recipe) => recipe.name)
			),
			id: generateNewId(
				JSON.parse(JSON.stringify(this.props.getCookbook().recipes)).map((recipe: Recipe) => recipe.id)
			),
			ingredients: [],
			labels: [],
			preparation: "",
		}
		newRecipes = [defaultRecipe].concat(newRecipes);
		newCookbook.recipes = newRecipes;
		this.props.setCookbook(newCookbook);
		if(this.state.cookbook.recipes.length > 0) {
			this.openRecipeInEditMode(0);
		}
	}
	
	swapRecipe(id: string | null){
		if(this.state.toBeSwapped !== null) {
			const firstRecipeId = this.state.toBeSwapped || "";
			const secondRecipeId = id || "";
			this.setState({
				toBeSwapped: null
			});
			this.props.swapRecipes(firstRecipeId, secondRecipeId)
		} else {
			this.setState({
				toBeSwapped: id
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
		const dataURI = "data:text/json;charset=utf-8," + content;
		link.setAttribute("href", dataURI);
		link.setAttribute("download", this.props.getFileName());
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
				this.openRecipeInReadMode(index);
				goOn = false;
			}
		})
	}
	
	openRecipeByName: (name: string | null) => void = (name) => {
		let goOn: boolean = true;
		this.state.cookbook.recipes.forEach((recipe, index) => {
			if(goOn && recipe.name === name as string) {
				this.openRecipeInReadMode(index);
				goOn = false;
			}
		})
	}
	
	restoreCookbook = () => {
		this.props.restoreCookbook();
		this.closeRestoreDialog();
	}
	
	render() {
		
		const page = document.getElementById("ReadModePage");
		const searchField = document.getElementById("SearchField");
		if(page) {
			document.onkeyup = (event) => {
				event.preventDefault();
				if (this.state.openRecipeIndex === -1 && event.ctrlKey && event.altKey && searchField) {
					switch(event.key) {
						case "d": {
							searchField.blur();
							this.exportCookbook();
							break;
						}
						case "n": {
							searchField.blur();
							this.addNewRecipe();
							break;
						}
						case "f": {
							searchField.blur();
							this.openFilterDialog();
							break;
						}
						case "t": {
							searchField.click();
						}
					}
				}
				
			};
		}
	
		let cookbook: Cookbook = JSON.parse(JSON.stringify(this.state.cookbook));
		cookbook = this.filterCookbook(cookbook);
		
		return (
			<div id="ReadModePage" className="ReadModePage">
				<AppBar className="AppBar" position="static">
					<Toolbar>
						<Tooltip title="Titel bearbeiten" TransitionComponent={Zoom} placement="bottom">
							<Typography className="CookbookTitle" variant="h6" onClick={() => this.openTitleDialog()}>
								{cookbook.title}
							</Typography>
						</Tooltip>
						<Tooltip title="Titel bearbeiten" TransitionComponent={Zoom} placement="bottom">
							<IconButton color="inherit" onClick={() => this.openTitleDialog()}> <EditIcon /> </IconButton>
						</Tooltip>
						<TitleDialog
							open={this.state.titleDialogOpen}
							oldTitle={cookbook.title}
							closeDialog={() => this.closeTitleDialog()}
							setTitle={(newTitle: string) => this.setNewTitle(newTitle)}
						/>
						<Tooltip title="Rezepttitel suchen ( STRG + ALT + T )" TransitionComponent={Zoom} placement="bottom">
							<Autocomplete
								id="SearchField"
								className="SearchField"
								freeSolo
								options={cookbook.recipes.map((recipe) => recipe.name).sort()}
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
						</Tooltip>
						<div className="RightHandButtons">
							<RightHandButton title="Startseite" onClick={() => this.openHomeDialog()} icon={<HomeIcon/>}/>
							<SimpleDialog
								open={this.state.homeDialogOpen}
								onClose={() => this.closeHomeDialog()}
								title="Willst du zur Startseite zurueckkehren?"
								subTitle="Deine gesamten Aenderungen gehen dadurch verloren."
								onConfirm={() => this.props.goToEntryPage()}
							/>
							<RightHandButton title="Neues Rezept ( STRG + ALT + N )" onClick={() => this.addNewRecipe()} icon={<AddCircleIcon/>}/>
							<RightHandButton
								title="Kochbuch filtern ( STRG + ALT + F )"
								onClick={() => this.openFilterDialog()}
								icon={<TuneIcon/>}
								active={this.props.getIncludedLabels().concat(this.props.getExcludedLabels()).length > 0}
							/>
							<FilterDialog open={this.state.filterDialogOpen} closeDialog={() => this.closeFilterDialog()} />
							<RightHandButton title="Zufallsrezept" onClick={() => this.openRandomRecipe()} icon={<CasinoIcon/>}/>
							<RightHandButton title="Kombinieren" onClick={() => this.mergeRecipes()} icon={<MergeTypeIcon/>}/>
							<RightHandButton title="Wiederherstellen" onClick={() => this.openRestoreDialog()} icon={<RestoreIcon/>}/>
							<SimpleDialog
								open={this.state.restoreDialogOpen}
								onClose={() => this.closeRestoreDialog()}
								title="Willst du das Kochbuch wiederherstellen?"
								subTitle="Deine gesamten Aenderungen gehen dadurch verloren."
								onConfirm={() => this.restoreCookbook()}
							/>
							<RightHandButton title="Kochbuch herunterladen ( STRG + ALT + D )" onClick={() => this.exportCookbook()} icon={<GetAppIcon/>}/>
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
									onCardClick={() => this.openRecipeInReadMode(index)}
									onEditClick={() => this.openRecipeInEditMode(index)}
									onCopyClick={() => this.props.copyRecipe(recipe.id || "")}
									onSwapClick={() => this.swapRecipe(recipe.id || null)}
									swapping={this.state.toBeSwapped === recipe.id}
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
					openInEditMode={this.state.openInEditMode}
					index={this.state.openRecipeIndex}
					closeDialog={() => this.closeDetailsDialog()}
					/>
			</div>
		);
	}
}

const mapStateToProps = (state: GlobalState) => ({
	getCookbook: () => getCookbook(state) || START_COOKBOOK,
	getIncludedLabels: () => getIncludedLabels(state),
	getExcludedLabels: () => getExcludedLabels(state),
	getFileName: () => getFileName(state)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	goToEntryPage: () => {
		dispatch(setView(ENTRY_VIEW));
		dispatch(setFileName(DEFAULT_FILE_NAME));
		dispatch(setCookbook(null));
		dispatch(setCookbookString(""));
	},
	restoreCookbook: () => dispatch(restoreCookbook()),
	setCookbook: (cookbook: Cookbook) => dispatch(setCookbook(cookbook)),
	deleteRecipe: (id: string) => dispatch(deleteRecipe(id)),
	copyRecipe: (recipeId: string) => dispatch(copyRecipe(recipeId)),
	swapRecipes: (firstRecipeId: string, secondRecipeId: string) => dispatch(swapRecipes(firstRecipeId, secondRecipeId))
});

export const ReadModePage = connect(mapStateToProps, mapDispatchToProps)(UnconnectedReadModePage);