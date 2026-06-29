// Functions for getting option prices and calculating the total price of a car.

import {
  BASE_PRICE,
  exteriorOptions,
  roofOptions,
  wheelOptions,
  interiorOptions,
} from "../data/options";

// Look up the price for a single option name within a given option list.
export const getOptionPrice = (optionsList, name) => {
  return optionsList.find((o) => o.name === name)?.price ?? 0;
};

// Calculate the total price of a car from its current selections.
export const calculatePrice = ({ exterior, roof, wheels, interior }) => {
  const exteriorPrice = getOptionPrice(exteriorOptions, exterior);
  const roofPrice = getOptionPrice(roofOptions, roof);
  const wheelsPrice = getOptionPrice(wheelOptions, wheels);
  const interiorPrice = getOptionPrice(interiorOptions, interior);

  return BASE_PRICE + exteriorPrice + roofPrice + wheelsPrice + interiorPrice;
};
