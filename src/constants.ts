export type Actions =
  | { type: "INCREMENT" }
  | { type: "DECREMENT" }
  | { type: "INCREMENT_BY"; payload: number }
  | { type: "DECREMENT_BY"; payload: number }
  | { type: "SET"; payload: number };
