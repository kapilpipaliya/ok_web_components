import { JSX, onCleanup, Switch, Match, Suspense, useTransition } from "solid-js";
import { createStore, reconcile } from "solid-js/store";

export default {
  title: "SolidJs/Control Flow/Suspense",
};

export const Transition = () => {
  const [state, setState] = createStore({ activeTab: 1 });

  return (
    <div>
      <ul>
        <li onClick={() => setState({ activeTab: 1 })}>Tab1</li>
        <li onClick={() => setState({ activeTab: 2 })}>Tab2</li>
        <li onClick={() => setState({ activeTab: 3 })}>Tab3</li>
      </ul>
      <Suspense fallback={<div>Loading.....</div>}>
        <Switch>
          <Match when={state.activeTab === 1}>
            <h1>1...</h1>
          </Match>
          <Match when={state.activeTab === 2}>
            <h1>2...</h1>
          </Match>
          <Match when={state.activeTab === 3}>
            <h1>3...</h1>
          </Match>
        </Switch>
      </Suspense>
    </div>
  );
};

export const Transition2 = () => {
  const [state, setState] = createStore({ tab: 0 });
  const [pending, start] = useTransition({ timeoutMs: 1200 });
  const updateTab = (index) => () => start(() => setState("tab", index));

  return (
    <>
      <ul class="inline">
        <li classList={{ selected: state.tab === 0 }} onClick={updateTab(0)}>
          Uno
        </li>
        <li classList={{ selected: state.tab === 1 }} onClick={updateTab(1)}>
          Dos
        </li>
        <li classList={{ selected: state.tab === 2 }} onClick={updateTab(2)}>
          Tres
        </li>
      </ul>
      <div class="tab">
        <Suspense fallback={<div>h</div>}>
          <Switch>
            <Match when={state.tab === 0}>
              <AsyncChild page="Uno" pending={pending()} />
            </Match>
            <Match when={state.tab === 1}>
              <AsyncChild page="Dos" pending={pending()} />
            </Match>
            <Match when={state.tab === 2}>
              <AsyncChild page="Tres" pending={pending()} />
            </Match>
          </Switch>
        </Suspense>
      </div>
    </>
  );
};
