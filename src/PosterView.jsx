import { Suspense } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { findPoster } from "./posters.js";

function Loading({ poster }) {
  return (
    <div className="poster-loading">
      <div className="spinner" />
      <div className="poster-loading-title">{poster.title}</div>
      {poster.heavy && (
        <div className="poster-loading-note">
          Full-resolution artwork — one moment
        </div>
      )}
    </div>
  );
}

export default function PosterView() {
  const { slug } = useParams();
  const poster = findPoster(slug);

  if (!poster) return <Navigate to="/" replace />;

  const { Component } = poster;
  return (
    <div className="poster-stage">
      <Link to="/" className="back-btn" aria-label="Back to gallery">
        <span aria-hidden="true">&larr;</span> Gallery
      </Link>
      <Suspense fallback={<Loading poster={poster} />}>
        <Component />
      </Suspense>
    </div>
  );
}
