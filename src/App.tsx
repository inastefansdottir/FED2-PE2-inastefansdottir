import { Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<h1>Home</h1>} />
      <Route path="/venue/:id" element={<h1>Specific Venue</h1>} />
      <Route path="/venue/edit/:id" element={<h1>Specific Venue</h1>} />
      <Route path="/register" element={<h1>Register</h1>} />
      <Route path="/profile/manager" element={<h1>Profile Manager</h1>} />
      <Route path="/profile/customer" element={<h1>Profile Customer</h1>} />
    </Routes>
  );
}
