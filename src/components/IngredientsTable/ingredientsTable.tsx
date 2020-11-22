import React from 'react';
import './ingredientsTable.css';
import { GlobalState, Ingredient } from '../../redux/initialState';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';


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
					return ingredient.amount;
				})}
			</div>
		);
	}
}

const mapStateToProps = (state: GlobalState) => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

export const IngredientsTable = connect(mapStateToProps, mapDispatchToProps)(UnconnectedIngredientsTable);