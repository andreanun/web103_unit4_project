// Functions for checking whether a combination of selected features is valid.

import { NON_CONVERTIBLE_ROOFS } from "../data/options";

// A convertible can't have a roof that doesn't retract
export const isImpossibleCombo = ({ convertible, roof }) => {
  return convertible && NON_CONVERTIBLE_ROOFS.includes(roof);
};
