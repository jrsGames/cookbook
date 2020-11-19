import React from 'react';
import './readModePage.css';
import { GlobalState } from '../../redux/initialState';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

interface ReadModePageProps {}

class UnconnectedReadModePage extends React.Component<ReadModePageProps> {
	
	render() {
		return (
			<div className="ReadModePage">
				In read Mode
			</div>
		);
	}
}

const mapStateToProps = (state: GlobalState) => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

export const ReadModePage = connect(mapStateToProps, mapDispatchToProps)(UnconnectedReadModePage);