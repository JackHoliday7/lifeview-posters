import { Link } from "react-router-dom";
import { posters } from "./posters.js";

const GROUPS = ["Framework", "The Four Activations", "The Toolkit"];

export default function Gallery() {
  return (
    <div className="gallery">
      <header className="gallery-header">
        <div className="gallery-kicker">Higher Power Sedona</div>
        <h1 className="gallery-title">The LifeView Posters</h1>
        <div className="gallery-rule" />
        <div className="gallery-sub">
          Sixteen posters mapping the LifeView healing framework
        </div>
      </header>

      {GROUPS.map((group) => (
        <section key={group}>
          <div className="group-label">{group}</div>
          <div className="card-grid">
            {posters
              .filter((p) => p.group === group)
              .map((p) => (
                <Link key={p.slug} to={`/p/${p.slug}`} className="card">
                  <div className="card-num">
                    {String(posters.indexOf(p) + 1).padStart(2, "0")}
                  </div>
                  <div className="card-title">{p.title}</div>
                  <div className="card-sub">{p.subtitle}</div>
                </Link>
              ))}
          </div>
        </section>
      ))}

      <footer className="gallery-footer">
        <a href="https://higherpowersedona.org">higherpowersedona.org</a>
      </footer>
    </div>
  );
}
