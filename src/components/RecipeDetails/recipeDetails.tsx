import React from 'react';
import './recipeDetails.css';
import { GlobalState, Recipe, Ingredient } from '../../redux/initialState';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Chip,
	FormControl,
	IconButton,
	Tooltip
} from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@material-ui/core/TextField';
import { IngredientsTable } from '../IngredientsTable/ingredientsTable';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { LABELS } from '../../labels';
import EditIcon from '@material-ui/icons/Edit';
import Zoom from '@material-ui/core/Zoom';


const EMPTY_INGREDIENT: Ingredient = {
	amount: "",
	name: ""
}

interface RecipeDetailsProps {
	closeDialog: () => void,
	recipe: Recipe | null
}

interface RecipeDetailsState {
	recipe: Recipe | null,
	addLabelDialogOpen: boolean,
	newLabel: string | null,
	inEditMode: boolean
}

class UnconnectedRecipeDetails extends React.Component<RecipeDetailsProps, RecipeDetailsState> {
	
	constructor(props: RecipeDetailsProps){
		super(props);
		this.state={
			recipe: props.recipe,
			addLabelDialogOpen: false,
			newLabel: null,
			inEditMode: false
		}
	}
	
	componentDidUpdate(oldProps: RecipeDetailsProps) {
		if(oldProps.recipe !== this.props.recipe) {
			this.setState({recipe: this.props.recipe});
		}
	}

	getDialogTitle = () => {
		if(this.state.recipe) {
			return this.state.recipe.name;
		} else {
			return "";
		}
	}
	
	getPreparation = () => {
		if(this.state.recipe && this.state.recipe.preparation) {
			return this.state.recipe.preparation;
		} else {
			return "Zubereitung hinzufuegen";
		}
	}
	
	getLabels = () => {
		let chips: JSX.Element[] = [];
		if(this.state.recipe && this.state.recipe.labels) {
			const labels: string[] = JSON.parse(JSON.stringify(this.state.recipe.labels));
			chips = chips.concat(labels.map((label, index) => {
				return <Chip className="Label" color="primary" key={index} label={label} onDelete={() => this.deleteLabel(index)}/>;
			}));
			chips.push(
				<Chip
					className="Label"
					key={labels.length}
					label="Neues Label"
					icon={<AddCircleIcon />}
					onClick={() => this.openAddLabelDialog()}
				/>
			);
		 }
		return chips;
	}

	getNotes = () => {
		if(this.state.recipe && this.state.recipe.notes) {
			return this.state.recipe.notes;
		} else {
			return "";
		}
	}
	
	getIngredients = () => {
		if(this.state.recipe && this.state.recipe.ingredients){
			return this.state.recipe.ingredients;
		} else {
			return [];
		}
	}
	
	openAddLabelDialog = () => {
		this.setState({ addLabelDialogOpen: true });
	}
	
	closeAddLabelDialog = () => {
		this.setState({ addLabelDialogOpen: false, newLabel: null });
	}
	
	setNewLabel = (label: string | null) => {
		this.setState({ newLabel: label });
	}
	
	addLabel = () => {
		if(this.state.recipe && this.state.recipe.labels && this.state.newLabel) {
			const newRecipe: Recipe = this.state.recipe;
			newRecipe.labels = JSON.parse(JSON.stringify(this.state.recipe.labels));
			newRecipe.labels.push(this.state.newLabel);
			this.setState({ recipe: newRecipe, addLabelDialogOpen: false });
		}
	};
	
		
	deleteLabel = (index: number) => {
		if(this.state.recipe && this.state.recipe.labels) {
			const newRecipe: Recipe = this.state.recipe;
			newRecipe.labels = JSON.parse(JSON.stringify(this.state.recipe.labels));
			newRecipe.labels.splice(index, 1);
			this.setState({recipe: newRecipe});
		}
	}
	
	setPreparation = (text: string) => {
		if(this.state.recipe) {
			const newRecipe: Recipe = JSON.parse(JSON.stringify(this.state.recipe));
			newRecipe.preparation = text;
			this.setState({recipe: newRecipe});
		}
	}
	
	setNotes = (text: string) => {
		if(this.state.recipe) {
			const newRecipe: Recipe = JSON.parse(JSON.stringify(this.state.recipe));
			newRecipe.notes = text;
			this.setState({recipe: newRecipe});
		}
	}
	
	addIngredient = () => {
		if(this.state.recipe) {
			const newRecipe: Recipe = this.state.recipe;
			newRecipe.ingredients = JSON.parse(JSON.stringify(this.state.recipe.ingredients));
			newRecipe.ingredients.push(EMPTY_INGREDIENT);
			this.setState({recipe: newRecipe});
		}
	}
	
