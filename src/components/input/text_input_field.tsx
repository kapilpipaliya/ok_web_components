import { JSX, Show, mergeProps, For, splitProps } from "solid-js";
import { createFormControl, IFormControl } from "solid-forms";
import { TextInput, TextInputProps } from "./core/text_input";

export interface TextInputField
  extends TextInputProps,
    JSX.InputHTMLAttributes<HTMLInputElement> {
  control?: IFormControl<string>;
}

export const TextInputField = (props: TextInputField) => {
  // here we provide a default form control in case the user doesn't supply one
  props = mergeProps({ control: createFormControl(""), type: "text" }, props);
  const [p, customProps] = splitProps(props, ["control"]);
  return (
    <div
      classList={{
        "is-invalid": !!p.control.errors,
        "is-touched": p.control.isTouched,
        "is-required": p.control.isRequired,
        "is-disabled": p.control.isDisabled,
      }}
    >
      <TextInput
        value={p.control.value}
        oninput={(e) => {
          p.control.setValue(e.currentTarget.value);
        }}
        onblur={() => p.control.markTouched(true)}
        required={p.control.isRequired}
        disabled={p.control.isDisabled}
        {...customProps}
      />

      <Show when={p.control.isTouched && !p.control.isValid}>
        <For each={Object.values(p.control.errors)}>
          {(errorMsg: string) => <small>{errorMsg}</small>}
        </For>
      </Show>
    </div>
  );
};
