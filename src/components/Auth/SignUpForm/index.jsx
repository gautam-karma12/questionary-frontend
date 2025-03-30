import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";

export default function SignUpForm({ onSubmit }) {
  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("User Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .max(12, "Password must be at most 12 characters")
      .required("Password is required"),
  });

  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <div className="col-md-4">
        <div className="card p-4">
          <div className="card-body">
            <h2 className="text-center mb-4">Sign Up</h2>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div className="form-group">
                    <label htmlFor="username">User Name</label>
                    <Field
                      type="text"
                      className="form-control"
                      id="username"
                      name="username"
                      placeholder="User Name"
                    />
                    <ErrorMessage
                      name="username"
                      component="div"
                      className="text-danger"
                    />
                  </div>

                  <div className="form-group mt-3">
                    <label htmlFor="email">Email</label>
                    <Field
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      placeholder="Email"
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
                      className="form-control"
                      id="password"
                      name="password"
                      placeholder="Password"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-danger"
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary mt-3 w-100"
                    disabled={isSubmitting}
                  >
                    Sign Up
                  </button>
                </Form>
              )}
            </Formik>

            <p className="mt-3 text-center">
              Already have an account? <Link to="/">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
