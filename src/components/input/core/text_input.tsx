import { createUniqueId, JSX, Show, splitProps } from "solid-js";
import { Field } from "./field";
import { css } from "solid-styled-components";

export interface TextInputProps
  extends JSX.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  prefix?: string;
  suffix?: string;
  help?: string;
  error?: string;
}

export const TextInput = (props: TextInputProps) => {
  const [p, customProps] = splitProps(props, [
    "label",
    "prefix",
    "suffix",
    "help",
    "error",
  ]);
  const uniqueId = createUniqueId();
  return (
    <Field
      label={p.label}
      id={uniqueId}
      help={p.help}
      error={p.error}
      required={customProps.required}
    >
      <div
        class={css`
          //relative rounded-md shadow-sm;
        `}
      >
        <Show when={p.prefix}>
          <div
            class={css`
              //absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none;
            `}
          >
            <span
              class={css`
                //text-gray-500 sm:text-sm;
              `}
            >
              {" "}
              {p.prefix}{" "}
            </span>
          </div>
        </Show>
        <input
          type="text"
          name={p.label}
          id={uniqueId}
          class={css`
            //focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm rounded-md
            //          disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
            //          invalid:border-red-300 invalid:text-red-600
            //          focus:invalid:border-red-500 focus:invalid:ring-red-500"

            font-size: 18px;
            padding: 10px;
            margin: 10px;
            background: papayawhip;
            border: none;
            border-radius: 3px;
            ::placeholder {
              color: palevioletred;
            }
          `}
          classList={{
            "pl-7": !!props.prefix,
            "pr-12": !!props.suffix,
            "border-gray-300": !props.error,
            "border-red-300": !!props.error,
          }}
          {...customProps}
        />
        <Show when={p.suffix}>
          <div
            class={css`
              //absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none;
            `}
          >
            <span
              class={css`
                //text-gray-500 sm:text-sm" id="price-currency;
              `}
            >
              {p.suffix}
            </span>
          </div>
        </Show>
      </div>
    </Field>
  );
};
