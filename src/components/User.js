import React from "react";

const User = props => {
	const { userInfo } = props;
	if (!userInfo) {
		return <h3>Working on fetching your user details...</h3>
	}
	const { id, first_name, last_name, email, avatar } = userInfo;
	return (
	<div className="user container">
		<h4>{`Name: ${first_name} ${last_name}`}</h4>
		<img src={avatar} alt={first_name} />
		<p>Email: {email}</p>
		<p>{id}</p>
	</div>
	);
};

export default User;