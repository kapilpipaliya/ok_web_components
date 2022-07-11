import { JSX, Show, mergeProps, For, splitProps } from "solid-js";
import { IFormControl } from "solid-forms";
import { TextInput, TextInputProps } from "./core/text_input";

export interface TextInputField
  extends TextInputProps,
    JSX.InputHTMLAttributes<HTMLInputElement> {
  control: IFormControl;
}

export function TextInputField(props: TextInputField) {
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
        {...(props.type === "checkbox"
          ? {
              checked: p.control.value,
              oninput: (e) => {
                p.control.setValue(e.currentTarget.checked);
              },
            }
          : {
              value: p.control.value,
              oninput: (e) => {
                p.control.setValue(e.currentTarget.value);
              },
            })}
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
}
