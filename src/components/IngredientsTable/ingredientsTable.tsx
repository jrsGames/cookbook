import React from 'react';
import './ingredientsTable.css';
import { GlobalState, Ingredient } from '../../redux/initialState';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { TextField } from '@material-ui/core';


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
				{ingredients.map((ingredient) => {
					return <div className="Ingredient">
								<TextField
									className="IngredientsTextField AmountTextField"
									id="outlined-multiline-static"
									rows={4}
									defaultValue={ingredient.amount}
									variant="outlined"
								/>
								<TextField
									className="IngredientsTextField NameTextField"
									id="outlined-multiline-static"
									rows={4}
									defaultValue={ingredient.name}
									variant="outlined"
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