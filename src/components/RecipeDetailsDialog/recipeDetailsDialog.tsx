import React from 'react';
import './recipeDetailsDialog.css';
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
	Typography
} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import ClearIcon from '@material-ui/icons/Clear';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import Zoom from '@material-ui/core/Zoom';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { IngredientsTable } from '../IngredientsTable/ingredientsTable';
import { Recipe, GlobalState } from '../../redux/initialState';
import { parseDuration } from '../DurationDialog/durationDialog';
import { connect } from 'react-redux';
import { updateRecipe } from '../../redux/action_creators/BookState';
import { Dispatch } from 'redux';


interface RecipeDetailsDialogProps {
	open: boolean,
	onClose: () => void,
	recipe: Recipe | null,
	onClickDuration: () => void,
	onClickNewLabelChip: () => void,
	updateGlobalRecipe: (id: string, recipe: Recipe) => void,
	setRecipeName: (name: string) => void,
	onClickOldLabelChip: (index: number) => void,
	addIngredient: () => void,
	deleteIngredient: (index: number) => void,
	setPreparation: (text: string) => void,
	setNotes: (text: string) => void,
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
			open: props.open,
			inEditMode: false
		}
	}
	
	componentDidUpdate(oldProps: RecipeDetailsDialogProps) {
		if(oldProps.open !== this.props.open) {
			this.setState({ open: this.props.open });
		}
	}
	
	getDialogTitle = () => {
		if(this.props.recipe) {
			return this.state.inEditMode ?
					<TextField
						value={this.props.recipe.name}
						variant="outlined"
						onChange={(event) => this.props.setRecipeName(event.target.value)}
					/> :
					this.props.recipe.name;
		} else {
			return "";
		}
	}

	getPreparation = () => {
		if(this.props.recipe && this.props.recipe.preparation) {
			return this.props.recipe.preparation;
		} else {
			return "Zubereitung hinzufuegen";
		}
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
							onDelete={this.state.inEditMode ? () => this.props.onClickOldLabelChip(index) : undefined}
						/>;
			}));
			if(this.state.inEditMode) {
				chips.push(
					<Chip
						className="Label"
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
		} else {
			return "";
		}
	}
	
	getIngredients = () => {
		if(this.props.recipe && this.props.recipe.ingredients){
			return this.props.recipe.ingredients;
		} else {
			return [];
		}
	}
	
	getDurationLabel = () => {
		const {days, hours, minutes} = parseDuration(this.props.recipe?.duration || 0);
		const daysLabel = days.toString() + " T ";
		const hoursLabel = hours.toString() + " Std ";
		const minutesLabel = minutes.toString() + " Min";
		if(days) {
			return daysLabel + hoursLabel + minutesLabel;
		}
		if(hours) {
			return hoursLabel + minutesLabel;
		}
		if(minutes) {
			return minutesLabel;
		}
		return "Dauer angeben";
	}
	
	changeMode = () => {
		if(this.state.inEditMode && this.props.recipe) {
			this.props.updateGlobalRecipe(this.props.recipe.id || "", this.props.recipe);
		}
		this.setState({ inEditMode: !this.state.inEditMode });
	}
	
	onClickDuration = () => {
		if(this.state.inEditMode) {
			this.props.onClickDuration();
		}
	}


	render() {
		return (
			<Dialog className="RecipeDetailsDialog" open={this.state.open} onClose={() => this.props.onClose()}>
				<DialogTitle className="RecipeTitle">
					{this.getDialogTitle()}
					<Chip
						className="Duration"
						color="secondary"
						icon={this.state.inEditMode ? <IconButton size="small"> <EditIcon /> </IconButton> : undefined}
						label={this.getDurationLabel()}
						onClick={() => this.onClickDuration()}
					/>
					<div className="ActionButtons">
						<Tooltip title={this.state.inEditMode ? "Speichern" : "Bearbeiten"} TransitionComponent={Zoom}>
							<IconButton className="ActionButton EditButton" onClick={() => this.changeMode()}>
								{this.state.inEditMode ? <DoneIcon /> : <EditIcon />}
							</IconButton>
						</Tooltip>
						<Tooltip title="Schliessen" TransitionComponent={Zoom}>
							<IconButton className="ActionButton CloseButton" onClick={() => this.props.onClose()}>
								<ClearIcon />
							</IconButton>
						</Tooltip>
					</div>
				</DialogTitle>
				<DialogContent>
					<Accordion>
						<AccordionSummary expandIcon={<ExpandMoreIcon />}>
							<Typography> Zutaten </Typography>
						</AccordionSummary>
						<AccordionDetails className="IngredientsDetails">
							<IngredientsTable
								ingredients={this.getIngredients()}
								onDelete={(index: number) => this.props.deleteIngredient(index)}
								onAdd={() => this.props.addIngredient()}
								editable={this.state.inEditMode}
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
								onChange={(event) => this.props.setPreparation(event.target.value)}
							/>
						</AccordionDetails>
					</Accordion>
					<Accordion>
						<AccordionSummary expandIcon={<ExpandMoreIcon />}>
							<Typography> Labels </Typography>
						</AccordionSummary>
						<AccordionDetails className="Chips">
							{this.getLabelChips()}
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
								defaultValue={this.getNotes()}
								variant="outlined"
								disabled={!this.state.inEditMode}
								onChange={(event) => this.props.setNotes(event.target.value)}
							/>
						</AccordionDetails>
					</Accordion>
				</DialogContent>
				<DialogActions />
			</Dialog>
		);
	}
}

const mapStateToProps = (state: GlobalState) => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	updateGlobalRecipe: (id: string, newRecipe: Recipe) => dispatch(updateRecipe(id, newRecipe))
});

export const RecipeDetailsDialog = connect(mapStateToProps, mapDispatchToProps)(UnconnectedRecipeDetailsDialog);