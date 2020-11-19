import React from 'react';
import './readModePage.css';
import { GlobalState, Cookbook } from '../../redux/initialState';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { getCookbook } from '../../redux/selectors';
import { EMPTY_COOKBOOK } from '../UploadInput/uploadInput';
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

interface ReadModePageProps {
	getCookbook: () => Cookbook
}

class UnconnectedReadModePage extends React.Component<ReadModePageProps> {
	
	render() {
		const cookbook: Cookbook = this.props.getCookbook();
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
				{cookbook.recipes.map((recipe, index) => {
					return <div key={index}> {recipe.name} </div>
				})}
				<div className="CookbookContent">
					{}
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