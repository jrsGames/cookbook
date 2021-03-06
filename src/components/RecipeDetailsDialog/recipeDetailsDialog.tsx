import React from 'react';
import './recipeDetailsDialog.css';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Recipe, Ingredient } from '../../redux/initialState';
import { updateRecipe } from '../../redux/action_creators/BookState';
import { IngredientsTable } from '../IngredientsTable/ingredientsTable';
import { parseDuration } from '../DurationDialog/durationDialog';
import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	IconButton,
	Chip,
	Tooltip,
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Typography,
	TextField,
	Zoom
} from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import EditIcon from '@material-ui/icons/Edit';
import ScheduleIcon from '@material-ui/icons/Schedule';
import DoneIcon from '@material-ui/icons/Done';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FastfoodIcon from '@material-ui/icons/Fastfood';


const EMPTY_INGREDIENT: Ingredient = {
	amount: "",
	name: ""
}

interface RecipeDetailsDialogProps {
	openInEditMode: boolean
	onClose: () => void,
	recipe: Recipe | null,
	onClickDuration: () => void,
	onClickPhoto: () => void,
	onClickPortions: () => void,
	onClickNewLabelChip: () => void,
	updateGlobalRecipe: (id: string, recipe: Recipe) => void,
	setRecipe: (recipe: Recipe) => void
}

interface RecipeDetailsDialogState {
	open: boolean,
	inEditMode: boolean
}


class UnconnectedRecipeDetailsDialog extends React.Component<RecipeDetailsDialogProps, RecipeDetailsDialogState> {
	
	constructor(props: RecipeDetailsDialogProps){
		super(props);
		this.state={
			open: false,
			inEditMode: this.props.openInEditMode
		}
	}
	
	componentDidUpdate(oldProps: RecipeDetailsDialogProps) {
		const { recipe, openInEditMode } = this.props;
		if(oldProps.recipe !== recipe) {
			this.setState({ open: recipe !== null && Array.isArray(recipe.labels) });
		}
		if(!this.state.open && this.state.inEditMode !== openInEditMode) {
			this.setState({ inEditMode: openInEditMode });
		}
	}
	
	getDialogTitle = () => {
		if(this.props.recipe) {
			return this.state.inEditMode ?
					<TextField
						value={this.props.recipe.name}
						variant="outlined"
						onChange={(event) => this.setRecipeName(event.target.value)}
					/>:
					<div className="RecipeDetailsTitle"> {this.props.recipe.name} </div>;
		}
		return "";
	}

	getPreparation = () => {
		if(this.props.recipe && this.props.recipe.preparation) {
			return this.props.recipe.preparation;
		}
		return "";
	}
	
	getLabelChips = () => {
		let chips: JSX.Element[] = [];
		if(this.props.recipe && this.props.recipe.labels) {
			const labels: string[] = JSON.parse(JSON.stringify(this.props.recipe.labels));
			chips = chips.concat(labels.map((label, index) => {
				return <Chip
							className="Label"
							color="primary"
							key={index}
							label={label}
							onDelete={this.state.inEditMode ? () => this.deleteLabel(index) : undefined}
						/>;
			}));
			if(this.state.inEditMode) {
				chips.push(
					<Chip
						className="NewLabel"
						key={labels.length}
						label="Neues Label"
						icon={<AddCircleIcon />}
						onClick={() => this.props.onClickNewLabelChip()}
					/>
				);
			}
		 }
		return chips;
	}

	getNotes = () => {
		if(this.props.recipe && this.props.recipe.notes) {
			return this.props.recipe.notes;
		}
		return "";
	}
	
	getIngredients = () => {
		if(this.props.recipe && this.props.recipe.ingredients){
			return this.props.recipe.ingredients;
		}
		return [];
	}
	
	getDurationLabel = () => {
		const {days, hours, minutes} = parseDuration(this.props.recipe?.duration || 0);
		const daysLabel = days.toString() + " T ";
		const hoursLabel = hours.toString() + " Std ";
		const minutesLabel = minutes.toString() + " Min";
		if(days) { return daysLabel + hoursLabel + minutesLabel; }
		if(hours) { return hoursLabel + minutesLabel; }
		if(minutes) { return minutesLabel; }
		return "Dauer angeben";
	}
	
	getPortionsLabel = () => {
		return this.props.recipe?.portions || 1;
	}
	
	getImageName = () => {
		if(this.props.recipe && this.props.recipe.image){
			return this.props.recipe.image.name;
		}
		return "Kein Foto";

	}
	
	setRecipeName = (newName: string) => {
		if(this.props.recipe) {
			const newRecipe = JSON.parse(JSON.stringify(this.props.recipe));
			newRecipe.name = newName;
			this.props.setRecipe(newRecipe);
		}
	}
	
