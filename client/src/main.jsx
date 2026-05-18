import { createRoot } from "react-dom/client";
import { App } from "./App";

const container = document.getElementById("root");
const appRoot = createRoot(container);

const app = <App />
appRoot.render(app);