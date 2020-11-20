import React from 'react';
import './recipeCard.css';
import { GlobalState, Recipe } from '../../redux/initialState';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Card, CardHeader, CardMedia, CardContent, CardActions, Avatar, IconButton, Typography } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';


interface RecipeCardProps {
	recipe: Recipe,
	addSpaceBelow: boolean
}

class UnconnectedRecipeCard extends React.Component<RecipeCardProps> {
	
	getRootClassName = () => {
		return this.props.addSpaceBelow ? "RecipeCard RecipeCard--last" : "RecipeCard";
	}
	
	getAvatarClassName = (recipe: Recipe) => {
		return recipe.duration ? "" : "UnknownDuration";
	}
	
	render() {
		const recipe: Recipe = this.props.recipe;
		return (
			<div className={this.getRootClassName()}>
				<Card>
					<CardHeader
						avatar={<Avatar className={this.getAvatarClassName(recipe)} aria-label="recipe"> {recipe.duration || "?"} </Avatar>}
						title={recipe.name}
					/>
					<CardMedia image="/static/images/cards/paella.jpg" title="Paella dish" />
					<CardContent>
						<Typography variant="body2" color="textSecondary" component="p">
							space for labels
						</Typography>
					</CardContent>
					<CardActions disableSpacing>
						<IconButton aria-label="add to favorites"> <FavoriteIcon /> </IconButton>
						<IconButton aria-label="share"> <ShareIcon /> </IconButton>
					</CardActions>
				</Card>			
			</div>
		);
	}
}

const mapStateToProps = (state: GlobalState) => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

export const RecipeCard = connect(mapStateToProps, mapDispatchToProps)(UnconnectedRecipeCard);