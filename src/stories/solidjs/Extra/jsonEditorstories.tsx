import { JSX, For } from "solid-js";
import { createStore } from "solid-js/store";
import JSONEditor, { JSONEditorOptions } from "jsoneditor";
import "jsoneditor/dist/jsoneditor.css";

export default { title: "SolidJs/Extra/JsonEditor" };

export const JsonEditorRyansolid1 = () => {
  const createEditor = (el) => new JSONEditor(el, {}, "");
  return <div ref={createEditor} />;
};
export const JsonEditorRyansolidOptions = () => {
  let jsoneditor;
  const options: JSONEditorOptions = {
    mode: "code",
    modes: ["code", "tree"],
  };
  const createEditor = (el) => new JSONEditor(el, options, "");
  return (
    <div>
      <div ref={createEditor} />
    </div>
  );
};
export const JsonEditorRyansolid2 = () => {
  return <div ref={(el) => new JSONEditor(el, {}, "")} />;
};

// I like this better:
export const JsonEditorTrusktrLike = () => {
  const el = <div />;
  new JSONEditor(el, {}, "");
  return el;
};
// And here is another way, in case the element is nested inside other elements:
export const JsonEditorTrusktrNested = () => {
  let el;
  const menu = (
    <menu>
      <div>
        <div ref={el} />
      </div>
    </menu>
  );
  new JSONEditor(el, {}, "");
  return menu;
};

// And just to circle back to the original function approach that Ryan mentioned, but with nested elements:
export const JsonEditorTrusktrNested2 = () => {
  const createEditor = (el) => new JSONEditor(el, {}, "");
  return (
    <menu>
      <div>
        <div ref={createEditor} />
      </div>
    </menu>
  );
};

// So which one is better (syntax wise) depends on what the situation is (functionally they are the same). ￼(edited)
// The best part is that the JSX expressions return actual DOM nodes! So just so you know, this is true:

// const el = <div />
// console.log(el instanceof HTMLDivElement) // true!
// $(el).css({'color': 'pink'}) // pass it to jQuery if you want to, etc.

// The results aren't virtual nodes like with React or other JSX-based tools. With Solid it is just DOM, which is awesome.(edited)
// You can even do this:
export const JsonEditorTrusktrNested3 = () => {
  let el;
  const menu = (
    <menu>
      <div>{(el = <div />)}</div>
    </menu>
  );
  new JSONEditor(el, {}, "");
  return menu;
};
// or
export const JsonEditorTrusktrNested4 = () => {
  const el = <div />;
  const menu = (
    <menu>
      <div>{el}</div>
    </menu>
  );
  new JSONEditor(el, {}, "");
  return menu;
};

// Though in that case (interpolating variables, like with {el}), @ryansolid might tell you that it is slightly slower performance (but probably not something you're ever gonna notice or ever need to worry about)(edited)

// For that matter, you can even do the following for example, just to give you an idea:
export const JsonEditorTrusktrNested5 = () => {
  const el = document.createElement("div"); // not even using Solid JSX here.
  const menu = (
    <menu>
      <div>{el}</div>
    </menu>
  );
  new JSONEditor(el, {}, "");
  return menu;
};
// Because it's just DOM! It is way better than all the vdom JSX libs like React, Preact, etc (in my opinion).
// ryansolid:
// I mean sure.. instead of inserting your DOM node directly it calls a function that first checks it is in fact a DOM node (instanceof Node), then it inserts it. I wouldn't give that any consideration

export const HtmlBase = (props: {}) => {
  let el;
  const comp = <div>{(el = <div />)}</div>;
  el.insertAdjacentHTML("afterend", "<b>hello world</b>");
  return comp;
};
/* Not work:
    const HtmlBase2 = (props: {}) => {
    props.ref(el => {
        el.insertAdjacentHTML('afterend', '<b>hello world</b>')
    })

    console.log(props.ref)
    return <></>
    }
    export const HtmlBase3 = (props: {}) => {
    return <div>hello<HtmlBase2 ref={el=>fn=> fn(el)}/></div>
    }
*/
export const HtmlBase2 = (props: { value: string }) => {
  const el: Element = <div />;
  el.innerHTML = "<b>hello world</b>";
  return el;
};
export const ElementWithCss = () => {
  const createEditor = (el) => (el.style.color = "purple");
  return <div ref={createEditor}>example</div>;
};
