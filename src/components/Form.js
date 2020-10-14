import React from "react";

const Form = (props) => {

	const { formValues, formErrors, submit } = props;

	const onSubmit = evt => {
		evt.preventDefault();
		submit();
	};

	return (
	<form className="form container" onSubmit={onSubmit}>

	</form>
	);
};

export default Form;