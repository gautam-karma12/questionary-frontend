export const signUp = async (values) => {
	const { email, password } = values;

	const users = JSON.parse(localStorage.getItem("users")) || [];
	const existingUser = users.find((user) => user.email === email);

	if (existingUser) {
		return { success: false, data: { message: "User already exists" } };
	}

	const newUser = { email, password };
	users.push(newUser);
	localStorage.setItem("users", JSON.stringify(users));

	return { success: true };
};

export const login = async (values) => {
	const { email, password } = values;

	const users = JSON.parse(localStorage.getItem("users")) || [];
	const user = users.find((u) => u.email === email && u.password === password);

	if (user) {
		localStorage.setItem("currentUser", JSON.stringify(user));
		return { success: true, data: { message: "Sign In Successful" } };
	}

	return { success: false, data: { message: "Invalid email or password" } };
};
export const signOut = () => {
	localStorage.removeItem("currentUser");
	localStorage.removeItem("answers");
	localStorage.removeItem("token");
	return { success: true};
};
