import React from 'react';
import { GlobalState, Recipe } from '../../redux/initialState';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Button
} from '@material-ui/core';

interface RecipeDetailsProps {
	closeDialog: () => void,
	recipe: Recipe | null
}

class UnconnectedRecipeDetails extends React.Component<RecipeDetailsProps> {

	getDialogTitle = () => {
		if(this.props.recipe) {
			return "Willst du das Rezept \"" + this.props.recipe.name + "\" wirklich entfernen?"
		} else {
			return "";
		}
	}

	render() {
		console.log("rendering recipeDetails ", this.props.recipe);
		const recipe: Recipe | null = this.props.recipe;
		return (
			<div className="RecipeDetails">
				<Dialog open={recipe !== null} onClose={() => this.props.closeDialog()}>
					<DialogTitle>{this.getDialogTitle()}</DialogTitle>
					<DialogContent>
						<DialogContentText>
							Du kannst es danach nicht mehr wiederherstellen.
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button color="primary"> Ja </Button>
						<Button color="primary"> Nein </Button>
					</DialogActions>
				</Dialog>
			</div>
		);
	}
}

const mapStateToProps = (state: GlobalState) => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

export const RecipeDetails = connect(mapStateToProps, mapDispatchToProps)(UnconnectedRecipeDetails);