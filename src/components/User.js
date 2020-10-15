import React from "react";

const User = props => {
	const { userInfo } = props;
	if (!userInfo) {
		return <h3>Working on fetching your user details...</h3>
	}
	const { id, name, password, email, role, terms } = userInfo;
	return (
		<div className="user container">
			<h4>{`Name: ${name}`}</h4>
			<p>Password: {password}</p>
			<p>Email: {email}</p>
			<p>Role: {role}</p>
			<p>Terms: {terms ? "agree" : "disagree"}</p>
			<p>{id}</p>
		</div>
	);
};

export default User;