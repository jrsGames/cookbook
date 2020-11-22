import React from 'react';
import './recipeCard.css';
import { GlobalState, Recipe } from '../../redux/initialState';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import {
	Card,
	CardContent,
	CardActions,
	IconButton,
	Typography,
	Chip,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Button
} from '@material-ui/core';
import CallMadeIcon from '@material-ui/icons/CallMade';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import SwapHorizontalCircleIcon from '@material-ui/icons/SwapHorizontalCircle';
import DeleteIcon from '@material-ui/icons/Delete';

interface RecipeCardProps {
	recipe: Recipe,
	addSpaceBelow: boolean,
	onCopyClick: () => void,
	onSwapClick: () => void,
	swapping: boolean,
	onDeleteClick: () => void
}

interface RecipeCardState {
	dialogOpen: boolean
}

class UnconnectedRecipeCard extends React.Component<RecipeCardProps, RecipeCardState> {
	
	constructor(props: RecipeCardProps){
		super(props);
		this.state={
			dialogOpen: false
		}
	}
	
	getRootClassName = () => {
		return this.props.addSpaceBelow ? "RecipeCard RecipeCard--last" : "RecipeCard";
	}
	
	getSwapButtonClassName = () => {
		return this.props.swapping ? "ActionButton SwapButton-focussed" : "ActionButton SwapButton"
	}
	
	getImageSource = () => {
		const image = this.props.recipe.image;
		if(image) {
			try {
				return require('../../resources/' + image);
			} catch (e) {
				console.log("Picture \"" + image + "\" for recipe \"" + this.props.recipe.name + "\" not found.");
			}
		}
		return require('../../resources/defaultPic.jpg');
	}
	
	onDeleteClick = () => {
		this.setState({ dialogOpen: true });
	}
	
	closeDialog = () => {
		this.setState({ dialogOpen: false });
	}
	
	deleteRecipe = () => {
		this.props.onDeleteClick();
		this.closeDialog();
	}
	
	render() {
		const recipe: Recipe = this.props.recipe;
		return (
			<div className={this.getRootClassName()}>
				<Card>
					<div className="RecipeImageWrapper">
						<img className="RecipeImage" src={this.getImageSource()} alt="Loading" />
					</div>
					<CardContent>
						<Typography gutterBottom variant="h5" component="h2">
							{recipe.name}
						</Typography>
						{recipe.labels.map((label, index) => {
							return <Chip key={index} label={label}/>;
						})}
					</CardContent>
					<CardActions disableSpacing>
						<IconButton className="ActionButton DetailsButton"> <CallMadeIcon /> </IconButton>
						<IconButton className="ActionButton CopyButton" onClick={() => this.props.onCopyClick()}>
							<FileCopyIcon />
						</IconButton>
						<IconButton className={this.getSwapButtonClassName()} onClick={() => this.props.onSwapClick()}>
							<SwapHorizontalCircleIcon />
						</IconButton>
						<IconButton className="ActionButton DeleteButton" onClick={() => this.onDeleteClick()}>
							<DeleteIcon />
						</IconButton>
					</CardActions>
				</Card>
				<Dialog open={this.state.dialogOpen} onClose={() => this.closeDialog()}>
					<DialogTitle>{"Willst du das Rezept \"" + recipe.name + "\" wirklich entfernen?"}</DialogTitle>
					<DialogContent>
						<DialogContentText>
							Du kannst es danach nicht mehr wiederherstellen.
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button onClick={() => this.deleteRecipe()} color="primary"> Ja </Button>
						<Button onClick={() => this.closeDialog()} color="primary"> Nein </Button>
					</DialogActions>
				</Dialog>
			</div>
		);
	}
}

const mapStateToProps = (state: GlobalState) => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

export const RecipeCard = connect(mapStateToProps, mapDispatchToProps)(UnconnectedRecipeCard);