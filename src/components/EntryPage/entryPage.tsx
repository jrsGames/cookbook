import React from 'react';
import './entryPage.css';
import Button from '@material-ui/core/Button';
import { ENTRY_VIEW, GlobalState, CREATE_VIEW } from '../../redux/initialState';
import { getView } from '../../redux/selectors';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { setView } from '../../redux/action_creators/GeneralState';

interface EntryPageProps {
	view: string,
	enterCreateMode: () => void
}

class UnconnectedEntryPage extends React.Component<EntryPageProps> {
	
	uploadFile: () => void = () => {
		var x = document.getElementById("fileUpload");
		if(x){
			x.click();
		}		
	}
	
	getRootClassName = () => {
		if(this.props.view === ENTRY_VIEW) {
			return 'EntryPage--show';
		}
		return 'EntryPage--hide';
	}
	
	render() {
		return (
			<div className={this.getRootClassName()}>
				<Button className='ImportButton' color="primary" variant="contained" onClick={() => this.uploadFile()}>
					Import Cookbook
				</Button>
				<Button className='CreateNewButton' variant="contained" onClick={() => this.props.enterCreateMode()}> Create New Cookbook </Button>
			</div>
		);
	}
}

const mapStateToProps = (state: GlobalState) => ({
	view: getView(state)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	enterCreateMode: () => dispatch(setView(CREATE_VIEW))
});

export const EntryPage = connect(mapStateToProps, mapDispatchToProps)(UnconnectedEntryPage);