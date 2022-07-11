import { JSX, splitProps, createUniqueId } from "solid-js";
import { Field } from "./field";

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
      <div class="relative rounded-md shadow-sm">
        <textarea
          name={p.label}
          id={uniqueId}
          class="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm rounded-md
          disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
          invalid:border-red-300 invalid:text-red-600
          focus:invalid:border-red-500 focus:invalid:ring-red-500"
          classList={{
            "border-gray-300": !props.error,
            "border-red-300": !!props.error,
          }}
          {...customProps}
        />
      </div>
    </Field>
  );
};
