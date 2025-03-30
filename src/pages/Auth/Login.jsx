import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LoginForm from "../../components/Auth/LoginForm/index"
import { login } from "../../services/authService"
const Login = () => {
	const navigate = useNavigate();
	const handleSubmit = async (values) => {
		try {
			const response = await login(values);
			if(response.success)
			{
			toast.success("Login successful!");
			localStorage.setItem("token", true);
			navigate("/question")
		   }
			else{
				toast.error(response?.data?.message||"Invalid username or password!");
				navigate("/");
			}
		} catch (error) {
			console.log(error);
			toast.error("Login failed!");
		}
	};

	return <LoginForm handleSubmit={handleSubmit} />;


}

export default Login;

