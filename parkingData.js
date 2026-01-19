const generateDistances = () =>
  Array.from({ length: 3 }, () => Math.round(Math.random() * 10));

export const parkingSlots = () => [
  {
    id: 1,
    size: 'SP',
    distances: generateDistances(),
    available: Math.random() < 0.5,
  },
  {
    id: 2,
    size: 'MP',
    distances: generateDistances(),
    available: Math.random() < 0.5,
  },
  {
    id: 3,
    size: 'MP',
    distances: generateDistances(),
    available: Math.random() < 0.5,
  },
  {
    id: 4,
    size: 'MP',
    distances: generateDistances(),
    available: Math.random() < 0.5,
  },
  {
    id: 5,
    size: 'LP',
    distances: generateDistances(),
    available: Math.random() < 0.5,
  },
  {
    id: 6,
    size: 'LP',
    distances: generateDistances(),
    available: Math.random() < 0.5,
  },
  {
    id: 7,
    size: 'SP',
    distances: generateDistances(),
    available: Math.random() < 0.5,
  },
  {
    id: 8,
    size: 'MP',
    distances: generateDistances(),
    available: Math.random() < 0.5,
  },
  {
    id: 9,
    size: 'LP',
    distances: generateDistances(),
    available: Math.random() < 0.5,
  },
  {
    id: 10,
    size: 'LP',
    distances: generateDistances(),
    available: Math.random() < 0.5,
  },
  {
    id: 11,
    size: 'SP',
    distances: generateDistances(),
    available: Math.random() < 0.5,
  },
  {
    id: 12,
    size: 'SP',
    distances: generateDistances(),
    available: Math.random() < 0.5,
  },
  {
    id: 13,
    size: 'MP',
    distances: generateDistances(),
    available: Math.random() < 0.5,
  },
  {
    id: 14,
    size: 'MP',
    distances: generateDistances(),
    available: Math.random() < 0.5,
  },
  {
    id: 15,
    size: 'LP',
    distances: generateDistances(),
    available: Math.random() < 0.5,
  },
  {
    id: 16,
    size: 'LP',
    distances: generateDistances(),
    available: Math.random() < 0.5,
  },
  {
    id: 17,
    size: 'SP',
    distances: generateDistances(),
    available: Math.random() < 0.5,
  },
  {
    id: 18,
    size: 'MP',
    distances: generateDistances(),
    available: Math.random() < 0.5,
  },
  {
    id: 19,
    size: 'LP',
    distances: generateDistances(),
    available: Math.random() < 0.5,
  },
  {
    id: 20,
    size: 'LP',
    distances: generateDistances(),
    available: Math.random() < 0.5,
  },
  {
    id: 21,
    size: 'SP',
    distances: generateDistances(),
    available: Math.random() < 0.5,
  },
  {
    id: 22,
    size: 'SP',
    distances: generateDistances(),
    available: Math.random() < 0.5,
  },
  {
    id: 23,
    size: 'MP',
    distances: generateDistances(),
    available: Math.random() < 0.5,
  },
  {
    id: 24,
    size: 'MP',
    distances: generateDistances(),
    available: Math.random() < 0.5,
  },
  {
    id: 25,
    size: 'LP',
    distances: generateDistances(),
    available: Math.random() < 0.5,
  },
];

export const entryPoints = ['A', 'B', 'C'];

export const generateEntryPoint = () => {
  const randomEntryPoint =
    entryPoints[Math.floor(Math.random() * entryPoints.length)];

  return randomEntryPoint;
};