	setPreparation = (text: string) => {
		if(this.props.recipe) {
			const newRecipe: Recipe = JSON.parse(JSON.stringify(this.props.recipe));
			newRecipe.preparation = text;
			this.props.setRecipe(newRecipe);
		}
	}
	
	setNotes = (text: string) => {
		if(this.props.recipe) {
			const newRecipe: Recipe = JSON.parse(JSON.stringify(this.props.recipe));
			newRecipe.notes = text;
			this.props.setRecipe(newRecipe);
		}
	}
	
	addIngredient = () => {
		if(this.props.recipe) {
			const newRecipe: Recipe = this.props.recipe;
			newRecipe.ingredients = JSON.parse(JSON.stringify(this.props.recipe.ingredients));
			newRecipe.ingredients.push(EMPTY_INGREDIENT);
			this.props.setRecipe(newRecipe);
		}
	}
	
	deleteIngredient = (index: number) => {
		if(this.props.recipe) {
			const newRecipe: Recipe = this.props.recipe;
			newRecipe.ingredients = JSON.parse(JSON.stringify(this.props.recipe.ingredients));
			newRecipe.ingredients.splice(index, 1);
			this.props.setRecipe(newRecipe);
		}
	}
	
	changeIngredientName = (index: number, name: string | null) => {
		if(this.props.recipe && name != null) {
			const newRecipe: Recipe = this.props.recipe;
			newRecipe.ingredients = this.props.recipe.ingredients;
			newRecipe.ingredients[index] = JSON.parse(JSON.stringify(this.props.recipe.ingredients[index]));
			newRecipe.ingredients[index].name = name;
			this.props.setRecipe(newRecipe);
		}
	}

	changeIngredientAmount = (index: number, amount: string | null) => {
		if(this.props.recipe && amount != null) {
			const newRecipe: Recipe = this.props.recipe;
			newRecipe.ingredients = this.props.recipe.ingredients;
			newRecipe.ingredients[index] = JSON.parse(JSON.stringify(this.props.recipe.ingredients[index]));
			newRecipe.ingredients[index].amount = amount;
			this.props.setRecipe(newRecipe);
		}
	}
	
	deleteLabel = (index: number) => {
		if(this.props.recipe && this.props.recipe.labels) {
			const newRecipe: Recipe = this.props.recipe;
			newRecipe.labels = JSON.parse(JSON.stringify(this.props.recipe.labels));
			newRecipe.labels.splice(index, 1);
			this.props.setRecipe(newRecipe);
		}
	}
	
	changeMode = () => {
		if(this.state.inEditMode) {
			this.saveAndClose();
		} else {
			this.setState({ inEditMode: true });
		}
	}
	
	saveAndClose = () => {
		if(this.props.recipe) {
			this.props.updateGlobalRecipe(this.props.recipe.id || "", this.props.recipe);
		}
		this.onClose();
	}
	
	onClickDuration = () => {
		if(this.state.inEditMode) { this.props.onClickDuration(); }
	}
	
	onClickPhoto = () => {
		if(this.state.inEditMode) {
			this.props.onClickPhoto();
		}
	}
	
	onClickPortions = () => {
		if(this.state.inEditMode) {
			this.props.onClickPortions();
		}
	}
	
	onClose = () => {
		this.setState({ inEditMode: false });
		this.props.onClose();
	}
		
