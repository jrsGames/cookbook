import React from 'react';
import './readModePage.css';
import { GlobalState, READ_VIEW } from '../../redux/initialState';
import { getView } from '../../redux/selectors';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

interface ReadModePageProps {
	view: string
}

class UnconnectedReadModePage extends React.Component<ReadModePageProps> {
	
	getRootClassName = () => {
		if(this.props.view === READ_VIEW) {
			return 'ReadModePage--show';
		}
		return 'ReadModePage--hide';
	}
	
	render() {
		return (
			<div className={this.getRootClassName()}>
				In read Mode
			</div>
		);
	}
}

const mapStateToProps = (state: GlobalState) => ({
	view: getView(state)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

export const ReadModePage = connect(mapStateToProps, mapDispatchToProps)(UnconnectedReadModePage);