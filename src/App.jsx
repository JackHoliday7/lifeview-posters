import { Routes, Route, Navigate } from "react-router-dom";
import Gallery from "./Gallery.jsx";
import PosterView from "./PosterView.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Gallery />} />
      <Route path="/p/:slug" element={<PosterView />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
