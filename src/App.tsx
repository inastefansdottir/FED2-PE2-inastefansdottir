import { Routes, Route } from "react-router-dom";
import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";

export default function App() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<h1>Home</h1>} />
          <Route path="/venue/:id" element={<h1>Specific Venue</h1>} />
          <Route path="/venue/edit/:id" element={<h1>Edit Venue</h1>} />
          <Route path="/register" element={<h1>Register</h1>} />
          <Route path="/profile" element={<h1>Profile</h1>} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
