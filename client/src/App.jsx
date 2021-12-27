import Login from "./routes/Login";
import { Routes, Route, Navigate } from "react-router-dom";
import Landing from "./routes/Landing";
import Layout from "./routes/Layout";
import { RequireAuth } from "./contexts/AuthContext";
import Manage from "./routes/Manage";
import Progress from "./routes/Progress";
import CitizenList from "./routes/CitizenList";
import FillData from "./components/FillData";
import CitizenInfo from "./routes/CitizenInfo";
import Analytic from "./routes/Analytic";
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
                    <Route path="congdan/:id" element={<CitizenInfo />} />
                    <Route path="quanly" element={<Manage />} />
                    <Route path="tiendo" element={<Progress />} />
                    <Route path="nhaplieu" element={<FillData />} />
                    <Route path="phantich" element={<Analytic />} />
                    <Route index element={<Navigate to={"tiendo"} />} />
                </Route>
            </Routes>
        </>
    );
}

export default App;
