import { JSX, createEffect, For, onCleanup } from 'solid-js';
import { createStore, produce, reconcile } from 'solid-js/store';

export default {
  title: 'SolidJs/Control Flow/Props',
};

// When props are changed all components are not recalculated.
export const Child = (props: { n: number }) => {
  console.log('pre calculations done only once!');
  // if(props.n ==0) return 'hello'; // early exit is not good.
  return <h1>Hello World {props.n}</h1>;
};

export function Parent() {
  const [state, setState] = createStore({ count: 0 });

  const timer = setInterval(() => {
    setState({ count: state.count + 1 });
  }, 1000);

  onCleanup(() => {
    clearInterval(timer);
  });

  return (
    <div>
      {state.count}
      <button onClick={e => setState({ count: state.count + 1 })}>Hello Button</button>;
      <Child n={state.count} />
    </div>
  );
}

const Child2 = (props: { n: number }) => {
  createEffect(() => {
    console.log('run this when props change', props.n);
  });
  return <h1>Hello World {props.n}</h1>;
};

export const Parent2 = (props: { n: number }) => {
  const [state, setState] = createStore({ count: 0 });
  return (
    <div>
      <Child2 n={state.count} />
      <button type="button" onClick={_ => setState({ count: state.count + 1 })}>
        Change
      </button>
    </div>
  );
};
const Child3 = (props: { content: number[] }) => {
  return (
    <div>
      <For each={props.content}>
        {(c, i) => {
          console.log({ c });
          return 'hi';
        }}
      </For>
    </div>
  );
};

export const Parent3 = (props: { n: number }) => {
  const [state, setState] = createStore({ array: [] as number[] });
  return (
    <div>
      <Child3 content={state.array} />
      <button
        type="button"
        onClick={_ =>
          setState(
            'array',
            produce(l => {
              l.push(1);
            }),
          )
        }
      >
        Change
      </button>
    </div>
  );
};

export const ObjectSpreadWorks = () => {
  const [state, setState] = createStore({ count: 0 });
  const timer = setInterval(() => setState('count', c => c + 1), 1000);
  onCleanup(() => clearInterval(timer));
  const C = p => <h1>{p.c}</h1>;
  return <C {...{ c: state.count }} />;
};
