import { Routes, Route, Navigate } from "react-router-dom";
import Gallery from "./Gallery.jsx";
import PosterView from "./PosterView.jsx";

export default function App() {
  return (
    <Routes>
      {/* the site opens straight into the deck (framework map = slide 1) */}
      <Route path="/" element={<PosterView />} />
      <Route path="/p/:slug" element={<PosterView />} />
      {/* kept as an unlinked fallback index */}
      <Route path="/gallery" element={<Gallery />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
