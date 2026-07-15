import { lazy } from "react";

// Every poster is lazy-loaded so it becomes its own chunk — the gallery index
// ships none of the poster code. The `heavy` flag marks the five posters with
// embedded base64 imagery (350–580 KB source) so the UI can warn while loading.
export const posters = [
  {
    slug: "lifeview-framework",
    title: "The LifeView Framework",
    subtitle: "The overall framework map",
    group: "Framework",
    Component: lazy(() => import("./posters/LifeViewFramework.jsx")),
  },
  {
    slug: "three-healings",
    title: "The Three Healings",
    subtitle: "Self · Others · World",
    group: "Framework",
    heavy: true,
    Component: lazy(() => import("./posters/ThreeHealings.jsx")),
  },
  {
    slug: "source-vs-control",
    title: "Source vs Control",
    subtitle: "The Source vs Control-Matrix pairs",
    group: "Framework",
    Component: lazy(() => import("./posters/SourceVsControl.jsx")),
  },
  {
    slug: "quiet-the-ego",
    title: "Quiet the Ego",
    subtitle: "Activation One",
    group: "The Four Activations",
    heavy: true,
    Component: lazy(() => import("./posters/QuietTheEgo.jsx")),
  },
  {
    slug: "heal-the-inner-child",
    title: "Heal the Inner Child",
    subtitle: "Activation Two",
    group: "The Four Activations",
    heavy: true,
    Component: lazy(() => import("./posters/HealTheInnerChild.jsx")),
  },
  {
    slug: "awaken-the-higher-self",
    title: "Awaken the Higher Self",
    subtitle: "Activation Three",
    group: "The Four Activations",
    heavy: true,
    Component: lazy(() => import("./posters/AwakenTheHigherSelf.jsx")),
  },
  {
    slug: "connect-to-soul",
    title: "Connect to Soul",
    subtitle: "Activation Four — Identity · Passion · Purpose",
    group: "The Four Activations",
    heavy: true,
    Component: lazy(() => import("./posters/ConnectToSoul.jsx")),
  },
  {
    slug: "heros-journey",
    title: "The Hero's Journey",
    subtitle: "The 7-step Sovereign Hero's Journey",
    group: "Framework",
    Component: lazy(() => import("./posters/HeroJourney.jsx")),
  },
  {
    slug: "three-zones",
    title: "The Three Zones",
    subtitle: "Nervous-system regulation",
    group: "The Toolkit",
    Component: lazy(() => import("./posters/ThreeZones.jsx")),
  },
  {
    slug: "three-keys",
    title: "The Three Keys",
    subtitle: "Relational success",
    group: "The Toolkit",
    Component: lazy(() => import("./posters/ThreeKeys.jsx")),
  },
  {
    slug: "four-horsemen",
    title: "The Four Horsemen",
    subtitle: "Destructive communication and its antidotes",
    group: "The Toolkit",
    Component: lazy(() => import("./posters/FourHorsemen.jsx")),
  },
  {
    slug: "four-agreements",
    title: "The Four Agreements",
    subtitle: "A code for personal freedom",
    group: "The Toolkit",
    Component: lazy(() => import("./posters/FourAgreements.jsx")),
  },
  {
    slug: "four-enemies",
    title: "The Four Enemies",
    subtitle: "What stands in the way",
    group: "The Toolkit",
    Component: lazy(() => import("./posters/FourEnemies.jsx")),
  },
  {
    slug: "five-rhythms",
    title: "The Five Rhythms",
    subtitle: "Movement practice",
    group: "The Toolkit",
    Component: lazy(() => import("./posters/FiveRhythms.jsx")),
  },
  {
    slug: "five-parts",
    title: "The Five Parts",
    subtitle: "The Internal Family Systems parts model",
    group: "The Toolkit",
    Component: lazy(() => import("./posters/FiveParts.jsx")),
  },
  {
    slug: "four-meditations",
    title: "The Four Meditations",
    subtitle: "Daily contemplative practice",
    group: "The Toolkit",
    Component: lazy(() => import("./posters/FourMeditations.jsx")),
  },
];

export function findPoster(slug) {
  return posters.find((p) => p.slug === slug);
}
