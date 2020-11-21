import React from 'react';
import './recipeCard.css';
import { GlobalState, Recipe } from '../../redux/initialState';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Card, CardContent, CardActions, IconButton, Typography, Chip } from '@material-ui/core';
import CallMadeIcon from '@material-ui/icons/CallMade';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import SwapHorizontalCircleIcon from '@material-ui/icons/SwapHorizontalCircle';
import DeleteIcon from '@material-ui/icons/Delete';

interface RecipeCardProps {
	recipe: Recipe,
	addSpaceBelow: boolean,
	onCopyClick: () => void,
	onSwapClick: () => void,
	onDeleteClick: () => void
}

class UnconnectedRecipeCard extends React.Component<RecipeCardProps> {
	
	getRootClassName = () => {
		return this.props.addSpaceBelow ? "RecipeCard RecipeCard--last" : "RecipeCard";
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
						<IconButton className="DetailsButton" aria-label="see details"> <CallMadeIcon /> </IconButton>
						<IconButton
							className="CopyButton"
							aria-label="copy"
							onClick={() => this.props.onCopyClick()}
						>
							<FileCopyIcon />
						</IconButton>
						<IconButton
							className="SwapButton"
							aria-label="swap"
							onClick={() => this.props.onSwapClick()}
						>
							<SwapHorizontalCircleIcon />
						</IconButton>
						<IconButton
							className="DeleteButton"
							aria-label="delete"
							onClick={() => this.props.onDeleteClick()}
						>
							<DeleteIcon />
						</IconButton>
					</CardActions>
				</Card>			
			</div>
		);
	}
}

const mapStateToProps = (state: GlobalState) => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

export const RecipeCard = connect(mapStateToProps, mapDispatchToProps)(UnconnectedRecipeCard);