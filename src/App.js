import React, { useState, useEffect } from 'react';
import './App.css';

import axios from "axios";
import * as Yup from "yup";

import Form from "./components/Form";
import User from "./components/User";
import formSchema from "./validation/formSchema";


const initialFormValues = {
	name: "",
	email: "",
	password: "",
	role: "",
	terms: false,
}
const initialFormErrors = {
	name: "",
	email: "",
	password: "",
	role: "",
	terms: "",
}
const initialUsers = [
	{
		id: 1,
		name: "George Bluth",
		password: "12345",
		email: "george.bluth@reqres.in",
		role: "admin",
		terms: true,
	}
];

const App = () => {

	// *        STATES        //
	const [users, setUsers] = useState(initialUsers);
	const [formValues, setFormValues] = useState(initialFormValues);
	const [formErrors, setFormErrors] = useState(initialFormErrors);
	const [isDisabled, setIsDisabled] = useState(true);

	// *        HELPER FUNCTIONS                                         //
	const postNewUser = (newUser) => {
		axios.post("https://reqres.in/api/users", newUser)
			.then(res => {
				setUsers([...users, res.data]);
				setFormValues(initialFormValues);
			})
			.catch(err => {
				console.log(err);
			});
	};

	// *        EVENT HANDLERS                                     //
	const formSubmit = () => {
		const newUser = {
			name: formValues.name.trim(),
			password: formValues.password,
			email: formValues.email.trim(),
			role: formValues.role,
			terms: formValues.terms,
		};
		postNewUser(newUser);
	};

	const formChange = (key, value) => {
		Yup.reach(formSchema, key)
			.validate(value)
			.then( () => {
				setFormErrors({ ...formErrors, [key]: "" });
			})
			.catch(err => {
				setFormErrors({ ...formErrors, [key]: err.errors[0] });
			});
			setFormValues({
				...formValues,
				[key]: value //NOT AN ARRAY
			});
	};

	// *        SIDE EFFECTS          //
	useEffect(()=> {
		formSchema.isValid(formValues).then(valid => {
			setIsDisabled(!valid);
		})
	}, [formValues])





	// *                 RETURN & RENDER                         //
	return (
		<div className="App">
			<h1>USER FORM</h1>
			<Form values={formValues} errors={formErrors} submit={formSubmit} change={formChange} disabled={isDisabled} />
			{
				users.map(user => {
					return <User key={user.id} userInfo={user} />
				})
			}
		</div>
	);
}

export default App;
