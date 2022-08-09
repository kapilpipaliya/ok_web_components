import { JSX, createEffect, createRoot, createSignal, onCleanup } from "solid-js";
import { createStore, produce, reconcile } from "solid-js/store";
import toPath from "lodash/toPath";

export default {
  title: "SolidJs/Stores/createStore",
};

export const Counter = () => {
  const [state, setState] = createStore({ count: 0 });

  const timer = setInterval(() => {
    setState({ count: state.count + 1 });
  }, 1000);

  onCleanup(() => {
    clearInterval(timer);
  });

  return <div>{state.count}</div>;
};

export const SameCreateStore1 = () => {
  const [state, setState] = createStore({ hello: { world: true } });

  const Toogle1 = () =>
    setState(
      "hello",
      produce<{ world: boolean }>((l) => {
        l.world = !l.world;
      })
    );
  const Toogle2 = () => setState("hello", "world", !state.hello.world);
  const w = "world";
  const Toogle3 = () => setState("hello", w, !state.hello.world);
  return (
    <div>
      <button onClick={Toogle1}>Toogle1</button>
      <button onClick={Toogle2}>Toogle2</button>
      <button onClick={Toogle3}>Toogle3</button>
      <br />
      {state.hello.world ? "true" : false}
    </div>
  );
};

export const SameCreateStore2 = () => {
  const [state, setState] = createStore({ hello: { world: [] as number[] } });

  const Toogle1 = () =>
    setState(
      "hello",
      produce<{ world: number[] }>((l) => {
        l.world1 = [1, 2, 3];
      })
    );
  const Toogle2 = () => setState("hello", "world2", [4, 5, 6]);
  const w = "world3";
  const Toogle3 = () => setState("hello", w, [7, 8, 9]);
  return (
    <div>
      {JSON.stringify(state)}
      <button onClick={Toogle1}>Toogle1</button>
      <button onClick={Toogle2}>Toogle2</button>
      <button onClick={Toogle3}>Toogle3</button>
    </div>
  );
};

export function Object1() {
  const [state, setState] = createStore({ firstName: "John", lastName: "Miller" });

  return (
    <div>
      {JSON.stringify(state)}
      {Object.keys(state).length}

      <button onClick={(e) => setState((state) => ({ preferredName: state.firstName, lastName: "Milner" }))}>Hello Button</button>
      <button onClick={(e) => setState((state) => ({ preferredName: undefined }))}>Hello Button</button>
    </div>
  );
}

export function ObjectStateModifyCustom() {
  const [state, setState] = createStore({ obj: { firstName: "John", lastName: "Miller" } });
  // https://discord.com/channels/722131463138705510/722349143024205824/739161611511660564
  return (
    <div>
      {JSON.stringify(state.obj)}
      {JSON.stringify(Object.keys(state.obj))}
      {Object.keys(state.obj).length}

      <button onClick={(e) => setState((state) => ({ obj: { preferredName: state.obj.firstName, lastName: "Milner" } }))}>Hello Button</button>
      <button onClick={(e) => setState((state) => ({ obj: { preferredName: undefined } }))}>Hello Button</button>
    </div>
  );
}

export const ReconcileExample = () => {
  const [state, setState] = createStore({ count: 0 });

  console.log(JSON.stringify(state));
  setState({ a: 4 });
  console.log(JSON.stringify(state));
  setState(reconcile({ y: 7 }));
  console.log(JSON.stringify(state));

  return <div>{state.count}</div>;
};

export const StateGettersExample = () => {
  const [state, setState] = createStore({
    firstName: "Jon",
    lastName: "Snow",
    get greeting() {
      return `You know nothing ${state.firstName} ${state.lastName}`;
    },
  });

  return (
    <div>
      {state.greeting}
      <button onClick={() => setState({ firstName: "New name" })}>Change First Name</button>
    </div>
  );
};

export const MergeStateWorks = () => {
  const [state, setState] = createStore({
    before: {
      firstName: "Jon",
      lastName: "Snow",
    },
  });
  const onClick = () => setState({ after: { address: "New Address" } });
  // This not display because it initially not tracked.
  return (
    <div>
      {state?.after?.address}
      <button onClick={onClick}>Change First Name</button>
    </div>
  );
};

export const NestedSetStateExample = () => {
  // https://discord.com/channels/722131463138705510/722349143024205824/746391485296934983
  const [state, setState] = createStore({ a: { b: { c: { d: 1 } } } });

  // replace non-object values
  const onClick1 = () => setState("a", "b", "c", "d", 1);

  // replace with non-object values as a function
  const onClick2 = () => setState("a", "b", "c", "d", (d) => 2);

  // merge with object
  const onClick3 = () => setState("a", "b", "c", { d: 3 });

  // merge with object from a function
  const onClick4 = () => setState("a", "b", "c", (c) => ({ d: 4 }));

  // my
  const onClick5 = () => setState("a", ...["b", "c"], { d: 5 });
  const onClick6 = () => setState("a", ...["b", "c", "d"], 6);
  const onClick7 = () => setState("a", ...toPath("b.c.d"), 7);
  const onClick8 = () => setState("a", ...toPath("b.c.d"), [{ name: "fine" }, { name: "world" }]);
  const onClick9 = () => setState("a", ...toPath("b.c.d[1].name"), "second");
  const onClick10 = () => setState("a", "b", "c", { d: 3, e: 5 });
  const onClick11 = () => setState("a", "b", "c", { f: 6, g: 7, e: 8 }); // merge! great
  const onClick12 = () => setState("a", "b", { c: {} }); // clear!
  const onClick13 = () => setState("a", "b", "c", [9, 10, 11, 12]); // merge! great
  const onClick14 = () => setState("a", "b", "c", [13, 14, 15, ...state.a.b.c]); // merge! great

  return (
    <div>
      {state.a.b.c.d}
      {JSON.stringify(state)}
      <button onClick={onClick1}>onClick1</button>
      <button onClick={onClick2}>onClick2</button>
      <button onClick={onClick3}>onClick3</button>
      <button onClick={onClick4}>onClick4</button>
      <button onClick={onClick5}>onClick5</button>
      <button onClick={onClick6}>onClick6</button>
      <button onClick={onClick7}>onClick7</button>
      <button onClick={onClick8}>onClick8</button>
      <button onClick={onClick9}>onClick9</button>
      <button onClick={onClick10}>onClick10</button>
      <button onClick={onClick11}>onClick11</button>
      <button onClick={onClick12}>onClick12</button>
      <button onClick={onClick13}>onClick13</button>
      <button onClick={onClick14}>onClick14</button>
    </div>
  );
};

// can I pass partial state to different function and keep its reactivity?
// yes but the reactivity is on property access.. so either pass the parent or wrap it in a get function

// https://discord.com/channels/722131463138705510/722349143024205824/746965943640522772
// overwrapping is the biggest bottleneck in reactive libraries and most library's patterns promote it.

// https://discord.com/channels/722131463138705510/722349143024205824/725771481933545514
// setState("list", newList) // newList becomes the new array
// setState("list", 0, item) // we just replace item at index 0

// errors: {}, touched: {} // not good // never maintain state separately
// fields: [{error: '', touched: ''}, ...] // good
