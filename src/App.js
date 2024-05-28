import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import LoginPage from "./Components/LoginPage";
import ListPage from "./Components/ListPage";
import LayoutPage from "./Components/LayoutPage";
import { AuthProvider } from "./Components/AuthContext";
import EditPage from "./Components/EditPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <LayoutPage />
          <Routes>
            <Route path="/" element={<LoginPage />}></Route>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/list" element={<ListPage />}></Route>
            <Route path="/edit/:id" element={<EditPage />}></Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