	render() {
		document.addEventListener("keyup", (event) => {
			event.preventDefault();
			if (this.state.inEditMode && event.ctrlKey && event.altKey && event.key === "Enter") {
				this.saveAndClose();
			}
			if (!this.state.inEditMode && event.ctrlKey && event.altKey && event.key === "b") {
				this.setState({ inEditMode: true });
			}
			if (event.ctrlKey && event.altKey) {
				let expandButton: HTMLElement | null;
				switch(event.keyCode) {
					case 49: {
						expandButton = document.getElementById("ExpandIngredients");
						break;
					}
					case 50: {
						expandButton = document.getElementById("ExpandPreparation");
						break;
					}
					case 51: {
						expandButton = document.getElementById("ExpandLabels");
						break;
					}
					case 52: {
						expandButton = document.getElementById("ExpandNotes");
						break;
					}
					case 68: {
						expandButton = document.getElementById("RecipeDuration");
						break;
					}
					case 80: {
						expandButton = document.getElementById("RecipePortions");
						break;
					}
					case 70: {
						expandButton = document.getElementById("RecipePhoto");
						break;
					}
					default: expandButton = null;
				}
				if(expandButton) {
					expandButton.click();
				}
			}
		});
		
		return (
			<Dialog id="RecipeDetailsDialog" className="RecipeDetailsDialog" open={this.state.open} onClose={() => this.onClose()}>
				<DialogTitle className="RecipeTitle">
					{this.getDialogTitle()}
					<Tooltip title="Portionen ( STRG + ALT + P )" TransitionComponent={Zoom}>
						<Chip
							id="RecipePortions"
							className="UpperChip"
							disabled={!this.state.inEditMode}
							icon={<IconButton size="small"> <FastfoodIcon /> </IconButton>}
							label={this.getPortionsLabel()}
							onClick={() => this.onClickPortions()}
						/>
					</Tooltip>
					<Tooltip title="Dauer ( STRG + ALT + D )" TransitionComponent={Zoom}>
						<Chip
							id="RecipeDuration"
							className="UpperChip"
							disabled={!this.state.inEditMode}
							icon={<IconButton size="small"> <ScheduleIcon /> </IconButton>}
							label={this.getDurationLabel()}
							onClick={() => this.onClickDuration()}
						/>
					</Tooltip>
					<Tooltip title="Foto ( STRG + ALT + F )" TransitionComponent={Zoom}>
						<Chip
							id="RecipePhoto"
							className="UpperChip"
							disabled={!this.state.inEditMode}
							icon={<IconButton size="small"> <PhotoCameraIcon /> </IconButton>}
							label={this.getImageName()}
							onClick={() => this.onClickPhoto()}
						/>
					</Tooltip>
					<div className="ActionButtons">
						<Tooltip
							title={this.state.inEditMode ? "Speichern und schliessen ( STRG + ALT + ENTER )" : "Bearbeiten ( STRG + ALT + B )"}
							TransitionComponent={Zoom}
						>
							<IconButton className={this.state.inEditMode ? "DoneButton" : "EditButton"} onClick={() => this.changeMode()}>
								{this.state.inEditMode ? <DoneIcon/> : <EditIcon />}
							</IconButton>
						</Tooltip>
						<Tooltip title="Schliessen (ESC)" TransitionComponent={Zoom}>
							<IconButton className="CloseButton" onClick={() => this.onClose()}>
								<ClearIcon />
							</IconButton>
						</Tooltip>
					</div>
				</DialogTitle>
				<DialogContent>
					<Accordion>
						<Tooltip title="Zutaten ( STRG + ALT + 1 )" TransitionComponent={Zoom}>
							<AccordionSummary id="ExpandIngredients" expandIcon={<ExpandMoreIcon />}>
								<Typography> Zutaten </Typography>
							</AccordionSummary>
						</Tooltip>
						<AccordionDetails className="IngredientsDetails">
							<IngredientsTable
								ingredients={this.getIngredients()}
								onDelete={(index: number) => this.deleteIngredient(index)}
								onAdd={() => this.addIngredient()}
								onChangeIngredientName={(index, name) => this.changeIngredientName(index, name)}
								onChangeIngredientAmount={(index, amount) => this.changeIngredientAmount(index, amount)}
								editable={this.state.inEditMode}
							/>
						</AccordionDetails>
					</Accordion>
					<Accordion>
						<Tooltip title="Zubereitung ( STRG + ALT + 2 )" TransitionComponent={Zoom}>
							<AccordionSummary id="ExpandPreparation" expandIcon={<ExpandMoreIcon />}>
								<Typography> Zubereitung </Typography>
							</AccordionSummary>
						</Tooltip>
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
						<Tooltip title="Labels ( STRG + ALT + 3 )" TransitionComponent={Zoom}>
							<AccordionSummary id="ExpandLabels" expandIcon={<ExpandMoreIcon />}>
								<Typography> Labels </Typography>
							</AccordionSummary>
						</Tooltip>
						<AccordionDetails className="Chips">
							{this.getLabelChips()}
						</AccordionDetails>
					</Accordion>
					<Accordion>
						<Tooltip title="Notizen ( STRG + ALT + 4 )" TransitionComponent={Zoom}>
							<AccordionSummary id="ExpandNotes" expandIcon={<ExpandMoreIcon />}>
								<Typography> Notizen </Typography>
							</AccordionSummary>
						</Tooltip>
						<AccordionDetails className="Multiline">
							<TextField
								className="RecipeDetailsTextField"
								id="outlined-multiline-static"
								placeholder="Notizen hinzufuegen"
								multiline
								defaultValue={this.getNotes()}
								variant="outlined"
								disabled={!this.state.inEditMode}
								onChange={(event) => this.setNotes(event.target.value)}
							/>
						</AccordionDetails>
					</Accordion>
				</DialogContent>
				<DialogActions />
			</Dialog>
		);
	}
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
	updateGlobalRecipe: (id: string, newRecipe: Recipe) => dispatch(updateRecipe(id, newRecipe))
});

export const RecipeDetailsDialog = connect(() => ({}), mapDispatchToProps)(UnconnectedRecipeDetailsDialog);