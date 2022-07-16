import {createUniqueId, JSX, splitProps} from "solid-js";
import {Field} from "./field";
import {css} from "solid-styled-components";

// https://tailwindui.com/components/application-ui/forms/textareas#component-4dfa34096e750fe0cc9a5086286bc441
export interface TextAreaProps
  extends JSX.InputHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  prefix?: string;
  suffix?: string;
  help?: string;
  error?: string;
}

// https://tailwindui.com/components/application-ui/forms/input-groups#component-1ef4d534fa0cbcb38331bafa5c352ff8
// https://tailwindcss.com/docs/hover-focus-and-other-states#form-states
export const TextArea = (props: TextAreaProps) => {
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
      label={props.label}
      id={uniqueId}
      help={props.help}
      error={props.error}
      required={props.required}
    >
      <div
        class={css`
          //;
        `}
      >
        <textarea
          name={p.label}
          id={uniqueId}
          class={css`
            //;
          `}
          {...customProps}
        />
      </div>
    </Field>
  );
};
