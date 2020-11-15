import React from 'react';
import './createModePage.css';
import { GlobalState, CREATE_VIEW } from '../../redux/initialState';
import { getView } from '../../redux/selectors';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

interface CreateModePageProps {
	view: string
}

class UnconnectedCreateModePage extends React.Component<CreateModePageProps> {
	
	getRootClassName = () => {
		if(this.props.view === CREATE_VIEW) {
			return 'CreateModePage--show';
		}
		return 'CreateModePage--hide';
	}
	
	render() {
		return (
			<div className={this.getRootClassName()}>
				In creation Mode
			</div>
		);
	}
}

const mapStateToProps = (state: GlobalState) => ({
	view: getView(state)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

export const CreateModePage = connect(mapStateToProps, mapDispatchToProps)(UnconnectedCreateModePage);