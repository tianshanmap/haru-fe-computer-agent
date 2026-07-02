import { ReactKeycloakProvider } from "@react-keycloak/web";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import SecurityGuy from "./components/authentication/keycloak/SecurityGuy";
import SecurePage from "./components/authentication/keycloak/SecurePage";
import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
    url: "http://localhost:8180",
    realm: "master",
    clientId: "vite-frontend",
});

function App() {
    return (
        <ReactKeycloakProvider authClient={keycloak}>
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <SecurityGuy>
                                <SecurePage />
                            </SecurityGuy>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </ReactKeycloakProvider>
    );
}

export default App;