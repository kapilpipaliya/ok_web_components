import { JSX, Component, createEffect, createMemo, createSignal, For, Match, onCleanup, Show, Switch } from 'solid-js';
import { createStore, reconcile } from 'solid-js/store';


export default {
  title: 'SolidJs/Control Flow/Examples',
};

export function Counter() {
  const [state, setState] = createStore({ count: 0 });

  const timer = setInterval(() => {
    setState({ count: state.count + 1 });
  }, 1000);

  onCleanup(() => {
    clearInterval(timer);
  });

  return (
    <div>
      <Switch fallback={<div>Not Found</div>}>
        <Match when={state.count % 2 == 0}>home</Match>
        <Match when={state.count % 2 != 0}>settings</Match>
        <Match when={state.count % 2 != 0}>only First condition match</Match>
      </Switch>
    </div>
  );
}

export const State1 = props => {
  const [state, setState] = createStore({ count: 0 });
  const timer = setInterval(() => {
    setState({ count: state.count + 1 });
  }, 1000);

  onCleanup(() => {
    clearInterval(timer);
  });

  return <div>{state.count}</div>;
};
/* About createSignal:
@ryansolid Thank you so much, i dont understand createSignal can you explain it?
￼ryansolid 06/17/2020
From there you can store much richer things in the Context.. like createStore objects or custom reactive logic. It all just uses the same reactive primitives you would use to author components.(edited)
￼ryansolid 06/17/2020
Let me see.. createSignal the most basic reactive primitive. It can store any sort of value including simple primitives like numbers or strings. It comes back as a tuple where the first argument is a getter function, and the 2nd is a setter. In concept they are similar to ref in Vue and observables in MobX. A createStore object is made up of many of these. We should move to #help perhaps.(edited)
puresoul06/17/2020
thank you so much... */
export const StateArrayNotWork = props => {
  const [state, setState] = createStore([]);
  const timer = setInterval(() => {
    state.push(3);
    setState(state);
  }, 1000);

  onCleanup(() => {
    clearInterval(timer);
  });

  return <div>{JSON.stringify(state)}</div>;
};

export const StateArrayWork = props => {
  const [state, setState] = createStore({ list: [1] as number[] });
  const timer = setInterval(() => {
    state.list.push(3);
    setState({ list: state.list });
  }, 1000);

  onCleanup(() => {
    clearInterval(timer);
  });

  return <div>{JSON.stringify(state.list)}</div>;
};

export const StateArrayWorkSignal = props => {
  const [getState, setState] = createSignal([]);
  const timer = setInterval(() => {
    getState().push(3);
    setState(getState());
  }, 1000);

  onCleanup(() => {
    clearInterval(timer);
  });

  return <div>{JSON.stringify(getState())}</div>;
};
export const MyComp = props => {
  return <div>{props.item}</div>;
};

export const ForLoop = props => {
  return (
    <div>
      {' '}
      <For each={[1, 2, 3]} fallback={<div>Loading Form Loop...</div>}>
        {(item, i) => (
          <>
            <MyComp item={item} />
          </>
        )}
      </For>
    </div>
  );
};

export const ForLoop2 = props => {
  const [getState, setState] = createSignal([]);
  const timer = setInterval(() => {
    getState().push(3);
    setState(getState());
  }, 1000);

  onCleanup(() => {
    clearInterval(timer);
  });

  return (
    <div>
      {' '}
      <For each={getState()} fallback={<div>Loading Form Loop...</div>}>
        {(item, i) => (
          <>
            <MyComp item={i} />
          </>
        )}
      </For>
    </div>
  );
};

export const ForLoop3 = props => {
  const [state, setState] = createStore({ list: [], a: 19 });
  const timer = setInterval(() => {
    setState({ list: [1, 2, 3] });
  }, 1000);

  onCleanup(() => {
    clearInterval(timer);
  });

  return (
    <div>
      {' '}
      <For each={state.list} fallback={<div>Loading Form Loop...</div>}>
        {(item, i) => (
          <>
            <MyComp item={i} />
            {state.a}
          </>
        )}
      </For>
    </div>
  );
};

export const ForLoop4 = props => {
  const [state, setState] = createStore({ list: [1, 2, 3] });
  return (
    <div>
      {' '}
      <For each={state.list} fallback={<div>Loading Form Loop...</div>}>
        {(item, i) => <div>{state.list[i()]}</div>}
      </For>
    </div>
  );
};

