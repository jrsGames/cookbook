import React from 'react';
import './recipeDetails.css';
import { GlobalState, Recipe, Cookbook } from '../../redux/initialState';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { getCookbook } from '../../redux/selectors';
import { EMPTY_COOKBOOK } from '../UploadInput/uploadInput';
import { DurationDialog } from '../DurationDialog/durationDialog';
import { LabelDialog } from '../LabelDialog/labelDialog';
import { RecipeDetailsDialog } from '../RecipeDetailsDialog/recipeDetailsDialog';


interface RecipeDetailsProps {
	closeDialog: () => void,
	recipe: Recipe | null,
	index: number,
	getCookbook: () => Cookbook
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
	
	openLabelDialog = () => { this.setState({ labelDialogOpen: true }); }
	
	closeLabelDialog = () => { this.setState({ labelDialogOpen: false }); }
	
	openDurationDialog = () => { this.setState({ durationDialogOpen: true }); }
	
	closeDurationDialog = () => { this.setState({ durationDialogOpen: false }); }
	
	addLabel = (label: string) => {
		if(this.state.recipe && this.state.recipe.labels) {
			const newRecipe: Recipe = this.state.recipe;
			newRecipe.labels = JSON.parse(JSON.stringify(this.state.recipe.labels));
			newRecipe.labels.push(label);
			this.setState({ recipe: newRecipe, labelDialogOpen: false });
		}
	};
	
	setDuration = (duration: number) => {
		const newRecipe: Recipe = JSON.parse(JSON.stringify(this.state.recipe));
		newRecipe.duration = duration;
		this.setState({ recipe: newRecipe, durationDialogOpen: false })
	}
	
	closeDialog = () => {
		this.setState({ recipe: null });
		this.props.closeDialog();
	}


	render() {
		return (
			<div className="RecipeDetails">
				<RecipeDetailsDialog
					onClose={this.closeDialog}
					recipe={this.state.recipe}
					setRecipe={(recipe: Recipe) => this.setState({recipe})}
					onClickDuration={() => this.openDurationDialog()}
					onClickNewLabelChip={() => this.openLabelDialog()}
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

const mapDispatchToProps = (dispatch: Dispatch) => ({});

export const RecipeDetails = connect(mapStateToProps, mapDispatchToProps)(UnconnectedRecipeDetails);