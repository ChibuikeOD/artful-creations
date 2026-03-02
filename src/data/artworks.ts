import costume1 from "@/assets/costume-1.jpg";
import costume2 from "@/assets/costume-2.jpg";
import costume3 from "@/assets/costume-3.jpg";
import digital1 from "@/assets/digital-1.jpg";
import digital2 from "@/assets/digital-2.jpg";
import digital3 from "@/assets/digital-3.jpg";
import digitalWasp from "@/pictures/digital-wasp.png";
import digitalBlaze from "@/pictures/digital-blaze.png";

export type ArtworkCategory = "costume" | "sculpture" | "digital";

export interface Artwork {
  id: string;
  category: ArtworkCategory;
  src: string;
  title: string;
  medium: string;
  description: string;
  details: string[];
}

const etherealCrown: Artwork = {
  id: "ethereal-crown",
  category: "costume",
  src: costume1,
  title: "Ethereal Crown",
  medium: "Mixed media & textile",
  description:
    "A ceremonial headpiece exploring the relationship between light, transparency, and ritual adornment.",
  details: [
    "Constructed with layered translucent fabrics, hand-stitched beading, and metallic wire armature.",
    "Designed to catch and scatter light, creating shifting halos and shadows as the wearer moves.",
    "Inspired by mythic royalty and the idea of protection as both armor and ornament.",
  ],
};

const organicGrowth: Artwork = {
  id: "organic-growth",
  category: "sculpture",
  src: costume2,
  title: "Organic Growth",
  medium: "Clay & wire sculpture",
  description:
    "A sculptural study of growth, erosion, and the tension between natural and constructed forms.",
  details: [
    "Built from hand-formed clay modules wrapped around a hidden wire skeleton.",
    "Surface textures reference coral, stone, and decaying architecture.",
    "Finished with a layered patina to emphasize age and weathering.",
  ],
};

const ironLegacy: Artwork = {
  id: "iron-legacy",
  category: "costume",
  src: costume3,
  title: "Iron Legacy",
  medium: "Metalwork & leather",
  description:
    "A wearable piece that blurs the line between costume, armor, and sculptural artifact.",
  details: [
    "Cold-formed metal plates are combined with riveted leather panels.",
    "Visual language references both historical armor and industrial machinery.",
    "Intended to feel heavy, protective, and slightly otherworldly on the body.",
  ],
};

export const costumeArtworks: Artwork[] = [etherealCrown, ironLegacy];

export const sculptureArtworks: Artwork[] = [organicGrowth];

export const digitalArtworks: Artwork[] = [
  {
    id: "celestial-bloom",
    category: "digital",
    src: digital1,
    title: "Celestial Bloom",
    medium: "Digital painting",
    description:
      "An imagined flower suspended in space, caught between cosmic void and radiant nebula.",
    details: [
      "Painted using layered brushwork to blend organic petals with vapor-like light.",
      "Color palette pulls from golden hour sunsets and deep space photography.",
      "Explores how fragile forms can feel monumental at the right scale.",
    ],
  },
  {
    id: "neon-dusk",
    category: "digital",
    src: digital2,
    title: "Neon Dusk",
    medium: "Digital illustration",
    description:
      "A cityscape at the edge of night, where architecture dissolves into light, fog, and reflections.",
    details: [
      "Built from simple geometric blocks then overpainted with soft gradients and glows.",
      "Uses exaggerated perspective and color to push the scene toward dreamlike abstraction.",
      "Inspired by late-night walks and the way neon bleeds into wet concrete.",
    ],
  },
  {
    id: "sacred-geometry",
    category: "digital",
    src: digital3,
    title: "Sacred Geometry",
    medium: "Generative art",
    description:
      "A generative study of repeating forms, symmetry, and the quiet rhythm of mathematical pattern.",
    details: [
      "Composed from algorithmically generated line work refined by hand.",
      "Explores how minor imperfections keep rigid patterns feeling alive.",
      "Intended as a meditative piece that rewards slow, close viewing.",
    ],
  },
  {
    id: "wasp-guardian",
    category: "digital",
    src: digitalWasp,
    title: "",
    medium: "Character illustration",
    description:
      "A bold character design inspired by the armor, wings, and warning colors of a wasp.",
    details: [
      "Combines graphic, simplified shapes with sharp angles to echo insect armor.",
      "Palette balances warm yellows and oranges against deep olives for contrast.",
      "Designed as a full-body turnaround to explore silhouette and costuming details.",
    ],
  },
  {
    id: "blaze-buzz",
    category: "digital",
    src: digitalBlaze,
    title: "",
    medium: "Character illustration",
    description:
      "A high-energy character built around saturated neon color, playful accessories, and exaggerated proportions.",
    details: [
      "Uses intense reds, pinks, and yellows to create a loud, almost poster-like impact.",
      "Platform boots and skull motifs push the design toward punk and club-kid aesthetics.",
      "Explores how costume shapes can feel both cute and slightly dangerous at the same time.",
    ],
  },
];

export const digitalModels: Artwork[] = [];
export const digitalCharacters: Artwork[] = digitalArtworks.filter((artwork) =>
  ["wasp-guardian", "blaze-buzz"].includes(artwork.id)
);
export const digitalIllustrations: Artwork[] = digitalArtworks.filter((artwork) =>
  ["celestial-bloom", "neon-dusk", "sacred-geometry"].includes(artwork.id)
);

export const allArtworks: Artwork[] = [
  ...costumeArtworks,
  ...sculptureArtworks,
  ...digitalArtworks,
];

export function getArtwork(category: ArtworkCategory, id: string): Artwork | undefined {
  return allArtworks.find(
    (artwork) => artwork.category === category && artwork.id === id
  );
}

