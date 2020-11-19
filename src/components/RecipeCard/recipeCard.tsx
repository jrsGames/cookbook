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
	recipe: Recipe
}

class UnconnectedRecipeCard extends React.Component<RecipeCardProps> {
	
	render() {
		const recipe: Recipe = this.props.recipe;
		return (
			<div className="RecipeCard">
				<Card>
					<CardHeader
						avatar={<Avatar aria-label="recipe"> R </Avatar>}
						action={<IconButton aria-label="settings"><MoreVertIcon /></IconButton>}
						title={recipe.name}
						subheader="September 14, 2016"
					/>
					<CardMedia image="/static/images/cards/paella.jpg" title="Paella dish" />
					<CardContent>
						<Typography variant="body2" color="textSecondary" component="p">
							This impressive paella is a perfect party dish and a fun meal to cook together with your
							guests. Add 1 cup of frozen peas along with the mussels, if you like.
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