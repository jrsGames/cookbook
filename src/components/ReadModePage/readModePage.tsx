import React from 'react';
import './readModePage.css';
import { GlobalState, Cookbook } from '../../redux/initialState';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { getCookbook } from '../../redux/selectors';
import { EMPTY_COOKBOOK } from '../UploadInput/uploadInput';

interface ReadModePageProps {
	getCookbook: () => Cookbook
}

class UnconnectedReadModePage extends React.Component<ReadModePageProps> {
	
	render() {
		return (
			<div className="ReadModePage">
				{this.props.getCookbook().title}
			</div>
		);
	}
}

const mapStateToProps = (state: GlobalState) => ({
	getCookbook: () => getCookbook(state) || EMPTY_COOKBOOK
});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

export const ReadModePage = connect(mapStateToProps, mapDispatchToProps)(UnconnectedReadModePage);