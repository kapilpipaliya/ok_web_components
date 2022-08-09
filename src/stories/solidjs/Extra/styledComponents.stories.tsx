import { JSX, createSignal } from "solid-js";
import { createStore, reconcile } from "solid-js/store";
import { styled } from "solid-styled-components";
import { css } from "goober";

export default {
  title: "SolidJs/Extra/Styled",
};

const Div = styled("div")`
  color: red;
  font-size: 32px;
  padding: 5px;
  border: 2px solid black;
  background-color: purple;
`;

const StyledDiv = styled(Div)`
  background-color: lightblue;
  font-weight: ${(props) => (props.bold ? "bold" : 100)};
`;

// https://codesandbox.io/s/solid-styled-components-yv2t1?file=/index.js:0-663
export const StyledExample = () => {
  const [state, setState] = createStore({ name: "Solid", bold: true });

  return (
    <StyledDiv onClick={() => setState("bold", (b) => !b)} bold={state.bold}>
      Hello {state.name}
    </StyledDiv>
  );
};

// https://codesandbox.io/s/solid-styled-jsx-xgx6b
function Button() {
  const [isLoggedIn, login] = createSignal(false);
  return (
    <>
      <button class="button" onClick={() => login(!isLoggedIn())}>
        {isLoggedIn() ? "Log Out" : "Log In"}
      </button>
      <style jsx dynamic>
        {`
          .button {
            background-color: ${isLoggedIn() ? "blue" : "green"};
            color: white;
            padding: 20px;
            margin: 10px;
          }
        `}
      </style>
    </>
  );
}
// Bug?: when sencond button change it effect first button too.
export const StyledJsxExample = () => (
  <div>
    <Button />
    <Button />
  </div>
);

// css(taggedTemplate)
// @returns {String} Returns the className.
// To create a className, you need to call css with your style rules in a tagged template.

const BtnClassName = css`
  border-radius: 4px;
`;

// vanilla JS
// const btn = document.querySelector("#btn");
// btn.classList.add(BtnClassName);

// JSX
// BtnClassName === 'g016232'
export const ClassNameExample = () => <button class={BtnClassName}>click</button>;
// Different ways of customizing css
// Passing props to css tagged templates
const CustomButton = (props) => (
  <button
    class={css`
      border-radius: ${props.size}px;
    `}
  >
    click
  </button>
);
export const CustomButtonExample = () => <CustomButton size={20}>click</CustomButton>;
// Using css with JSON/Object
const BtnClassName2 = (props) =>
  css({
    background: props.color,
    borderRadius: `${props.radius}px`,
  });
// Notice: using css with object can reduce your bundle size.
export const CSSWrapperExampleObject = () => <button class={BtnClassName2({ radius: 20, color: "green" })}>click</button>;
export const CSSWrapperExampleObject2 = () => {
  const [size, setSize] = createSignal(20);
  return (
    <div>
      <button class={BtnClassName2({ radius: size(), color: "green" })}>click</button>
      <button onClick={() => setSize(size() + 1)}>Increase</button>
    </div>
  );
};

// We also can declare the styles at the top of the file by wrapping css into a function that we call to get the className.
const BtnClassName3 = (props) => css`
  border-radius: ${props.size}px;
`;

// vanilla JS
// BtnClassName({size:20}) -> g016360
// const btn = document.querySelector('#btn');
// btn.classList.add(BtnClassName3({ size: 20 }));

// JSX
// BtnClassName({size:20}) -> g016360
export const CSSWrapperExample = () => <button class={BtnClassName3({ size: 20 })}>click</button>;

const CenterDiv = styled(Div)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
export const CenterExample = () => <CenterDiv>Hello Br</CenterDiv>;
