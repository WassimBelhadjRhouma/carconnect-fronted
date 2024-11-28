export const filters = {
  price: [
    { value: 0, label: "€0 - €25", checked: false },
    { value: 25, label: "€25 - €50", checked: false },
    { value: 50, label: "€50 - €75", checked: false },
    { value: 75, label: "€75+", checked: false },
  ],
  make: [
    { value: "Bmw", label: "Bmw", checked: false },
    { value: "Mercedes", label: "Mercedes", checked: false },
  ],
  drivingMode: [
    { value: "Automatic", label: "Automatic", checked: false },
    { value: "Manuel", label: "Manuel", checked: false },
  ],
  fuelType: [
    { value: "Petrol (Benzene)", label: "Petrol (Benzene)", checked: false },
    { value: "Electric", label: "Electric", checked: false },
    { value: "Hybrid", label: "Hybrid", checked: false },
  ],
};

export const priceLabels = {
  level1: "€0 - €25",
  level2: "€25 - €50",
  level3: "€50 - €75",
  level4: "€75+",
};
