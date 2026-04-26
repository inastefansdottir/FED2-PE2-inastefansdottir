import { Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<h1 className="font-heading text-primary">Home</h1>}
      />
      <Route path="/venue/:id" element={<h1>Specific Venue</h1>} />
      <Route path="/venue/edit/:id" element={<h1>Specific Venue</h1>} />
      <Route path="/register" element={<h1>Register</h1>} />
      <Route path="/profile" element={<h1>Profile</h1>} />
    </Routes>
  );
}
