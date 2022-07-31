import { JSX, createContext, createSignal, Switch, useContext } from 'solid-js';
import { createStore, produce, reconcile } from 'solid-js/store';

export default { title: 'SolidJs/Component APIs/createContext' };

const CounterContext = createContext([{ count: 0 }, {}]);

function CounterProvider(props) {
  const [state, setState] = createStore({ count: props.count || 0 });
  const store = [
    state,
    {
      increment() {
        setState('count', c => c + 1);
      },
      decrement() {
        setState('count', c => c - 1);
      },
    },
  ];

  return <CounterContext.Provider value={store}>{props.children}</CounterContext.Provider>;
}

// nested.js
const Nested = () => {
  const [counter, { increment, decrement }] = useContext(CounterContext);
  return (
    <>
      <div>{counter.count}</div>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </>
  );
};
// app.js
const App = () => (
  <div>
    <h2>Welcome to Counter App</h2>
    <Nested />
  </div>
);

// index.js
export const AppRouter = () => (
  // start counter at 2
  <CounterProvider count={2}>
    <App />
  </CounterProvider>
);

const css = createContext(1);

const Nested1 = () => {
  let css3 = useContext(css);
  return (
    <>
      <div>{css3}</div>
      <button onClick={() => (css3 += 1)}>+</button>
      <button onClick={() => (css3 -= 1)}>-</button>
    </>
  );
};
const App1 = () => (
  <div>
    <h2>Welcome to Counter App</h2>
    <Nested1 />
  </div>
);
export const ReadOnlyStore = () => (
  // start counter at 2
  <css.Provider value={2}>
    <App1 />
  </css.Provider>
);

const cssStore = createContext(createSignal(2));
const Nested2 = () => {
  const [getCss, setCss] = useContext(cssStore);
  return (
    <>
      <div>{getCss()}</div>
      {useContext(cssStore)[0]()}
      <button onClick={() => setCss(getCss() + 1)}>+</button>
      <button onClick={() => setCss(getCss() - 1)}>-</button>
    </>
  );
};
const App2 = () => {
  const [getCss, setCss] = useContext(cssStore);
  return (
    <div>
      {getCss()}
      <button onClick={() => setCss(getCss() + 1)}>+</button>
      <button onClick={() => setCss(getCss() - 1)}>-</button>
      <h2>Welcome to Counter App with Global Store</h2>
      <Nested2 />
    </div>
  );
};

export const ReadWriteStore = () => {
  // const [open, setIsOpen] = createSignal(false);
  // <cssStore.Provider value={open() ? createSignal(2) : createSignal(50000)}>
  // <button onClick={() => setIsOpen(true)}>SetOpen</button>
  // Provider is one time only, its not dynamic
  return (
    <cssStore.Provider value={createSignal(2)}>
      <App2 />
    </cssStore.Provider>
  );
};

// ===deep nested context test===

const projectStore = createContext('global');
const DeepAnother = () => {
  return <>{useContext(projectStore)}</>;
};
const DeepNested = () => {
  const project = useContext(projectStore);
  return (
    <>
      <div>{project}</div>
      <projectStore.Provider value="DeepProject">
        <DeepAnother />
      </projectStore.Provider>
    </>
  );
};
const DeepApp = () => (
  <div>
    {useContext(projectStore)}
    <h2>Welcome to Counter App with Global Store</h2>
    <DeepNested />
  </div>
);

export const DeepNestedContextTest = () => {
  return (
    <projectStore.Provider value="globalProject">
      <DeepApp />
    </projectStore.Provider>
  );
};
const member_settings = createContext(createSignal({ email: 'k43@o-k.tech' }));
export const GlobalMemberStoreTest = () => {
  const [getMemberSeting, setMemberSeting] = useContext(member_settings);
  return (
    <div>
      <div>{getMemberSeting().email}</div>
      <button onClick={() => setMemberSeting({ email: 'new' })}>Change</button>
    </div>
  );
};
const [getMemberSeting, setMemberSeting] = createSignal({ email: 'k43@o-k.tech' });
export const GlobalDirectStoreTest = () => {
  return (
    <div>
      <div>{getMemberSeting().email}</div>
      <button onClick={() => setMemberSeting({ email: 'new' })}>Change</button>
    </div>
  );
};
