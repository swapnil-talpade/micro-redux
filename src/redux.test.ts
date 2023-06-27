import { describe, expect, it, vi } from "vitest";
import { reducer } from "./reducer";
import { createStore } from "./redux";

describe("redux", () => {
  it("should update state predictably", () => {
    const initialState = { count: 0 };

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
