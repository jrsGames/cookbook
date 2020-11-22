import React from 'react';
import './recipeDetails.css';
import { GlobalState, Recipe } from '../../redux/initialState';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Button,
	Chip
} from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@material-ui/core/TextField';
import { IngredientsTable } from '../IngredientsTable/ingredientsTable';

interface RecipeDetailsProps {
	closeDialog: () => void,
	recipe: Recipe | null
}

class UnconnectedRecipeDetails extends React.Component<RecipeDetailsProps> {

	getDialogTitle = () => {
		if(this.props.recipe) {
			return this.props.recipe.name;
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
	
	getLabels = () => {
		if(this.props.recipe) {
			return this.props.recipe.labels.map((label, index) => {
				return <Chip className="Label" key={index} label={label}/>;
			})
		 } else {
			return [];
		}
	}

	getNotes = () => {
		if(this.props.recipe && this.props.recipe.notes) {
			return this.props.recipe.notes;
		} else {
			return "";
		}
	}
	
	getIngredients = () => {
		if(this.props.recipe){
			return this.props.recipe.ingredients;
		} else {
			return [];
		}
	}

	render() {
		const recipe: Recipe | null = this.props.recipe;
		return (
			<div className="RecipeDetails">
				<Dialog className="RecipeDetailsDialog" open={recipe !== null} onClose={() => this.props.closeDialog()}>
					<DialogTitle>{this.getDialogTitle()}</DialogTitle>
					<DialogContent>
						<Accordion>
							<AccordionSummary expandIcon={<ExpandMoreIcon />}>
								<Typography> Zutaten </Typography>
							</AccordionSummary>
							<AccordionDetails>
								<IngredientsTable ingredients={this.getIngredients()}/>
							</AccordionDetails>
						</Accordion>
						<Accordion>
							<AccordionSummary expandIcon={<ExpandMoreIcon />}>
								<Typography> Zubereitung </Typography>
							</AccordionSummary>
							<AccordionDetails>
								<TextField
									id="outlined-multiline-static"
									placeholder="Zubereitung hinzufuegen"
									multiline
									rows={4}
									defaultValue={this.getPreparation()}
									variant="outlined"
								/>
							</AccordionDetails>
						</Accordion>
						<Accordion>
							<AccordionSummary expandIcon={<ExpandMoreIcon />}>
								<Typography> Labels </Typography>
							</AccordionSummary>
							<AccordionDetails>
								{this.getLabels()}
							</AccordionDetails>
						</Accordion>
						<Accordion>
							<AccordionSummary expandIcon={<ExpandMoreIcon />}>
								<Typography> Notizen </Typography>
							</AccordionSummary>
							<AccordionDetails>
								<TextField
									id="outlined-multiline-static"
									placeholder="Notizen hinzufuegen"
									multiline
									rows={4}
									defaultValue={this.getNotes()}
									variant="outlined"
								/>
							</AccordionDetails>
						</Accordion>
					</DialogContent>
					<DialogActions>
						<Button color="primary" onClick={() => this.props.closeDialog()}> Bearbeiten </Button>
						<Button color="primary" onClick={() => this.props.closeDialog()}> Schliessen </Button>
					</DialogActions>
				</Dialog>
			</div>
		);
	}
}

const mapStateToProps = (state: GlobalState) => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

export const RecipeDetails = connect(mapStateToProps, mapDispatchToProps)(UnconnectedRecipeDetails);