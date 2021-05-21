import React from 'react';
// import './PageRoutes.css';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter as Router } from 'react-router-dom';


function PageRoutes(props) {  //props : userId isStudent
	const {setTheme}=props;
	if (props.isStudent)   //show registration form by default
	{
		return (
			<Router>
			<Navbar  isStudent={props.isStudent} userId={props.userId} setTheme={setTheme} />
			</Router>
		);
	}
	else {
		return (
			<Router>
			<Navbar isStudent={props.isStudent} userId={props.userId} setTheme={setTheme} />
			
			</Router>
		);
	}

}

export default PageRoutes;
