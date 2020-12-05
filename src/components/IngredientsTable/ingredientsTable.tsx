import React from 'react';
import './ingredientsTable.css';
import { GlobalState, Ingredient } from '../../redux/initialState';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { TextField, IconButton, Chip } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { INGREDIENTS } from '../../ingredients';
import ClearIcon from '@material-ui/icons/Clear';
import AddCircleIcon from '@material-ui/icons/AddCircle';

interface IngredientsTableProps {
	ingredients: Ingredient[],
	onAdd: () => void,
	onDelete: (ingredientIndex: number) => void,
	onChangeIngredientName: (index: number, name: string | null) => void,
	editable: boolean
}

interface IngredientsTableState {}

class UnconnectedIngredientsTable extends React.Component<IngredientsTableProps, IngredientsTableState> {

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
								/>
								<Autocomplete
									className="IngredientsTextField NameTextField"
									freeSolo
									value={ingredient.name}
									options={INGREDIENTS}
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

const mapStateToProps = (state: GlobalState) => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

export const IngredientsTable = connect(mapStateToProps, mapDispatchToProps)(UnconnectedIngredientsTable);