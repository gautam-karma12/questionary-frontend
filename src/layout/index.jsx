import { Layout } from "antd";
import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedLayout = () => {
	const token = localStorage.getItem("token");
	return token ? (
		<>
				<Outlet />
		</>
	) : (
		<Navigate to="/" />
	);
};

export default ProtectedLayout;
