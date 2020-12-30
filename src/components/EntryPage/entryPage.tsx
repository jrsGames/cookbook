import React from 'react';
import './entryPage.css';
import Button from '@material-ui/core/Button';
import { GlobalState, READ_VIEW, Cookbook } from '../../redux/initialState';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { setView } from '../../redux/action_creators/ViewState';
import { setCookbook, setCookbookString } from '../../redux/action_creators/BookState';


export const START_COOKBOOK: Cookbook = {
		title: "Titel hinzufügen",
		recipes: []
};

interface EntryPageProps {
	enterStartCookbook: () => void
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
				<div className="EntryPageContent">
					<Button className='EntryPageButton' color="primary" variant="contained" onClick={() => this.uploadFile()}>
						importieren
					</Button>
					<Button className='EntryPageButton' variant="contained" onClick={() => this.props.enterStartCookbook()}>
						erstellen
					</Button>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state: GlobalState) => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	enterStartCookbook: () => {
		dispatch(setView(READ_VIEW));
		dispatch(setCookbookString(JSON.stringify(START_COOKBOOK)));
		dispatch(setCookbook(START_COOKBOOK));
	}
});

export const EntryPage = connect(mapStateToProps, mapDispatchToProps)(UnconnectedEntryPage);