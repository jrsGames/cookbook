import React from 'react';
import './readModePage.css';
import { GlobalState, Cookbook } from '../../redux/initialState';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { getCookbook } from '../../redux/selectors';
import { EMPTY_COOKBOOK } from '../UploadInput/uploadInput';
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { RecipeCard } from '../RecipeCard/recipeCard';

interface ReadModePageProps {
	getCookbook: () => Cookbook
}

interface ReadModePageState {
	cookbook: Cookbook
}

class UnconnectedReadModePage extends React.Component<ReadModePageProps, ReadModePageState> {
	
	constructor(props: ReadModePageProps){
		super(props);
		this.state = {
			cookbook: props.getCookbook()
		}
	}
	
	componentDidUpdate(prevProps: ReadModePageProps) {
		if(prevProps.getCookbook() !== this.props.getCookbook()) {
			this.setState({cookbook: this.props.getCookbook()});
		}
	}
	
	render() {
		const cookbook: Cookbook = this.state.cookbook;
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
						return <RecipeCard key={index} recipe={recipe} addSpaceBelow={isLast}/>
					})}
				</div>	
			</div>
		);
	}
}

const mapStateToProps = (state: GlobalState) => ({
	getCookbook: () => getCookbook(state) || EMPTY_COOKBOOK
});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

export const ReadModePage = connect(mapStateToProps, mapDispatchToProps)(UnconnectedReadModePage);