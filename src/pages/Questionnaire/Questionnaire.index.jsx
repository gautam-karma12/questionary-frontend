import React, { useState, useEffect } from "react";
import "./Questionnaire.css";
import { toast } from "react-toastify";
import { Button } from "antd";
import { signOut } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const questions = [
  { id: 1, text: "What is your name?", type: "text", step: 1, required: true, name: "name" },
  { id: 2, text: "How old are you?", type: "number", step: 1, required: false, name: "age" },
  { id: 3, text: "What is your favorite hobby?", type: "text", step: 2, condition: "name", required: false, name: "hobby" },
  { id: 4, text: "What is your birth month?", type: "text", step: 2, condition: "age", required: false, name: "birthMonth" },
  { id: 5, text: "Do you have pets?", type: "multiple-choice", options: ["Yes", "No"], step: 3, required: true, name: "hasPets" },
  { id: 6, text: "What type of pet do you have?", type: "text", step: 4, condition: "petsYes", required: true, name: "petType" },
  { id: 7, text: "What is your favorite color?", type: "text", step: 4, required: false, name: "favoriteColor" }
];

const Questionnaire = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [showSummary, setShowSummary] = useState(false);
  
  // Create initial values object
  const initialValues = questions.reduce((acc, question) => {
    acc[question.name] = "";
    return acc;
  }, {});
  
  // Create validation schema
  const validationSchema = Yup.object().shape(
    questions.reduce((acc, question) => {
      if (question.required) {
        acc[question.name] = Yup.string().required("This field is required");
        if (question.type === "number") {
          acc[question.name] = Yup.number().required("This field is required");
        }
      }
      return acc;
    }, {})
  );

  useEffect(() => {
    updateFilteredQuestions();
  }, [currentStep]);

  const updateFilteredQuestions = () => {
    let stepQuestions = questions.filter(q => q.step === currentStep);
    setFilteredQuestions(stepQuestions);
  };

  const handleNext = (values) => {
    const stepQuestions = filteredQuestions.filter(q => q.required);
    const allRequiredFieldsFilled = stepQuestions.every(q => values[q.name]);
    
    if (!allRequiredFieldsFilled) {
      toast.warning("Please fill all required questions before proceeding.");
      return;
    }

    if (currentStep === 2) {
      // Update filtered questions based on conditional logic
      if (values.name && !values.age) {
        setFilteredQuestions(questions.filter(q => q.condition === "name"));
      } else if (!values.name && values.age) {
        setFilteredQuestions(questions.filter(q => q.condition === "age"));
      }
    }

    if (currentStep === 4) {
      setShowSummary(true);
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleBackToEdit = () => {
    setShowSummary(false);
    setCurrentStep(4);
  };

  const handleSubmit = (values) => {
    console.log("Form submitted with values:", values);
    toast.success("Questionnaire submitted successfully!");
  };

  const totalSteps = 4;
  const progress = showSummary ? 100 : Math.round((currentStep / totalSteps) * 100);
  
  const handleLogout = () => {
    const response = signOut();
    console.log("response: ", response);
    if (response.success) {
      toast.success("Logged out successfully!");
      navigate("/");
    }
  };

  return (
    <>
      <div className="col-12 justify-content-end mt-2">
        <Button onClick={() => handleLogout()}>
          Logout
        </Button>
      </div>
      <div className="container">
        <h2>Dynamic Questionnaire</h2>

        <div className="progress-bar">
          <div className="progress" style={{ width: `${progress}%` }} />
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue, isValid, dirty }) => (
            <Form>
              {showSummary ? (
                <div className="summary-page">
                  <h3>Review Your Answers</h3>
                  {questions.map((question) => (
                    <div key={question.id} className="summary-item">
                      <strong>{question.text}:</strong> {values[question.name] || "Skipped"}
                    </div>
                  ))}

                  <div className="nav-buttons">
                    <button type="button" onClick={handleBackToEdit} className="btn">
                      Back to Edit
                    </button>
                    <button type="submit" className="btn submit-btn">
                      Submit
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {filteredQuestions.map((question) => {
                    // Show petType question only if hasPets is "Yes"
                    if (question.name === "petType" && values.hasPets !== "Yes") {
                      return null;
                    }
                    
                    return (
                      <div key={question.id} className="question-card">
                        <h3>
                          {question.text}{" "}
                          {!question.required && <span className="optional">(Optional)</span>}
                        </h3>

                        {question.type === "text" && (
                          <div>
                            <Field
                              type="text"
                              name={question.name}
                              placeholder="Enter your answer"
                              className="input-field"
                            />
                            <ErrorMessage name={question.name} component="div" className="error-message" />
                          </div>
                        )}

                        {question.type === "number" && (
                          <div>
                            <Field
                              type="number"
                              name={question.name}
                              placeholder="Enter a number"
                              className="input-field"
                            />
                            <ErrorMessage name={question.name} component="div" className="error-message" />
                          </div>
                        )}

                        {question.type === "multiple-choice" && (
                          <div>
                            {question.options.map((opt) => (
                              <button
                                key={opt}
                                type="button"
                                onClick={() => setFieldValue(question.name, opt)}
                                className={`answer-btn ${values[question.name] === opt ? "selected" : ""}`}
                              >
                                {opt}
                              </button>
                            ))}
                            <ErrorMessage name={question.name} component="div" className="error-message" />
                          </div>
                        )}
                      </div>
                    );
                  })}

                  <div className="nav-buttons">
                    <button
                      type="button"
                      onClick={handlePrevious}
                      disabled={currentStep === 1}
                      className="btn"
                    >
                      Previous
                    </button>

                    <button
                      type="button"
                      onClick={() => handleNext(values)}
                      className="btn next-btn"
                    >
                      {currentStep === totalSteps ? "Review" : "Next"}
                    </button>
                  </div>
                </>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default Questionnaire;