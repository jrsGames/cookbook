import React from 'react';
import './readModePage.css';
import { GlobalState, Cookbook, Recipe } from '../../redux/initialState';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { getCookbook } from '../../redux/selectors';
import { EMPTY_COOKBOOK } from '../UploadInput/uploadInput';
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { RecipeCard } from '../RecipeCard/recipeCard';
import { RecipeDetails } from '../RecipeDetails/recipeDetails';

interface ReadModePageProps {
	getCookbook: () => Cookbook
}

interface ReadModePageState {
	cookbook: Cookbook,
	toBeSwapped: number | null,
	openRecipe: Recipe | null
}

class UnconnectedReadModePage extends React.Component<ReadModePageProps, ReadModePageState> {
	
	constructor(props: ReadModePageProps){
		super(props);
		this.state = {
			cookbook: props.getCookbook(),
			toBeSwapped: null,
			openRecipe: null
		}
	}
	
	componentDidUpdate(prevProps: ReadModePageProps) {
		if(prevProps.getCookbook() !== this.props.getCookbook()) {
			this.setState({cookbook: this.props.getCookbook()});
		}
	}
	
	openRecipe = (index: number) => {
		this.setState({ openRecipe: JSON.parse(JSON.stringify(this.state.cookbook.recipes[index]))});
	}
	
	copyRecipe(index: number){
		const newCookbook: Cookbook = JSON.parse(JSON.stringify(this.state.cookbook));
		newCookbook.recipes.splice(index + 1, 0, newCookbook.recipes[index]);
		this.setState({
			cookbook: newCookbook
		});
	}
	
	swapRecipe(index: number){
		if(this.state.toBeSwapped !== null) {
			const newCookbook: Cookbook = JSON.parse(JSON.stringify(this.state.cookbook));
			const temp = newCookbook.recipes[this.state.toBeSwapped];
			newCookbook.recipes[this.state.toBeSwapped] = newCookbook.recipes[index];
			newCookbook.recipes[index] = temp;
			this.setState({
				cookbook: newCookbook,
				toBeSwapped: null
			});
		} else {
			this.setState({
				toBeSwapped: index
			});
		}
	}
	
	deleteRecipe(index: number){
		const newCookbook: Cookbook = JSON.parse(JSON.stringify(this.state.cookbook));
		newCookbook.recipes.splice(index, 1);
		this.setState({
			cookbook: newCookbook
		});
	}
	
	closeDetailsDialog = () => {
		this.setState({ openRecipe: null});
	}
	
	render() {
		const cookbook: Cookbook = JSON.parse(JSON.stringify(this.state.cookbook));
		
		return (
			<div className="ReadModePage">
				<AppBar position="static">
					<Toolbar>
						<IconButton edge="start" color="inherit" aria-label="menu">
							<MenuIcon />
						</IconButton>
						<Typography variant="h6">
							{cookbook.title}
						</Typography>
					</Toolbar>
				</AppBar>
				<div className="RecipeList">
					{cookbook.recipes.map((recipe, index) => {
						const isLast = index === cookbook.recipes.length - 1;
						return <RecipeCard
									key={index}
									recipe={recipe}
									addSpaceBelow={isLast}
									onOpenClick={() => this.openRecipe(index)}
									onCopyClick={() => this.copyRecipe(index)}
									onSwapClick={() => this.swapRecipe(index)}
									swapping={this.state.toBeSwapped === index}
									onDeleteClick={() => this.deleteRecipe(index)}
								/>;
					})}
				</div>
				<RecipeDetails recipe={JSON.parse(JSON.stringify(this.state.openRecipe))} closeDialog={() => this.closeDetailsDialog()}/>
			</div>
		);
	}
}

const mapStateToProps = (state: GlobalState) => ({
	getCookbook: () => getCookbook(state) || EMPTY_COOKBOOK
});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

export const ReadModePage = connect(mapStateToProps, mapDispatchToProps)(UnconnectedReadModePage);