import Login from "./routes/Login";
import { Routes, Route } from "react-router-dom";
import Home from "./routes/Home";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dangnhap" element={<Login />} />
                <Route path="/congdan/:id" element={<p>test</p>} />
                <Route path="/quanly" element={<p>test</p>} />
                <Route path="/tiendo" element={<p>test</p>} />
                <Route path="/nhaplieu" element={<p>test</p>} />
            </Routes>
        </>
    );
}

export default App;
