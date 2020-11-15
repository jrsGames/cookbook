import React from 'react';
import './entryPage.css';
import Button from '@material-ui/core/Button';
import { ENTRY_VIEW, GlobalState } from '../../redux/initialState';
import { getView } from '../../redux/selectors';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

interface EntryPageProps {
	view: string
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
				<Button className='CreateNewButton' variant="contained"> Create New Cookbook </Button>
			</div>
		);
	}
}

const mapStateToProps = (state: GlobalState) => ({
	view: getView(state)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

export const EntryPage = connect(mapStateToProps, mapDispatchToProps)(UnconnectedEntryPage);