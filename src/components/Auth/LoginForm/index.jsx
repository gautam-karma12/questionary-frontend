import React from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";

const LoginForm = ({ handleSubmit }) => {
	const initialValues = {
		email: "",
		password: "",
	};
	const validationSchema = Yup.object().shape({
		email: Yup.string().email().required("Email is required"),
		password: Yup.string().required("Password is required"),
	});
	return (
		<>
			<div className="d-flex align-items-center justify-content-center vh-100">
				<div className="col-md-4">
					<div className="card p-4">
						<div className="card-body">
							<h2 className="text-center mb-4">Login</h2>

							<Formik
								initialValues={initialValues}
								validationSchema={validationSchema}
								onSubmit={handleSubmit}
							>
								{() => (
									<Form>
										<div className="form-group">
											<label htmlFor="email">Email</label>
											<Field
												type="email"
												name="email"
												className="form-control"
												placeholder="Enter your email"
											/>
											<ErrorMessage
												name="email"
												component="div"
												className="text-danger"
											/>
										</div>

										<div className="form-group mt-3">
											<label htmlFor="password">Password</label>
											<Field
												type="password"
												name="password"
												className="form-control"
												placeholder="Enter your password"
											/>
											<ErrorMessage
												name="password"
												component="div"
												className="text-danger"
											/>
										</div>

										<button type="submit" className="btn btn-primary mt-3 w-100">
											Login
										</button>
									</Form>
								)}
							</Formik>

							<p className="mt-3 text-center">
								Not registered? <Link to="/sign-up">Create an account</Link>
							</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default LoginForm;
