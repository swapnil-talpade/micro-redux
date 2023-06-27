import { Actions } from "./constants";

const initialState = { count: 50 };

export const reducer = (state: typeof initialState, action: Actions) => {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };
    case "DECREMENT":
      return { count: state.count - 1 };
    case "INCREMENT_BY":
      return { count: state.count + action.payload };
    case "DECREMENT_BY":
      return { count: state.count - action.payload };
    case "SET":
      return { count: action.payload };
    default:
      return state;
  }
};
