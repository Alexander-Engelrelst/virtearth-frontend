const landmarks = [
  {
    id: "lm-001",
    name: "Colosseum",
    latitude: 41.8902,
    longitude: 12.4922,
    year: 80, // Opening of the Colosseum
  },
  {
    id: "lm-002",
    name: "Great Wall – Jinshanling",
    latitude: 40.6769,
    longitude: 117.2361,
    year: 1570, // Ming dynasty section around Jinshanling
  },
  {
    id: "lm-003",
    name: "Machu Picchu",
    latitude: -13.1631,
    longitude: -72.545,
    year: 1450, // Approx construction
  },
  {
    id: "lm-004",
    name: "Giza Pyramids",
    latitude: 29.9792,
    longitude: 31.1342,
    year: -2560, // Great Pyramid completion (BC as negative)
  },
  {
    id: "lm-005",
    name: "Angkor Wat",
    latitude: 13.4125,
    longitude: 103.867,
    year: 1150, // Rough completion
  },
  {
    id: "lm-006",
    name: "Forbidden City",
    latitude: 39.9163,
    longitude: 116.3972,
    year: 1420, // Completed for Yongle Emperor
  },
  {
    id: "lm-007",
    name: "Knossos Palace",
    latitude: 35.2982,
    longitude: 25.1596,
    year: -1500, // Peak Minoan era
  },
  {
    id: "lm-008",
    name: "Tikal Temple",
    latitude: 17.222,
    longitude: -89.6237,
    year: 750, // Classic Maya peak
  },
  {
    id: "lm-009",
    name: "Petra",
    latitude: 30.3285,
    longitude: 35.4444,
    year: 100, // Nabatean golden age
  },
  {
    id: "lm-010",
    name: "Library of Alexandria (Reconstructed)",
    latitude: 31.2083,
    longitude: 29.9091,
    year: -280, // Original library era
  },
];

export async function mockGetLandmarks() {
  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    landmarks: landmarks,
  };
}
