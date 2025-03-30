import React from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import SignUpForm from "../../components/Auth/SignUpForm/index"
import { signUp } from "../../services/authService";
export default function SignUp() {
	const navigate = useNavigate();
	const onSubmit = async (values) => {
		try {
			const data = await signUp(values);
			if (data.success) {
				toast.success("Sign Up Successfully");
				navigate("/");
			}else{
				toast.error(data?.data?.message);
                navigate("/sign-up");
                return;
			}
			
		} catch (err) {
			console.log("error", err);
		}
	};
	return <SignUpForm onSubmit={onSubmit} />;
}
