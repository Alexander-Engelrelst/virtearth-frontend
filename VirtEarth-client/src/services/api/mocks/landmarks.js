const landmarks = [
  {
    id: "lm-001",
    name: "Colosseum",
    latitude: 41.8902,
    longitude: 12.4922
  },
  {
    id: "lm-002",
    name: "Great Wall – Jinshanling",
    latitude: 40.6769,
    longitude: 117.2361
  },
  {
    id: "lm-003",
    name: "Machu Picchu",
    latitude: -13.1631,
    longitude: -72.5450
  },
  {
    id: "lm-004",
    name: "Giza Pyramids",
    latitude: 29.9792,
    longitude: 31.1342
  },
  {
    id: "lm-005",
    name: "Angkor Wat",
    latitude: 13.4125,
    longitude: 103.8670
  },
  {
    id: "lm-006",
    name: "Forbidden City",
    latitude: 39.9163,
    longitude: 116.3972
  },
  {
    id: "lm-007",
    name: "Knossos Palace",
    latitude: 35.2982,
    longitude: 25.1596
  },
  {
    id: "lm-008",
    name: "Tikal Temple",
    latitude: 17.2220,
    longitude: -89.6237
  },
  {
    id: "lm-009",
    name: "Petra",
    latitude: 30.3285,
    longitude: 35.4444
  },
  {
    id: "lm-010",
    name: "Library of Alexandria (Reconstructed)",
    latitude: 31.2083,
    longitude: 29.9091
  }
]


export async function mockGetLandmarks() {
  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    "landmarks": landmarks,
  };
}