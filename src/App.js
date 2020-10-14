import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

import axios from "axios";
import * as Yup from "yup";

import Form from "./components/Form";
import User from "./components/User";


const initialFormValues = {
	name: "",
	email: "",
	password: "",
	role: "",
	terms: "",
}
const initialFormErrors = {
	name: "",
	email: "",
	password: "",
	role: "",
	terms: "",
}

const App = () => {

	// *        STATES        //
	const [users, setUsers] = useState([]);
	const [formValues, setFormValues] = useState(initialFormValues);
	const [formErrors, setFormErrors] = useState(initialFormErrors);
	const [isDisabled, setIsDisabled] = useState(true);

	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<h1>USER FORM</h1>
			</header>
			<main>
				<Form values={formValues} errors={formErrors}  />
				{
					users.map(user => {
						return <User key={user.id} details={user.details} />
					})
				}
			</main>
		</div>
	);
}

export default App;
