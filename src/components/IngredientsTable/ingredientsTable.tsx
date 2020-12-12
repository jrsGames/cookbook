import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { GlobalState, Ingredient, Cookbook, Recipe } from '../../redux/initialState';
import { getCookbook, getIngredientNames } from '../../redux/selectors';
import { addIngredientName } from '../../redux/action_creators/IngredientState';
import './ingredientsTable.css';
import { START_COOKBOOK } from '../EntryPage/entryPage';
import { TextField, IconButton, Chip, Dialog, DialogTitle, DialogContent, DialogActions, FormControl } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import ClearIcon from '@material-ui/icons/Clear';
import CheckIcon from '@material-ui/icons/Check';
import AddCircleIcon from '@material-ui/icons/AddCircle';

interface IngredientsTableProps {
	ingredients: Ingredient[],
	getUsedIngredientNames: () => string[]
	onAdd: () => void,
	onDelete: (ingredientIndex: number) => void,
	onChangeIngredientName: (index: number, name: string | null) => void,
	onChangeIngredientAmount: (index: number, amount: string | null) => void,
	editable: boolean,
	getIngredientNames: () => string[],
	addIngredientName: (name: string) => void
}

interface IngredientsTableState {
	ingredientNameDialogOpen: boolean,
	newIngredientName: string
}

class UnconnectedIngredientsTable extends React.Component<IngredientsTableProps, IngredientsTableState> {

	constructor(props: IngredientsTableProps) {
		super(props);
		this.state={
			ingredientNameDialogOpen: false,
			newIngredientName: ""
		}
	}
	
	setNewIngredientName = (name: string | null) => {
		if(name) {
			this.setState({newIngredientName: name});
		}
	}
	
	openIngredientNameDialog = () => {
		this.setState({ingredientNameDialogOpen: true});
	}
	
	closeIngredientNameDialog = () => {
		this.setState({ingredientNameDialogOpen: false});
	}

	getIngredientOptions = () => {
		const options: string[] = this.props.getIngredientNames().concat(this.props.getUsedIngredientNames());
		return options.filter((item, pos) => options.indexOf(item) === pos).sort();
	}
	
	addIngredientName = (name: string) => {
		this.props.addIngredientName(name);
		this.closeIngredientNameDialog();
	}
	
	render() {
		const ingredients: Ingredient[] = this.props.ingredients;
		return (
			<div className="IngredientsTable">
				{ingredients.map((ingredient, index) => {
					return <div className="Ingredient" key={index}>
								<TextField
									autoFocus
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
				<div>
					<Chip
						className="AddIngredient"
						key={this.props.ingredients.length}
						label="Neue Zutat"
						icon={<AddCircleIcon />}
						onClick={() => this.props.onAdd()}
					/>
					<Chip
						className="AddIngredientName"
						key={this.props.ingredients.length+1}
						label="Neuer Zutatenname"
						icon={<AddCircleIcon />}
						onClick={() => this.openIngredientNameDialog()}
					/>
					<Dialog open={this.state.ingredientNameDialogOpen} onClose={() => this.closeIngredientNameDialog()}>
						<DialogTitle> Neuer Zutatenname </DialogTitle>
						<DialogContent>
							<FormControl className="AddIngredientNameForm">
								<TextField
									autoFocus
									variant="outlined"
									onChange={(event) => this.setNewIngredientName(event.target.value)}
							/>
							</FormControl>
						</DialogContent>
						<DialogActions>
							<IconButton onClick={() => this.addIngredientName(this.state.newIngredientName)} color="primary">
								<CheckIcon/>
							</IconButton>
							<IconButton onClick={() => this.closeIngredientNameDialog()} color="primary"> <ClearIcon/> </IconButton>
						</DialogActions>
					</Dialog>
				</div> :
				null
				}
			</div>
		);
	}
}

const mapStateToProps = (state: GlobalState) => ({
	getUsedIngredientNames: () => {
		const cookbook: Cookbook = getCookbook(state) || START_COOKBOOK;
		const usedIngredients: string[] = [];
		cookbook.recipes.forEach((recipe: Recipe) => {
			recipe.ingredients.forEach((ingredient: Ingredient) => {
				usedIngredients.push(ingredient.name);
			});
		});
		return usedIngredients.filter((item, pos) => usedIngredients.indexOf(item) === pos);
	},
	getIngredientNames: () => getIngredientNames(state)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	addIngredientName: (name: string) => dispatch(addIngredientName(name))
});

export const IngredientsTable = connect(mapStateToProps, mapDispatchToProps)(UnconnectedIngredientsTable);