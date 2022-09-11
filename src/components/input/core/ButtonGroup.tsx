import { JSX, For, splitProps } from "solid-js";
import {ButtonItem} from "../Form";


const Button = (props: ButtonItem) => {
  const [selectedProps, customProps] = splitProps(props, ["children"]);

  return <ui5-button {...customProps}>{selectedProps.children}</ui5-button>;
};

interface ButtonGroupProps {
  items: ButtonItem[];
}

export const ButtonGroup = (props: ButtonGroupProps) => {
  return <div><For each={props.items}>{(button) => <Button {...button} />}</For></div>;
};
