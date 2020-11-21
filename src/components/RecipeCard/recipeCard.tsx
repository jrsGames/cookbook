import React from 'react';
import './recipeCard.css';
import { GlobalState, Recipe } from '../../redux/initialState';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Card, CardContent, CardActions, IconButton, Typography, Chip } from '@material-ui/core';
import CallMadeIcon from '@material-ui/icons/CallMade';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import DeleteIcon from '@material-ui/icons/Delete';

interface RecipeCardProps {
	recipe: Recipe,
	addSpaceBelow: boolean
}

class UnconnectedRecipeCard extends React.Component<RecipeCardProps> {
	
	getRootClassName = () => {
		return this.props.addSpaceBelow ? "RecipeCard RecipeCard--last" : "RecipeCard";
	}
	
	getImageSource = () => {
		return this.props.recipe.image ?
			require('../../resources/' + this.props.recipe.image) :
			require('../../resources/defaultPic.jpg');
	}
	
	render() {
		const recipe: Recipe = this.props.recipe;
		return (
			<div className={this.getRootClassName()}>
				<Card>
					<div className="RecipeImageWrapper">
						<img className="RecipeImage" src={this.getImageSource()} alt="Picture not found" />
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
						<IconButton className="CopyButton" aria-label="copy"> <FileCopyIcon /> </IconButton>
						<IconButton className="DeleteButton" aria-label="delete"> <DeleteIcon /> </IconButton>
					</CardActions>
				</Card>			
			</div>
		);
	}
}

const mapStateToProps = (state: GlobalState) => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

export const RecipeCard = connect(mapStateToProps, mapDispatchToProps)(UnconnectedRecipeCard);