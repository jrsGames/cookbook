import React from 'react';
import { GlobalState, Recipe, Cookbook, Image } from '../../redux/initialState';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { getCookbook } from '../../redux/selectors';
import { START_COOKBOOK } from '../EntryPage/entryPage';
import { DurationDialog } from '../DurationDialog/durationDialog';
import { LabelDialog } from '../LabelDialog/labelDialog';
import { RecipeDetailsDialog } from '../RecipeDetailsDialog/recipeDetailsDialog';
import { PhotoDialog } from '../PhotoDialog/photoDialog';


interface RecipeDetailsProps {
	closeDialog: () => void,
	recipe: Recipe | null,
	index: number,
	getCookbook: () => Cookbook,
	openInEditMode: boolean
}

interface RecipeDetailsState {
	recipe: Recipe | null,
	labelDialogOpen: boolean,
	durationDialogOpen: boolean,
	photoDialogOpen: boolean,
	importedFileName: string
}

class UnconnectedRecipeDetails extends React.Component<RecipeDetailsProps, RecipeDetailsState> {
	
	constructor(props: RecipeDetailsProps){
		super(props);
		this.state={
			recipe: props.recipe,
			labelDialogOpen: false,
			durationDialogOpen: false,
			photoDialogOpen: false,
			importedFileName: ""
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
	
	addLabelAndClose = (label: string) => {
		if(this.state.recipe && this.state.recipe.labels) {
			const newRecipe: Recipe = this.state.recipe;
			newRecipe.labels = JSON.parse(JSON.stringify(this.state.recipe.labels));
			newRecipe.labels.push(label);
			this.setState({ recipe: newRecipe, labelDialogOpen: false });
		}
	};
	
	setDurationAndClose = (duration: number) => {
		const newRecipe: Recipe = JSON.parse(JSON.stringify(this.state.recipe));
		newRecipe.duration = duration;
		this.setState({ recipe: newRecipe, durationDialogOpen: false });
	}
	
	setPhotoAndClose = (image: Image) => {
		if(this.state.recipe) {
			const newRecipe: Recipe = JSON.parse(JSON.stringify(this.state.recipe));
			newRecipe.image = image;
			this.setState({ recipe: newRecipe, photoDialogOpen: false });
		}
	}
	
	closeDialog = () => {
		this.setState({ recipe: null });
		this.props.closeDialog();
	}
	
	onClickPhoto = () => {
		this.readPhoto();
		this.openPhotoDialog();
	} 

	readPhoto: () => void = () => {
		let x = document.getElementById("photoUpload") as HTMLInputElement;
		if(x && x.files && x.files.length === 1){
			let importedFile = x.files[0];
			this.setState({ importedFileName: importedFile.name });
		}
	}

	uploadPhoto: () => void = () => {
		var x = document.getElementById("photoUpload");
		if(x){
			x.click();
		}		
	}

	render() {
		return (
			<div>
				<RecipeDetailsDialog
					onClose={() => this.closeDialog()}
					recipe={this.state.recipe}
					openInEditMode={this.props.openInEditMode}
					setRecipe={(recipe: Recipe) => this.setState({recipe})}
					onClickDuration={() => this.openDurationDialog()}
					onClickPhoto={() => this.uploadPhoto()}
					onClickNewLabelChip={() => this.openLabelDialog()}
				/>
				<DurationDialog
					open={this.state.durationDialogOpen}
					closeDialog={() => this.closeDurationDialog()}
					recipe={this.state.recipe}
					setDuration={(dur: number) => this.setDurationAndClose(dur)}
				 />
				<LabelDialog
					open={this.state.labelDialogOpen}
					closeDialog={() => this.closeLabelDialog()}
					addLabel={(label: string) => this.addLabelAndClose(label)}
				/>
				<PhotoDialog
					open={this.state.photoDialogOpen}
					closeDialog={() => this.closePhotoDialog()}
					setPhoto={(image) => this.setPhotoAndClose(image)}
					imageName={this.state.importedFileName}
				/>
				<div className="PhotoInput">
					<input type="file" id="photoUpload" style={{'display': 'none'}} onChange={() => this.onClickPhoto()}/>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state: GlobalState) => ({
	getCookbook: () => getCookbook(state) || START_COOKBOOK
});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

export const RecipeDetails = connect(mapStateToProps, mapDispatchToProps)(UnconnectedRecipeDetails);