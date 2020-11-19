import React from 'react';
import './loadingModePage.css';
import { GlobalState, Cookbook, READ_VIEW } from '../../redux/initialState';
import { getCookbookString } from '../../redux/selectors';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { setCookbook } from '../../redux/action_creators/BookState';
import { isCookbook } from '../../helpers';
import { setView } from '../../redux/action_creators/GeneralState';

interface LoadingModePageProps {
	getCookbookString: () => string,
	setCookbook: (cookbook: Cookbook) => void,
	enterReadMode: () => void
}

class UnconnectedLoadingModePage extends React.Component<LoadingModePageProps> {
	
	isJson = (input: string) => {
		try {
			JSON.parse(input);
		} catch(e) {
			return false;
		}
		return true;
	}
	
	render() {
		console.log("rendering lMP");
		const input = this.props.getCookbookString(); //"{\"title\":\"Mein Kochbuch\",\"recipes\":[]}";
		console.log(input);
			if(this.isJson(input)) {
				const cookbook = (JSON.parse(input)) as Cookbook;
				if(isCookbook(cookbook)) {
					this.props.setCookbook(cookbook);
					this.props.enterReadMode();
				}
			} else {
				console.log("The file you loaded is not a valid json.")
			}
		
		return (
			<div className='LoadingModePage--show'>
				loading...
			</div>
		);
	}
}

const mapStateToProps = (state: GlobalState) => ({
	getCookbookString: () => getCookbookString(state)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	setCookbook: (cookbook: Cookbook) => dispatch(setCookbook(cookbook)),
	enterReadMode: () => dispatch(setView(READ_VIEW))
});

export const LoadingModePage = connect(mapStateToProps, mapDispatchToProps)(UnconnectedLoadingModePage);