import clsx from "clsx";
import { JSX, createEffect, createRoot, createSignal, onCleanup } from "solid-js";
import { createStore } from "solid-js/store";

export default {
  title: "SolidJs/Basic Reactivity/createEffect",
};
export const UseEffectExample = (props) => {
  const [state, setState] = createStore({ count: 0 });

  const timer = setInterval(() => {
    setState({ count: state.count + 1 });
  }, 1000);

  onCleanup(() => {
    clearInterval(timer);
  });

  createEffect(() => console.log(state.count));
  return <div>{state.count}</div>;
};

// https://github.com/ryansolid/solid/issues/39#issuecomment-506141532
//  Demo:
// DOM Lifecycles https://codesandbox.io/s/dom-lifecycle-u0gbd
// createFlipState https://codesandbox.io/s/createflipstate-f2m14
// createAnimation https://codesandbox.io/s/useanimation-l6dy0
export const CreateEffectTrackTest = () => {
  const [state, setState] = createStore({ show: false, work: "none" });
  const Toogle = () => setState({ show: !state.show });
  createEffect(() => {
    if (state.show) {
      console.log("testt..");
      setState({ work: "true" });
    }
  });
  return (
    <div class={clsx({ "foo-bar": state.show })}>
      {state.work}
      hello<button onClick={Toogle}>Toogle1</button>
    </div>
  );
};

const CreateEffectTestChild = (props: { content: number }) => {
  createEffect(() => {
    console.log(props.content);
  });

  return <div>hi</div>;
};

export const PropsChangeAndCreateEffect = (props: { n: number }) => {
  const [state, setState] = createStore({ count: 0 });
  const timer = setInterval(() => {
    setState({ count: state.count + 1 });
  }, 1000);

  onCleanup(() => {
    clearInterval(timer);
  });
  return (
    <div>
      <CreateEffectTestChild content={state.count} />
    </div>
  );
};

export const CreateEffectInitialValue = (props: { content: number }) => {
  createEffect((v) => {
    console.log(v);
  }, 10);

  return <div>hi</div>;
};

// Thank you so much. does createEffect only subscribe to the state variables which is called on first run?(edited)
// ryansolid07/28/2020
// No it subscribes on each run. So it is only subscribed to variables from the previous run.
// https://discord.com/channels/722131463138705510/722349143024205824/737503846779322389

// Test using memo in same memo works!
export const DynamicCreateEffect = () => {
  const [state, setState] = createStore({ show: false });
  const Toggle = () => setState({ show: !state.show });

  function createTemporaryEffect(predicate) {
    const [isEnabled, enableEffect] = createSignal(true);
    createEffect(() => isEnabled() && predicate());
    return () => enableEffect(false);
  }
  let disableFunction;
  const enableEffect = () => {
    disableFunction = createTemporaryEffect(() => {
      console.log(state.show);
    });
  };
  const disableEffect = () => {
    disableFunction && disableFunction();
  };
  return (
    <div>
      <button onClick={Toggle}>Toggle1</button>
      <button onClick={enableEffect}>Enable Effect</button>
      <button onClick={disableEffect}>Disable Effect</button>
    </div>
  );
};

export const DynamicCreateEffect2 = () => {
  const [state, setState] = createStore({ show: false });
  const Toggle = () => setState({ show: !state.show });

  // https://discord.com/channels/722131463138705510/722349143024205824/745091936850804816
  const createTemporaryEffect = (f) => {
    let stop;
    createRoot((dispose) => {
      stop = dispose;
      createEffect(f);
    });
    return stop;
  };
  // Or, another way without making a new API, just plain Solid API, for example:
  /*
  createRoot(stop => {
    createEffect(() => {
      if (!condition) stop()
      console.log(state.show)
    })
  })
  */

  let disableFunction;
  const enableEffect = () => {
    disableFunction = createTemporaryEffect(() => {
      console.log(state.show);
    });
  };

  const disableEffect = () => {
    disableFunction && disableFunction();
  };
  return (
    <div>
      <button onClick={Toggle}>Toggle1</button>
      <button onClick={enableEffect}>Enable Effect</button>
      <button onClick={disableEffect}>Disable Effect</button>
    </div>
  );
};
