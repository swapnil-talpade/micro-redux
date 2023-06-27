import { describe, expect, it, vi } from "vitest";

const createStore = <State, Action>(
  initialState: State,
  reducer: (state: State, action: Action) => State
) => {
  let state = initialState;
  const getState = () => state;
  let subscribers = new Set<(state: State) => void>();

  return {
    getState,
    dispatch: (action: Action) => {
      state = reducer(state, action);
      subscribers.forEach((callback) => callback(state));
    },
    subscribe: (callback: (state: State) => void) => {
      subscribers.add(callback);
      return () => subscribers.delete(callback);
    },
  };
};

describe("redux", () => {
  it("should update state predictably", () => {
    const initialState = { count: 0 };
    type Actions =
      | { type: "INCREMENT" }
      | { type: "DECREMENT" }
      | { type: "INCREMENT_BY"; payload: number }
      | { type: "DECREMENT_BY"; payload: number };

    const reducer = (state: typeof initialState, action: Actions) => {
      switch (action.type) {
        case "INCREMENT":
          return { count: state.count + 1 };
        case "DECREMENT":
          return { count: state.count - 1 };
        case "INCREMENT_BY":
          return { count: state.count + action.payload };
        case "DECREMENT_BY":
          return { count: state.count - action.payload };
        default:
          return state;
      }
    };

    const store = createStore(initialState, reducer);
    const noop = { sub: () => {} };

    vi.spyOn(noop, "sub");
    store.subscribe(noop.sub);

    expect(store.getState()).toEqual({ count: 0 });
    store.dispatch({ type: "INCREMENT" });

    expect(noop.sub).toHaveBeenCalledTimes(1);

    store.dispatch({ type: "INCREMENT" });
    expect(store.getState()).toEqual({ count: 2 });

    store.dispatch({ type: "DECREMENT" });
    expect(store.getState()).toEqual({ count: 1 });

    store.dispatch({ type: "INCREMENT_BY", payload: 5 });
    expect(store.getState()).toEqual({ count: 6 });

    store.dispatch({ type: "DECREMENT_BY", payload: 2 });
    expect(store.getState()).toEqual({ count: 4 });

    expect(noop.sub).toHaveBeenCalledTimes(5);
  });
});
