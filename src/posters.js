import { lazy } from "react";

// Every poster is lazy-loaded so it becomes its own chunk — the deck ships
// none of the poster code up front. `load` is kept alongside the lazy
// component so neighboring slides can be preloaded before the user swipes.
// The `heavy` flag marks the five posters with embedded base64 imagery
// (350–580 KB source) so the UI can warn while loading.
const entry = (meta, load) => ({ ...meta, load, Component: lazy(load) });

export const posters = [
  entry(
    {
      slug: "lifeview-framework",
      title: "The LifeView Framework",
      subtitle: "The overall framework map",
      group: "Framework",
    },
    () => import("./posters/LifeViewFramework.jsx")
  ),
  entry(
    {
      slug: "three-healings",
      title: "The Three Healings",
      subtitle: "Self · Others · World",
      group: "Framework",
      heavy: true,
    },
    () => import("./posters/ThreeHealings.jsx")
  ),
  entry(
    {
      slug: "source-vs-control",
      title: "Source vs Control",
      subtitle: "The Source vs Control-Matrix pairs",
      group: "Framework",
    },
    () => import("./posters/SourceVsControl.jsx")
  ),
  entry(
    {
      slug: "quiet-the-ego",
      title: "Quiet the Ego",
      subtitle: "Activation One",
      group: "The Four Activations",
      heavy: true,
    },
    () => import("./posters/QuietTheEgo.jsx")
  ),
  entry(
    {
      slug: "heal-the-inner-child",
      title: "Heal the Inner Child",
      subtitle: "Activation Two",
      group: "The Four Activations",
      heavy: true,
    },
    () => import("./posters/HealTheInnerChild.jsx")
  ),
  entry(
    {
      slug: "awaken-the-higher-self",
      title: "Awaken the Higher Self",
      subtitle: "Activation Three",
      group: "The Four Activations",
      heavy: true,
    },
    () => import("./posters/AwakenTheHigherSelf.jsx")
  ),
  entry(
    {
      slug: "connect-to-soul",
      title: "Connect to Soul",
      subtitle: "Activation Four — Identity · Passion · Purpose",
      group: "The Four Activations",
      heavy: true,
    },
    () => import("./posters/ConnectToSoul.jsx")
  ),
  entry(
    {
      slug: "heros-journey",
      title: "The Hero's Journey",
      subtitle: "The 7-step Sovereign Hero's Journey",
      group: "Framework",
    },
    () => import("./posters/HeroJourney.jsx")
  ),
  entry(
    {
      slug: "three-zones",
      title: "The Three Zones",
      subtitle: "Nervous-system regulation",
      group: "The Toolkit",
    },
    () => import("./posters/ThreeZones.jsx")
  ),
  entry(
    {
      slug: "three-keys",
      title: "The Three Keys",
      subtitle: "Relational success",
      group: "The Toolkit",
    },
    () => import("./posters/ThreeKeys.jsx")
  ),
  entry(
    {
      slug: "four-horsemen",
      title: "The Four Horsemen",
      subtitle: "Destructive communication and its antidotes",
      group: "The Toolkit",
    },
    () => import("./posters/FourHorsemen.jsx")
  ),
  entry(
    {
      slug: "four-agreements",
      title: "The Four Agreements",
      subtitle: "A code for personal freedom",
      group: "The Toolkit",
    },
    () => import("./posters/FourAgreements.jsx")
  ),
  entry(
    {
      slug: "four-enemies",
      title: "The Four Enemies",
      subtitle: "What stands in the way",
      group: "The Toolkit",
    },
    () => import("./posters/FourEnemies.jsx")
  ),
  entry(
    {
      slug: "five-rhythms",
      title: "The Five Rhythms",
      subtitle: "Movement practice",
      group: "The Toolkit",
    },
    () => import("./posters/FiveRhythms.jsx")
  ),
  entry(
    {
      slug: "five-parts",
      title: "The Five Parts",
      subtitle: "The Internal Family Systems parts model",
      group: "The Toolkit",
    },
    () => import("./posters/FiveParts.jsx")
  ),
  entry(
    {
      slug: "four-meditations",
      title: "The Four Meditations",
      subtitle: "Daily contemplative practice",
      group: "The Toolkit",
    },
    () => import("./posters/FourMeditations.jsx")
  ),
];

export function findPoster(slug) {
  return posters.find((p) => p.slug === slug);
}
