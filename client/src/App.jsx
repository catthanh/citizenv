import Login from "./routes/Login";
import { Routes, Route } from "react-router-dom";
import Landing from "./routes/Landing";
import Layout from "./routes/Layout";
import { RequireAuth } from "./contexts/AuthContext";
import Manage from "./routes/Manage";
import Progress from "./routes/Progress";
import CitizenList from "./routes/CitizenList";
function App() {
    return (
        <>
            <Routes>
                <Route path="/dangnhap" element={<Login />} />
                <Route
                    path="/"
                    element={
                        <RequireAuth>
                            <Layout />
                        </RequireAuth>
                    }
                >
                    <Route path="danhsach" element={<CitizenList />} />
                    <Route path="congdan/:id" element={<p>congdan</p>} />
                    <Route path="quanly" element={<Manage />} />
                    <Route path="tiendo" element={<Progress />} />
                    <Route path="nhaplieu" element={<p>nhaplieu</p>} />
                </Route>
            </Routes>
        </>
    );
}

export default App;
