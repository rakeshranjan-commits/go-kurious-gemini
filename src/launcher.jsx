import React from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const loaders = {
  "01-heights-and-distances": () => import("./activities/01-heights-and-distances.jsx"),
  "02-fractions": () => import("./activities/02-fractions.jsx"),
  "03-perimeter-and-area": () => import("./activities/03-perimeter-and-area.jsx"),
  "04-types-of-angles": () => import("./activities/04-types-of-angles.jsx"),
  "05-reflection-in-mirrors": () => import("./activities/05-reflection-in-mirrors.jsx"),
  "06-states-of-matter": () => import("./activities/06-states-of-matter.jsx"),
  "07-magnetic-attraction": () => import("./activities/07-magnetic-attraction.jsx"),
  "08-human-digestive-system": () => import("./activities/08-human-digestive-system.jsx"),
  "09-photosynthesis": () => import("./activities/09-photosynthesis.jsx"),
  "10-food-chain-a": () => import("./activities/10-food-chain-a.jsx"),
  "11-food-chain-b": () => import("./activities/11-food-chain-b.jsx"),
  "12-earthquake": () => import("./activities/12-earthquake.jsx"),
  "13-floating-and-sinking": () => import("./activities/13-floating-and-sinking.jsx"),
  "14-rainwater-harvesting": () => import("./activities/14-rainwater-harvesting.jsx"),
  "15-moon-phases": () => import("./activities/15-moon-phases.jsx")
};

const activity = document.body.dataset.activity;
const root = createRoot(document.getElementById("root"));

if (!loaders[activity]) {
  root.render(<main style={{ padding: 32, fontFamily: "sans-serif" }}>Activity not found.</main>);
} else {
  loaders[activity]()
    .then(({ default: App }) => root.render(<App />))
    .catch((error) => {
      console.error(error);
      root.render(
        <main style={{ padding: 32, fontFamily: "sans-serif" }}>
          This activity could not be loaded.
        </main>
      );
    });
}
