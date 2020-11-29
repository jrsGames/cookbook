import React from 'react';
import './recipeDetails.css';
import { GlobalState, Recipe, Ingredient, Cookbook } from '../../redux/initialState';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { getCookbook } from '../../redux/selectors';
import { updateRecipe } from '../../redux/action_creators/BookState';
import { EMPTY_COOKBOOK } from '../UploadInput/uploadInput';
import { DurationDialog } from '../DurationDialog/durationDialog';
import { LabelDialog } from '../LabelDialog/labelDialog';
import { RecipeDetailsDialog } from '../RecipeDetailsDialog/recipeDetailsDialog';


const EMPTY_INGREDIENT: Ingredient = {
	amount: "",
	name: ""
}

interface RecipeDetailsProps {
	closeDialog: () => void,
	recipe: Recipe | null,
	index: number,
	getCookbook: () => Cookbook,
	updateRecipe: (id: string, newRecipe: Recipe) => void
}

interface RecipeDetailsState {
	recipe: Recipe | null,
	labelDialogOpen: boolean,
	durationDialogOpen: boolean,
}

class UnconnectedRecipeDetails extends React.Component<RecipeDetailsProps, RecipeDetailsState> {
	
	constructor(props: RecipeDetailsProps){
		super(props);
		this.state={
			recipe: props.recipe,
			labelDialogOpen: false,
			durationDialogOpen: false
		}
	}
	
	componentDidUpdate(oldProps: RecipeDetailsProps) {
		if(oldProps.recipe !== this.props.recipe) {
			this.setState({recipe: this.props.recipe });
		}
	}
	
	setRecipeName = (newName: string) => {
		if(this.state.recipe) {
			const newRecipe = JSON.parse(JSON.stringify(this.state.recipe));
			newRecipe.name = newName;
			this.setState({ recipe: newRecipe });
		}
	}
	
	openLabelDialog = () => {
		this.setState({ labelDialogOpen: true });
	}
	
	closeLabelDialog = () => {
		this.setState({ labelDialogOpen: false });
	}
	
	openDurationDialog = () => {
		this.setState({ durationDialogOpen: true });
	}
	
	closeDurationDialog = () => {
		this.setState({ durationDialogOpen: false });
	}
	
	addLabel = (label: string) => {
		if(this.state.recipe && this.state.recipe.labels) {
			const newRecipe: Recipe = this.state.recipe;
			newRecipe.labels = JSON.parse(JSON.stringify(this.state.recipe.labels));
			newRecipe.labels.push(label);
			this.setState({ recipe: newRecipe, labelDialogOpen: false });
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
	
	setDuration = (duration: number) => {
		const newRecipe: Recipe = JSON.parse(JSON.stringify(this.state.recipe));
		newRecipe.duration = duration;
		this.setState({ recipe: newRecipe, durationDialogOpen: false })
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


	render() {
		return (
			<div className="RecipeDetails">
				<RecipeDetailsDialog
					open={this.dialogOpen()}
					onClose={this.closeDialog}
					recipe={this.state.recipe}
					onClickDuration={() => this.openDurationDialog()}
					onClickNewLabelChip={() => this.openLabelDialog()}
					updateGlobalRecipe={(id: string, recipe: Recipe) => this.props.updateRecipe(id, recipe)}
					setRecipeName={(name: string) => this.setRecipeName(name)}
					onClickOldLabelChip={(index: number) => this.deleteLabel(index)}
					addIngredient={() => this.addIngredient()}
					deleteIngredient={(index: number) => this.deleteIngredient(index)}
					setPreparation={(text: string) => this.setPreparation(text)}
					setNotes={(text: string) => this.setNotes(text)}
				/>
				<DurationDialog
					open={this.state.durationDialogOpen}
					closeDialog={() => this.closeDurationDialog()}
					recipe={this.state.recipe}
					setDuration={(dur: number) => this.setDuration(dur)}
				 />
				<LabelDialog
					open={this.state.labelDialogOpen}
					closeDialog={() => this.closeLabelDialog()}
					addLabel={(label: string) => this.addLabel(label)}
				/>
			</div>
		);
	}
}

const mapStateToProps = (state: GlobalState) => ({
	getCookbook: () => getCookbook(state) || EMPTY_COOKBOOK
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	updateRecipe: (id: string, newRecipe: Recipe) => dispatch(updateRecipe(id, newRecipe))
});

export const RecipeDetails = connect(mapStateToProps, mapDispatchToProps)(UnconnectedRecipeDetails);