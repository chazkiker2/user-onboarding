import * as Yup from "yup";

const formSchema = Yup.object().shape({
	name: Yup
		.string()
		.required("Name is Required")
		.min(3, "Username must be at least 3 characters long."),
	email: Yup
		.string()
		.email("Must be a valid email address")
		.required("Must include an email address"),
	password: Yup
		.string()
		.required("Password is required")
		.min(5, "Password must be at least 5 characters long"),
	role: Yup
		.string()
		.oneOf(["admin", "office", "intern"])
		.required("Role is required, please select an option"),
	terms: Yup
		.boolean()
		.oneOf([true])
		.required()
});

export default formSchema;