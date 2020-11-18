import React from 'react';
import './loadingModePage.css';
import { GlobalState, LOADING_VIEW, Cookbook } from '../../redux/initialState';
import { getView, getCookbookString } from '../../redux/selectors';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { setCookbook } from '../../redux/action_creators/BookState';

interface LoadingModePageProps {
	view: string,
	getCookbookString: () => string,
	setCookbook: (cookbook: Cookbook) => void
}

class UnconnectedLoadingModePage extends React.Component<LoadingModePageProps> {
	
	getRootClassName = () => {
		if(this.props.view === LOADING_VIEW) {
			return 'LoadingModePage--show';
		}
		return 'LoadingModePage--hide';
	}
	
	isJson = (input: string) => {
		try {
			const maybeJson = JSON.parse(input);
		} catch(e) {
			return false;
		}
		return true;
	}
	
	render() {
		const input = this.props.getCookbookString();
		if(this.props.view === LOADING_VIEW && input !== "") {
			if(this.isJson(input)) {
				console.log("JSON!");
			} else {
				console.log("NOT A JSON!")
			}
		}
		return (
			<div className={this.getRootClassName()}>
				loading...
			</div>
		);
	}
}

const mapStateToProps = (state: GlobalState) => ({
	view: getView(state),
	getCookbookString: () => getCookbookString(state)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	setCookbook: (cookbook: Cookbook) => dispatch(setCookbook(cookbook))
});

export const LoadingModePage = connect(mapStateToProps, mapDispatchToProps)(UnconnectedLoadingModePage);