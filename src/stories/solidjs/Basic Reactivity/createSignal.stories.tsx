import { JSX, createEffect, createRoot, createSignal, onCleanup } from 'solid-js';

export default {
  title: 'SolidJs/Basic Reactivity/createSignal',
};

export const CounterSingalObject = () => {
  const [getState, setState] = createSignal({ count: 0 });

  const timer = setInterval(() => {
    setState(c => ({ count: c.count + 1 }));
  }, 1000);

  onCleanup(() => {
    clearInterval(timer);
  });

  return <div>{getState().count}</div>;
};

export const CounterSingalArray = () => {
  const [getState, setState] = createSignal<number[]>([]);

  const timer = setInterval(() => {
    setState(s => [...s, 11]);
  }, 1000);

  onCleanup(() => {
    clearInterval(timer);
  });

  return <div>{getState().length}</div>;
};

export const SingalInfiniteLoop = () => {
  const [getState, setState] = createSignal({ hello: 1 });
  console.log(1, getState());
  // setState({ world: 3 }); // DON'T RangeError: Maximum call stack size exceeded
  console.log(2, getState());
  return 'Hello';
};
