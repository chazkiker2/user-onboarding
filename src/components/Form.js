import React from "react";

const Form = (props) => {

	const { values, errors, submit, change } = props;

	const onSubmit = evt => {
		evt.preventDefault();
		submit();
	};
	const onChange = evt => {
		const { name, value, type, checked } = evt.target;
		const valueToUse = (type === "checkbox") ? checked : value;
		change(name, valueToUse);
	};

	return (
	<form className="form container" onSubmit={onSubmit}>
		<div className="form-group submit">
			<h2>Add User</h2>
			<button>SUBMIT</button>

			<div className="errors">
				<div>{errors.name}</div>
				<div>{errors.email}</div>
				<div>{errors.password}</div>
				<div>{errors.role}</div>
				<div>{errors.terms}</div>
			</div>
		</div>

		<div className="form-group inputs">
			<h4>General Information</h4>
			{/* // *      TEXT INPUTS                       */}
			<label>Name:
				<input 
					name="name"
					type="text" 
					value={values.name} 
					onChange={onChange} />
			</label>
			<label>Email
				<input name="email"
					type="email"
					value={values.email}
					onChange={onChange}
					/>
			</label>
			<label>Password
				<input name="password"
					type="password"
					value={values.password}
					onChange={onChange}
					/>
			</label>

			{/* //*            DROP DOWN                       */}
			<label>Role
				<select name="role" value={values.role} onChange={onChange}>
					<option value="">---select---</option>
					<option value="admin">Admin.</option>
					<option value="office">Office</option>
					<option value="intern">Intern</option>
				</select>
			</label>
			{/* // *              CHECKBOX                     */}
			<label>Terms
				<input name="terms"
					type="checkbox"
					value="agree"
					onChange={onChange}
				/>
			</label>
		</div>
	</form>
	);
};

export default Form;