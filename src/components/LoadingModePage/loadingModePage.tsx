import React from 'react';
import './loadingModePage.css';
import { GlobalState, LOADING_VIEW } from '../../redux/initialState';
import { getView } from '../../redux/selectors';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

interface LoadingModePageProps {
	view: string
}

class UnconnectedLoadingModePage extends React.Component<LoadingModePageProps> {
	
	getRootClassName = () => {
		if(this.props.view === LOADING_VIEW) {
			return 'LoadingModePage--show';
		}
		return 'LoadingModePage--hide';
	}
	
	render() {
		return (
			<div className={this.getRootClassName()}>
				In loading mode
			</div>
		);
	}
}

const mapStateToProps = (state: GlobalState) => ({
	view: getView(state)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

export const LoadingModePage = connect(mapStateToProps, mapDispatchToProps)(UnconnectedLoadingModePage);