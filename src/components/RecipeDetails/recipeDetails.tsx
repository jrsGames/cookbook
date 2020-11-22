import React from 'react';
import { GlobalState, Recipe } from '../../redux/initialState';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Button
} from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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
		if(this.props.recipe) {
			return this.props.recipe.preparation;
		} else {
			return "";
		}
	}
	
	getNotes = () => {
		if(this.props.recipe) {
			return this.props.recipe.note;
		} else {
			return "";
		}
	}

	render() {
		const recipe: Recipe | null = this.props.recipe;
		return (
			<div className="RecipeDetails">
				<Dialog open={recipe !== null} onClose={() => this.props.closeDialog()}>
					<DialogTitle>{this.getDialogTitle()}</DialogTitle>
					<DialogContent>
						<Accordion>
							<AccordionSummary expandIcon={<ExpandMoreIcon />}>
								<Typography> Zutaten </Typography>
							</AccordionSummary>
							<AccordionDetails>
								<Typography> ToDo: Zutaten einfuegen </Typography>
							</AccordionDetails>
						</Accordion>
						<Accordion>
							<AccordionSummary expandIcon={<ExpandMoreIcon />}>
								<Typography> Zubereitung </Typography>
							</AccordionSummary>
							<AccordionDetails>
								<Typography> {this.getPreparation()} </Typography>
							</AccordionDetails>
						</Accordion>
						<Accordion>
							<AccordionSummary expandIcon={<ExpandMoreIcon />}>
								<Typography> Labels </Typography>
							</AccordionSummary>
							<AccordionDetails>
								<Typography> Labels einfuegen </Typography>
							</AccordionDetails>
						</Accordion>
						<Accordion>
							<AccordionSummary expandIcon={<ExpandMoreIcon />}>
								<Typography> Notizen </Typography>
							</AccordionSummary>
							<AccordionDetails>
								<Typography> {this.getNotes()} </Typography>
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