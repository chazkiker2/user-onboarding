import * as Yup from "yup";

const formSchema = Yup.object().shape({
	// username: Yup
	// 	.string()
	// 	.required("Username is Required")
	// 	.min(3, "Username must be at least 3 characters long."),
	// email: Yup
	// 	.string()
	// 	.email("Must be a valid email address")
	// 	.required("Must include an email address"),
	// role: Yup
	// 	.string()
	// 	.oneOf(["student", "alumni", "instructor", "tl"])
	// 	.required("Role is required, please select an option"),
	// civil: Yup
	// 	.string()
	// 	.notRequired()
	// 	.oneOf(["single", "married", ""]),
	// coding: Yup.boolean(),
	// reading: Yup.boolean(),
	// hiking: Yup.boolean(),
});

export default formSchema;