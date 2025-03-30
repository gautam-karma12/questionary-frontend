import "./App.css";
import { ToastContainer } from "react-toastify";
import Questionnaire from "./pages/Questionnaire/Questionnaire.index";
import NotFound from "./pages/pageNotFound.index";
import { Route, Routes } from "react-router-dom";
import ProtectedLayout from "./layout/index";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/Signup";

function App() {
	return (
		<>
		<ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
		      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        {/* Protected routes */}
        <Route element={<ProtectedLayout />}>
          <Route path="/question" element={<Questionnaire />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
		</>
	);
}

export default App;
