import React from 'react';
import './cookbookButton.css';
import { connect } from 'react-redux';
import { GlobalState } from '../../redux/initialState';
import { Dispatch } from 'redux';

interface CookbookButtonProps {
	label?: string,
	onClick?: () => void
}

class UnconnectedCookbookButton extends React.Component<CookbookButtonProps> {
	
	handleClick: () => void = () => {
		if(this.props.onClick){
			this.props.onClick();
		}
	}
		
	render(){			
		return (
			<div className={'CookbookButton'} onClick={() => this.handleClick()}>
				{this.props.label}
			</div>
		);
	}
}

const mapStateToProps = (state: GlobalState) => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({})

export const CookbookButton = connect(mapStateToProps, mapDispatchToProps)(UnconnectedCookbookButton);