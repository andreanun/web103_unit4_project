export const BASE_PRICE = 40000;

export const exteriorOptions = [
  { name: "Black", price: 0, hex: "#1a1a1a" },
  { name: "White", price: 800, hex: "#f5f5f5" },
  { name: "Red", price: 1200, hex: "#c1121f" },
  { name: "Blue", price: 1200, hex: "#1d4ed8" },
  { name: "Green", price: 1500, hex: "#15803d" },
];

export const roofOptions = [
  { name: "Hardtop", price: 0 },
  { name: "Soft Top", price: 2200 },
  { name: "Sunroof", price: 1600 },
];

export const wheelOptions = [
  { name: "Standard", price: 0 },
  { name: "Chrome", price: 1800 },
  { name: "Sport Red-Rim", price: 2500 },
  { name: "Matte Black", price: 2000 },
];

export const interiorOptions = [
  { name: "Black Leather", price: 0 },
  { name: "Tan Leather", price: 900 },
  { name: "Gray Cloth", price: -500 },
  { name: "Red Leather", price: 1100 },
];

// Roof options that are incompatible with convertible = true.
export const NON_CONVERTIBLE_ROOFS = ["Hardtop", "Sunroof"];

export const isImpossibleCombo = ({ convertible, roof }) => {
  return convertible && NON_CONVERTIBLE_ROOFS.includes(roof);
};

export const calculatePrice = ({ exterior, roof, wheels, interior }) => {
  const exteriorPrice =
    exteriorOptions.find((o) => o.name === exterior)?.price ?? 0;
  const roofPrice = roofOptions.find((o) => o.name === roof)?.price ?? 0;
  const wheelsPrice = wheelOptions.find((o) => o.name === wheels)?.price ?? 0;
  const interiorPrice =
    interiorOptions.find((o) => o.name === interior)?.price ?? 0;

  return BASE_PRICE + exteriorPrice + roofPrice + wheelsPrice + interiorPrice;
};
