import React, { ChangeEvent } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { TextField } from '@material-ui/core';
import './loginpage.css'
import { connect } from 'react-redux';
import { GlobalState, LOGIN, TOUR_BOARD } from '../../redux/initialState';
import { getPassword, getView } from '../../redux/selectors';
import { Dispatch } from 'redux';
import { setView } from '../../redux/action_creators/GeneralState';

interface LoginPageProps {
	getPassword: () => string;
	goToTourBoard: () => void;
	view: string
}

interface LoginPageState {
	isInputCorrect: boolean;
}

class UnconnectedLoginPage extends React.Component<LoginPageProps, LoginPageState> {
	
	constructor(props: LoginPageProps) {
		super(props);
		this.state = {
			isInputCorrect: false
		};
	}
	
	checkInput = (e: ChangeEvent<HTMLInputElement>) => {
		const input = e.currentTarget.value;
		this.setState({
			...this.state, 
			isInputCorrect: input === this.props.getPassword()
		});
	};
	
	getRootClassName = () => {
		if(this.props.view === LOGIN) {
			return 'LoginDiv--show';
		}
		return 'LoginDiv--hide';
	}
	
	render() {
		
		return (
			<div className={this.getRootClassName()}>
				<Card className="LoginCard">
					<CardContent>
						<Typography gutterBottom variant="h5" component="h2">
						Login
						</Typography>
						<TextField id="standard-basic" label="Passwort" onChange={(e: ChangeEvent<HTMLInputElement>) => this.checkInput(e)}/>
					</CardContent>
		  			<CardActions>
						<Button className="LoginButton" size="small" color="primary" disabled={!this.state.isInputCorrect} onClick={() => this.props.goToTourBoard()}>
							Weiter
						</Button>
					</CardActions>
				</Card>
			</div>
		);
	}
}

const mapStateToProps = (state: GlobalState) => ({
	getPassword: () => getPassword(state),
	view: getView(state)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	goToTourBoard: () => dispatch(setView(TOUR_BOARD))
})

export const LoginPage = connect(mapStateToProps, mapDispatchToProps)(UnconnectedLoginPage);