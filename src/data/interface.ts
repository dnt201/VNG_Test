export interface iOption {
  value: string;
  label: string;
}

export var listFilter: iOption[] = [
  { value: "not", label: "Not set" },
  {
    value: "inc",
    label: "Increase",
  },
  { value: "dec", label: "Decrease" },
];

export interface iTh {
  title: string;
  value: string;
}
