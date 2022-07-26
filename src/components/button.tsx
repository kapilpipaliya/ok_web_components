import { JSX, splitProps, createUniqueId, Show } from "solid-js";

export interface ButtonProps extends JSX.InputHTMLAttributes<HTMLButtonElement> {
  text: string;
  color: "primary" | "secondary";
  class?: string;
}

export const Button = (props: ButtonProps) => {

    const [p, customProps] = splitProps(props, [
        "text",
        "onclick",
        "color",
        "class"
    ]);
    const uniqueId = createUniqueId();
    return (
        <button
            type="button"
            className={"inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 " + p.class}

            // background-color: #4CAF50;
            // color: white;
            // padding: 14px 20px;
            // margin: 8px 0;
            // border: none;
            // border-radius: 4px;
            // cursor: pointer;
            classList={{
                "text-white bg-indigo-600 hover:bg-indigo-700": props.color == "primary",
                "text-indigo-700 bg-indigo-100 hover:bg-indigo-200": props.color == "secondary",
            }}
            onClick={p.onclick}
        >
            {p.text}
        </button>
    );
};
