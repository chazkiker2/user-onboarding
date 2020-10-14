import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
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
	terms: "",
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
		avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/calebogden/128.jpg",
		email: "george.bluth@reqres.in",
		first_name: "George",
		id: 1,
		last_name: "Bluth",
	}
];

const App = () => {

	// *        STATES        //
	const [users, setUsers] = useState(initialUsers);
	const [formValues, setFormValues] = useState(initialFormValues);
	const [formErrors, setFormErrors] = useState(initialFormErrors);
	const [isDisabled, setIsDisabled] = useState(true);

	// *        HELPER FUNCTIONS                                         //
	// const getUsers = () => {
	// 	axios.get("https://reqres.in/api/users")
	// 		.then(res => {
	// 			setUsers(res.data.data);
	// 			console.log(res.data.data);
	// 		})
	// 		.catch(err => {
	// 			console.log(err);
	// 		});
	// };

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
			username: formValues.username.trim(),
			email: formValues.email.trim(),
			role: formValues.role.trim(),
			terms: formValues.terms.trim(),
		};
		postNewUser(newUser);
	};

	const formChange = (name, value) => {
		Yup.reach(formSchema, name)
			.validate(value)
			.then( () => {
				setFormErrors({ ...formErrors, [name]: "" });
			})
			.catch(err => {
				setFormErrors({ ...formErrors, [name]: err.errors[0] });
			});
			setFormValues({
				...formValues,
				[name]: value //NOT AN ARRAY
			});
	};

	// *        SIDE EFFECTS          //
	// useEffect(() => {
	// 	getUsers();
	// }, []);

	useEffect(()=> {
		formSchema.isValid(formValues).then(valid => {
			setIsDisabled(!valid);
		})
	}, [formValues])





	// *                 RETURN & RENDER                         //
	return (
		<div className="App">
			<img src={logo} className="App-logo" alt="logo" />
			<h1>USER FORM</h1>
			<Form values={formValues} errors={formErrors} submit={formSubmit} change={formChange} />
			{
				users.map(user => {
					// console.log(user);
					return <User key={user.id} userInfo={user} />
				})
			}
		</div>
	);
}

export default App;
