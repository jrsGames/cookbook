import React from 'react';
import './entryPage.css';
import Button from '@material-ui/core/Button';
import { GlobalState, CREATE_VIEW } from '../../redux/initialState';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { setView } from '../../redux/action_creators/ViewState';

interface EntryPageProps {
	enterCreateMode: () => void
}

class UnconnectedEntryPage extends React.Component<EntryPageProps> {
	
	uploadFile: () => void = () => {
		var x = document.getElementById("fileUpload");
		if(x){
			x.click();
		}		
	}
	
	render() {
		return (
			<div className="EntryPage">
				<Button className='ImportButton' color="primary" variant="contained" onClick={() => this.uploadFile()}>
					Import Cookbook
				</Button>
				<Button className='CreateNewButton' variant="contained" onClick={() => this.props.enterCreateMode()}> Create New Cookbook </Button>
			</div>
		);
	}
}

const mapStateToProps = (state: GlobalState) => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	enterCreateMode: () => dispatch(setView(CREATE_VIEW))
});

export const EntryPage = connect(mapStateToProps, mapDispatchToProps)(UnconnectedEntryPage);