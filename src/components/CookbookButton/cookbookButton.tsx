import React from 'react';
import './cookbookButton.css';


interface CookbookButtonProps {
	label?: string,
	onClick?: () => void
}

export class CookbookButton extends React.Component<CookbookButtonProps> {
	
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