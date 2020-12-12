import React from 'react';
import './ingredientsTable.css';
import { GlobalState, Ingredient, Cookbook, Recipe } from '../../redux/initialState';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { TextField, IconButton, Chip } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { INGREDIENTS } from '../../ingredients';
import ClearIcon from '@material-ui/icons/Clear';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { getCookbook } from '../../redux/selectors';
import { START_COOKBOOK } from '../EntryPage/entryPage';

interface IngredientsTableProps {
	ingredients: Ingredient[],
	getUsedIngredients: () => string[]
	onAdd: () => void,
	onDelete: (ingredientIndex: number) => void,
	onChangeIngredientName: (index: number, name: string | null) => void,
	onChangeIngredientAmount: (index: number, amount: string | null) => void,
	editable: boolean
}

class UnconnectedIngredientsTable extends React.Component<IngredientsTableProps> {

	getIngredientOptions = () => {
		const options: string[] = INGREDIENTS;
		this.props.getUsedIngredients().forEach(
			(usedIngredient) => {
				if (INGREDIENTS.indexOf(usedIngredient)  === -1) {
					options.push(usedIngredient);
				}			
			},
		);
		return options.sort();
	}
	
	render() {
		const ingredients: Ingredient[] = this.props.ingredients;
		return (
			<div className="IngredientsTable">
				{ingredients.map((ingredient, index) => {
					return <div className="Ingredient" key={index}>
								<TextField
									className="IngredientsTextField AmountTextField"
									id="outlined-multiline-static"
									rows={4}
									value={ingredient.amount}
									variant="outlined"
									disabled={!this.props.editable}
									onChange={(event) => {this.props.onChangeIngredientAmount(index, event.target.value)}}
								/>
								<Autocomplete
									className="IngredientsTextField NameTextField"
									freeSolo
									value={ingredient.name}
									options={this.getIngredientOptions()}
									disabled={!this.props.editable}
									onChange={(_event, value) => {this.props.onChangeIngredientName(index, value)}}
									renderInput={(params) => (
										<TextField
											{...params}
											className="IngredientsTextField NameTextField"
											id="outlined-multiline-static"
											rows={4}
											variant="outlined"
											InputProps={{ ...params.InputProps, type: 'search' }}
										/>
									)}
								/>
								{this.props.editable ?
								<IconButton
									onClick={() => this.props.onDelete(index)}
									color="primary"
								>
									<ClearIcon/>
								</IconButton> :
								null
								}
							</div>;
				})}
				{this.props.editable ?
				<Chip
					className="AddIngredient"
					key={this.props.ingredients.length}
					label="Neue Zutat"
					icon={<AddCircleIcon />}
					onClick={() => this.props.onAdd()}
				/> :
				null
				}
			</div>
		);
	}
}

const mapStateToProps = (state: GlobalState) => ({
	getUsedIngredients: () => {
		const cookbook: Cookbook = getCookbook(state) || START_COOKBOOK;
		const usedIngredients: string[] = [];
		cookbook.recipes.forEach((recipe: Recipe) => {
			recipe.ingredients.forEach((ingredient: Ingredient) => {
				usedIngredients.push(ingredient.name);
			});
		});
		return usedIngredients;
	}
});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

export const IngredientsTable = connect(mapStateToProps, mapDispatchToProps)(UnconnectedIngredientsTable);