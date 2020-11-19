import React from 'react';
import './createModePage.css';
import { GlobalState } from '../../redux/initialState';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

interface CreateModePageProps {}

class UnconnectedCreateModePage extends React.Component<CreateModePageProps> {
	
	render() {
		return (
			<div className="CreateModePage">
				In creation Mode
			</div>
		);
	}
}

const mapStateToProps = (state: GlobalState) => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

export const CreateModePage = connect(mapStateToProps, mapDispatchToProps)(UnconnectedCreateModePage);