import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

const root = createRoot(document.getElementById("root"));
root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
