import HomePage from "./components/HomePage";
import RegisterPage from "./components/RegisterPage";
import NotFoundPage from "./components/NotFoundPage";
import LoginPage from "./components/LoginPage";
import ContactsPage from "./components/ContactsPage";
import { Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path="/contacts" element={<ContactsPage />} />
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
}