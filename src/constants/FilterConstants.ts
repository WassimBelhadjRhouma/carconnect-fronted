export const filters = {
  price: [
    { value: 0, label: "€0 - €25", type: "checkbox" },
    { value: 25, label: "€25 - €50", type: "checkbox" },
    { value: 50, label: "€50 - €75", type: "checkbox" },
    { value: 75, label: "€75+", type: "checkbox" },
  ],
  make: [
    { value: "Bmw", label: "Bmw", type: "radio" },
    { value: "Mercedes", label: "Mercedes", type: "radio" },
  ],
  drivingMode: [
    { value: "Automatic", label: "Automatic", type: "radio" },
    { value: "Manuel", label: "Manuel", type: "radio" },
  ],
  fuelType: [
    { value: "Petrol (Benzene)", label: "Petrol (Benzene)", type: "radio" },
    { value: "Electric", label: "Electric", type: "radio" },
    { value: "Hybrid", label: "Hybrid", type: "radio" },
  ],
};

export const priceLabels = {
  level1: "€0 - €25",
  level2: "€25 - €50",
  level3: "€50 - €75",
  level4: "€75+",
};
