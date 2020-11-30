import React from 'react';
import { GlobalState, Recipe, Cookbook } from '../../redux/initialState';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { getCookbook } from '../../redux/selectors';
import { EMPTY_COOKBOOK } from '../UploadInput/uploadInput';
import { DurationDialog } from '../DurationDialog/durationDialog';
import { LabelDialog } from '../LabelDialog/labelDialog';
import { RecipeDetailsDialog } from '../RecipeDetailsDialog/recipeDetailsDialog';
import { PhotoDialog } from '../PhotoDialog/photoDialog';


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
	photoDialogOpen: boolean
}

class UnconnectedRecipeDetails extends React.Component<RecipeDetailsProps, RecipeDetailsState> {
	
	constructor(props: RecipeDetailsProps){
		super(props);
		this.state={
			recipe: props.recipe,
			labelDialogOpen: false,
			durationDialogOpen: false,
			photoDialogOpen: false
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
	
	openPhotoDialog  = () => { this.setState({ photoDialogOpen: true }); }
	
	closePhotoDialog = () => { this.setState({ photoDialogOpen: false }); }
	
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
		this.setState({ recipe: newRecipe, durationDialogOpen: false });
	}
	
	setPhoto = (imageFileName: string) => {
		const newRecipe: Recipe = JSON.parse(JSON.stringify(this.state.recipe));
		newRecipe.image = imageFileName;
		this.setState({ recipe: newRecipe, photoDialogOpen: false });
	}
	
	closeDialog = () => {
		this.setState({ recipe: null });
		this.props.closeDialog();
	}


	render() {
		return (
			<div>
				<RecipeDetailsDialog
					onClose={this.closeDialog}
					recipe={this.state.recipe}
					setRecipe={(recipe: Recipe) => this.setState({recipe})}
					onClickDuration={() => this.openDurationDialog()}
					onClickPhoto={() => this.openPhotoDialog()}
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
				<PhotoDialog
					open={this.state.photoDialogOpen}
					closeDialog={() => this.closePhotoDialog()}
					setPhoto={(imageFileName: string) => this.setPhoto(imageFileName)}
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