import { AnyAction } from "redux"; // interface which extends Action interface which has generic T(type) with additional [extraProps: string]: any

export type ActionWithPayload<T, P> = {
  type: T;
  payload: P;
};

export type Action<T> = {
  type: T;
};

// function overload when it is called with type and payload - it return object with type and payload
export function createAction<T extends string, P>(type: T, payload: P): ActionWithPayload<T, P>;

// function overload when it is called with type only - it return object with type only (payload is voided)
export function createAction<T extends string>(type: T, payload: void): Action<T>

// actual function which return object
export function createAction<T extends string, P>(type: T, payload: P) {
  return { type, payload }
}