export const ObjectStateTest = props => {
  const [state, setState] = createStore({ a: { b: 1, c: 2 } });
  return (
    <div>
      {state.a.b} --{state.a.c}
      <button onClick={() => setState({ a: { b: 2 } })}>Change</button>
    </div>
  );
};

function RefComp(props) {
  console.log(props);
  return <div ref={props.ref} />;
}

export const RefCallBackExample = props => {
  let myDiv;
  setTimeout(() => console.log(myDiv));
  return <RefComp ref={myDiv} />;
};

function RefHtmlComp(props: { content: string }) {
  // 1
  // const d = <div innerHTML={'<b>Hello</b>'} />;
  // return d.childNodes;
  // 2
  /* const t = document.createElement('template');
  t.innerHTML = '<b>hello</b>';
  return t.content; */
  const t = document.createElement('template');
  return () => {
    t.innerHTML = props.content;
    return [...t.content.childNodes];
  };
}

export const HtmlExample = props => {
  const [state, setState] = createStore({ content: '<b>Hello World</b>' });
  const onChange = () => {
    setState({ content: '<b>Hello New World</b>' });
  };
  return (
    <ul>
      <RefHtmlComp content={state.content} />
      <button onClick={onChange}>Change</button>
    </ul>
  );
};

//= ==createMemo====

//= =createResource====

//= ==Suspense=====

// Boolean coherence=====
export const BooleanCoherence = props => {
  const [state, setState] = createStore({ run: false });
  const onChange = () => setState({ run: !state.run });

  return (
    <div>
      {state.run ? 'True' : 'False'}
      {state.run && <p>Hello World</p>}
      <Show when={state.run}>
        <p>Hello World</p>
      </Show>
      <button onClick={onChange}>Change</button>
    </div>
  );
};
export const StyleTestButton = (props: {}) => {
  return <button style={{ width: 100 }}>Helloo</button>;
};

//= =======
export const ClassNameExamples = props => {
  const [state, setState] = createStore({ run: false });
  const onChange = () => setState({ run: !state.run });

  return (
    <div class="tree-row" classList={{ 'active-row': state.run }}>
      <button onClick={onChange}>Change</button>
    </div>
  );
};
//------------
const RenderRenderFn = (props: { render: Component }) => {
  return props.render({ foo: 'Bar' });
};
export const RenderPropExample = () => {
  const renderSampleText = (p: { foo: string }) => (
    <div>
      <h1>{p.foo}</h1>
    </div>
  );
  return <RenderRenderFn render={renderSampleText} />;
};
//= =memo example
export const MemoExample = props => {
  const [state, setState] = createStore({ text: '' });
  const onChange = () => setState({ text: `${state.text}new` });

  const b = createMemo(() => {
    console.log('calculating');
    return `${state.text}My New Addition`;
  });
  return (
    <div>
      {b}
      <button onClick={onChange}>Change</button>
      {b}
    </div>
  );
};
export const simplifyConditionUsingFunction = () => {
  const [state, setState] = createStore({ logo: 'tiny' });
  function getText() {
    let text = 'Logo';
    if (state.logo === 'tiny') {
      text = 'L';
    } else if (state.logo === 'small') {
      text = 'Log';
    }
    return text;
  }

  const Toggle = () => setState({ logo: state.logo ? '' : 'small' });
  return (
    <div>
      {getText()} <button type="button" onClick={Toggle} >Toggle</button>
    </div>
  );
};

export const MemoDependancyExample = props => {
  const [state, setState] = createStore({ text: '', text2: '' });
  const onChange = () => setState({ text: `${state.text}new` });
  const onChange2 = () => setState({ text2: `${state.text2}new` });

  const b = createMemo(() => {
    console.log('calculating1');
    return `${state.text}My New Addition`;
  });
  const b2 = createMemo(() => {
    console.log('calculating2');
    return state.text2 + b(); // cool calling b() here also not call above function two times!
  });
  return (
    <div>
      {b}
      <button onClick={onChange}>Change</button>
      <button onClick={onChange2}>Change</button>
      <div title={b()} />
      {b}
      {b2}
      {b2}
      {b2() && <div>Hello</div>}
    </div>
  );
};
