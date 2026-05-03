import { Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex justify-center items-center bg-background">
        <Routes>
          <Route path="/" element={<h1>Home</h1>} />
          <Route path="/venue/:id" element={<h1>Specific Venue</h1>} />
          <Route path="/venue/edit/:id" element={<h1>Edit Venue</h1>} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
