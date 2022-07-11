import { JSX, splitProps, createUniqueId, Show } from "solid-js";
import { Field } from "./field";

// https://tailwindui.com/components/application-ui/forms/input-groups#component-1a20b7fee66274173ad5ed756fabb335
export interface InputWithAddOnProps
  extends JSX.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  prefix?: string;
  suffix?: string;
  help?: string;
  error?: string;
}

// https://tailwindui.com/components/application-ui/forms/input-groups#component-1ef4d534fa0cbcb38331bafa5c352ff8
// https://tailwindcss.com/docs/hover-focus-and-other-states#form-states
// InputWithInlineLeadingAndTrailing
export const TextInput = (props: InputWithAddOnProps) => {
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
        <Show when={p.prefix}>
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span class="text-gray-500 sm:text-sm"> {p.prefix} </span>
          </div>
        </Show>
        <input
          type="text"
          name={p.label}
          id={uniqueId}
          class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm rounded-md
          disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
          invalid:border-red-300 invalid:text-red-600
          focus:invalid:border-red-500 focus:invalid:ring-red-500"
          classList={{
            "pl-7": !!props.prefix,
            "pr-12": !!props.suffix,
            "border-gray-300": !props.error,
            "border-red-300": !!props.error,
          }}
          {...customProps}
        />
        <Show when={p.suffix}>
          <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span class="text-gray-500 sm:text-sm" id="price-currency">
              {p.suffix}
            </span>
          </div>
        </Show>
      </div>
    </Field>
  );
};
