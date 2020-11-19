import React from 'react';
import './App.css';
import { UploadInput } from './components/UploadInput/uploadInput';
import { EntryPage } from './components/EntryPage/entryPage';
import { CreateModePage } from './components/CreateModePage/createModePage';
import { ReadModePage } from './components/ReadModePage/readModePage';
import { getView } from './redux/selectors';
import { GlobalState, ENTRY_VIEW, CREATE_VIEW, READ_VIEW } from './redux/initialState';
import { connect } from 'react-redux';

interface AppProps {
	getView: () => string
}

class UnconnectedApp extends React.Component<AppProps> {

	uploadFile: () => void = () => {
		var x = document.getElementById("fileUpload");
		if (x) {
			x.click();
		}
	}

	render() {
		let content = <div />;
		switch (this.props.getView()) {
			case ENTRY_VIEW: { content = <EntryPage />; break; }
			case CREATE_VIEW: { content = <CreateModePage />; break; }
			case READ_VIEW: { content = <ReadModePage />; break; }
			default: break;
		}
		return (
			<div className="App">
				<UploadInput />
				{content}
			</div>
		);
	}
}

const mapStateToProps = (state: GlobalState) => ({
	getView: () => getView(state)
});

export const App = connect(mapStateToProps)(UnconnectedApp);