import React from 'react';
import './ingredientsTable.css';
import { GlobalState, Ingredient } from '../../redux/initialState';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { INGREDIENTS } from '../../ingredients';

interface IngredientsTableProps {
	ingredients: Ingredient[]
}

interface IngredientsTableState {
}

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
									defaultValue={ingredient.amount}
									variant="outlined"
								/>
								<Autocomplete
									className="IngredientsTextField NameTextField"
									freeSolo
									value={ingredient.name}
									options={INGREDIENTS}
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
							</div>;
				})}
			</div>
		);
	}
}

const mapStateToProps = (state: GlobalState) => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

export const IngredientsTable = connect(mapStateToProps, mapDispatchToProps)(UnconnectedIngredientsTable);