	deleteIngredient = (index: number) => {
		if(this.state.recipe) {
			const newRecipe: Recipe = this.state.recipe;
			newRecipe.ingredients = JSON.parse(JSON.stringify(this.state.recipe.ingredients));
			newRecipe.ingredients.splice(index, 1);
			this.setState({recipe: newRecipe});
		}
	}
	
	dialogOpen = () => {
		const { recipe } = this.state;
		return  recipe !== null && Array.isArray(recipe.labels);
	}
	
	closeDialog = () => {
		this.setState({ recipe: null });
		this.props.closeDialog();
	}
	
	changeMode = () => {
		this.setState({ inEditMode: !this.state.inEditMode })
	}

	render() {
		return (
			<div className="RecipeDetails">
				<Dialog className="RecipeDetailsDialog" open={this.dialogOpen()} onClose={() => this.closeDialog()}>
					<DialogTitle>{this.getDialogTitle()}</DialogTitle>
					<DialogContent>
						<Accordion>
							<AccordionSummary expandIcon={<ExpandMoreIcon />}>
								<Typography> Zutaten </Typography>
							</AccordionSummary>
							<AccordionDetails className="IngredientsDetails">
								<IngredientsTable
									ingredients={this.getIngredients()}
									onDelete={(index: number) => this.deleteIngredient(index)}
									onAdd={() => this.addIngredient()}
								/>
							</AccordionDetails>
						</Accordion>
						<Accordion>
							<AccordionSummary expandIcon={<ExpandMoreIcon />}>
								<Typography> Zubereitung </Typography>
							</AccordionSummary>
							<AccordionDetails className="Multiline">
								<TextField
									className="RecipeDetailsTextField"
									id="outlined-multiline-static"
									placeholder="Zubereitung hinzufuegen"
									multiline
									defaultValue={this.getPreparation()}
									variant="outlined"
									disabled={!this.state.inEditMode}
									onChange={(event) => this.setPreparation(event.target.value)}
								/>
							</AccordionDetails>
						</Accordion>
						<Accordion>
							<AccordionSummary expandIcon={<ExpandMoreIcon />}>
								<Typography> Labels </Typography>
							</AccordionSummary>
							<AccordionDetails className="Chips">
								{this.getLabels()}
							</AccordionDetails>
						</Accordion>
						<Accordion>
							<AccordionSummary expandIcon={<ExpandMoreIcon />}>
								<Typography> Notizen </Typography>
							</AccordionSummary>
							<AccordionDetails className="Multiline">
								<TextField
									className="RecipeDetailsTextField"
									id="outlined-multiline-static"
									placeholder="Notizen hinzufuegen"
									multiline
									rows={4}
									defaultValue={this.getNotes()}
									variant="outlined"
									disabled={!this.state.inEditMode}
									onChange={(event) => this.setNotes(event.target.value)}
								/>
							</AccordionDetails>
						</Accordion>
					</DialogContent>
					<DialogActions>
						<Tooltip title="Bearbeiten" TransitionComponent={Zoom}>
							<IconButton className="ActionButton EditButton" onClick={() => this.changeMode()}>
								<EditIcon />
							</IconButton>
						</Tooltip>
						<Tooltip title="Schliessen" TransitionComponent={Zoom}>
							<IconButton className="ActionButton CloseButton" onClick={() => this.closeDialog()}>
								<ClearIcon />
							</IconButton>
						</Tooltip>
					</DialogActions>
				</Dialog>
				<Dialog className="AddLabelDialog" open={this.state.addLabelDialogOpen} onClose={() => this.closeAddLabelDialog()}>
					<DialogTitle> Neues Label </DialogTitle>
					<DialogContent>
						<FormControl className="AddLabelForm">
								<Autocomplete
									freeSolo
									options={LABELS}
									onChange={(_event, value) => this.setNewLabel(value)}
									renderInput={(params) => (
										<TextField
											{...params}
											variant="outlined"
											onChange={(event) => this.setNewLabel(event.target.value)}
											InputProps={{ ...params.InputProps, type: 'search' }}
										/>
									)}
								/>
						</FormControl>
					</DialogContent>
					<DialogActions>
						<IconButton onClick={() => this.addLabel()} color="primary"> <CheckIcon/> </IconButton>
						<IconButton onClick={() => this.closeAddLabelDialog()} color="primary"> <ClearIcon/> </IconButton>
					</DialogActions>
				</Dialog>
			</div>
		);
	}
}

const mapStateToProps = (state: GlobalState) => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

export const RecipeDetails = connect(mapStateToProps, mapDispatchToProps)(UnconnectedRecipeDetails);