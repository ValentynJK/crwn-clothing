import { AnyAction } from "redux"; // interface which extends Action interface which has generic T(type) with additional [extraProps: string]: any

// type Matchable receives generic AC which object which returns AnyAction(any type) 
export type Matchable<AC extends () => AnyAction> = AC & {
  type: ReturnType<AC>['type'];
  match(action: AnyAction): action is ReturnType<AC>;
};

// type overloading for the actions without payload
export function withMatcher<AC extends () => AnyAction & { type: string }>(actionCreator: AC): Matchable<AC>;
// type overloading
export function withMatcher<AC extends (...args: any[]) => AnyAction & { type: string }>(actionCreator: AC): Matchable<AC>;

export function withMatcher(actionCreator: Function) {
  const type = actionCreator().type;
  return Object.assign(actionCreator, {
    type,
    match(action: AnyAction) {
      return action.type === type
    }
  })
}

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