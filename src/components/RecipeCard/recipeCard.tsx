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
	Button,
	Tooltip
} from '@material-ui/core';
import CallMadeIcon from '@material-ui/icons/CallMade';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import SwapHorizontalCircleIcon from '@material-ui/icons/SwapHorizontalCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import Zoom from '@material-ui/core/Zoom';


export const DEFAULT_PIC_NAME = "StandardBild.jpg";

interface RecipeCardProps {
	recipe: Recipe,
	addSpaceBelow: boolean,
	onOpenClick: () => void
	onCopyClick: () => void,
	onSwapClick: () => void,
	swapping: boolean,
	onDeleteClick: () => void
}

interface RecipeCardState {
	deleteDialogOpen: boolean
}

class UnconnectedRecipeCard extends React.Component<RecipeCardProps, RecipeCardState> {
	
	constructor(props: RecipeCardProps){
		super(props);
		this.state={
			deleteDialogOpen: false
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
		return require('../../resources/' + DEFAULT_PIC_NAME);
	}
	
	onDeleteClick = () => {
		this.setState({ deleteDialogOpen: true });
	}
	
	closeDeleteDialog = () => {
		this.setState({ deleteDialogOpen: false });
	}
	
	deleteRecipe = () => {
		this.props.onDeleteClick();
		this.closeDeleteDialog();
	}
	
	getTitleClassName = (title: string) => {
		return title.length > 17 ? title.length > 21 ? "RecipeTitle-tiny" : "RecipeTitle-small" : "RecipeTitle";
	}

	trimTitle = (title: string) => title.length > 25 ? title.substr(0,24) + "..." : title;
	
	render() {
		const recipe: Recipe = this.props.recipe;
		return (
			<div className={this.getRootClassName()}>
				<Card>
					<div className="RecipeImageWrapper">
						<img className="RecipeImage" src={this.getImageSource()} alt="Loading" />
					</div>
					<CardContent>
						<Tooltip title={recipe.name} TransitionComponent={Zoom} placement="top">
							<Typography className={this.getTitleClassName(recipe.name)} gutterBottom variant="h5" component="h2">
								{this.trimTitle(recipe.name)}
							</Typography>
						</Tooltip>
						<div className="Labels">
							{recipe.labels.map((label, index) => {
								return <Chip className="CardLabel" color="primary" key={index} label={label}/>;
							})}
						</div>
					</CardContent>
					<CardActions disableSpacing>
						<Tooltip title="Details" TransitionComponent={Zoom}>
							<IconButton className="ActionButton DetailsButton" onClick={() => this.props.onOpenClick()}>
								<CallMadeIcon />
							</IconButton>
						</Tooltip>
						<Tooltip title="Kopieren" TransitionComponent={Zoom}>
							<IconButton className="ActionButton CopyButton" onClick={() => this.props.onCopyClick()}>
								<FileCopyIcon />
							</IconButton>
						</Tooltip>
						<Tooltip title="Verschieben" TransitionComponent={Zoom}>
							<IconButton className={this.getSwapButtonClassName()} onClick={() => this.props.onSwapClick()}>
								<SwapHorizontalCircleIcon />
							</IconButton>
						</Tooltip>
						<Tooltip title="Entfernen" TransitionComponent={Zoom}>
							<IconButton className="ActionButton DeleteButton" onClick={() => this.onDeleteClick()}>
								<DeleteIcon />
							</IconButton>
						</Tooltip>
					</CardActions>
				</Card>
				<Dialog open={this.state.deleteDialogOpen} onClose={() => this.closeDeleteDialog()}>
					<DialogTitle>{"Willst du das Rezept \"" + recipe.name + "\" wirklich entfernen?"}</DialogTitle>
					<DialogContent>
						<DialogContentText>
							Du kannst es danach nicht mehr wiederherstellen.
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button onClick={() => this.deleteRecipe()} color="primary"> Ja </Button>
						<Button onClick={() => this.closeDeleteDialog()} color="primary"> Nein </Button>
					</DialogActions>
				</Dialog>
			</div>
		);
	}
}

const mapStateToProps = (state: GlobalState) => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

export const RecipeCard = connect(mapStateToProps, mapDispatchToProps)(UnconnectedRecipeCard);