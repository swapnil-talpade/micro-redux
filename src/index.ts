import { reducer } from "./reducer";
import { createStore } from "./redux";

const initialState = { count: 50 };

const slider = document.querySelector("#slider") as HTMLDivElement;
const sliderValue = document.querySelector("#slider-value") as HTMLDivElement;

const store = createStore(initialState, reducer);
store.subscribe((newState) => {
  sliderValue.textContent = String(newState.count);
});

slider.addEventListener("input", ({ target }: Event) => {
  const value = (target as HTMLInputElement).value;
  store.dispatch({ type: "SET", payload: Number(value) });
});
