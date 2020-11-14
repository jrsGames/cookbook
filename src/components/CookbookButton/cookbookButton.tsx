import React from 'react';
import './cookbookButton.css';
import { connect } from 'react-redux';
import { GlobalState } from '../../redux/initialState';
import { Dispatch } from 'redux';

interface CookbookButtonProps {
	label?: string
}

class UnconnectedCookbookButton extends React.Component<CookbookButtonProps> {
		
	render(){			
		return (
			<div className={'CookbookButton'}>
				{this.props.label}
			</div>
		);
	}
}

const mapStateToProps = (state: GlobalState) => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({})

export const CookbookButton = connect(mapStateToProps, mapDispatchToProps)(UnconnectedCookbookButton);