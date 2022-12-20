import { For, JSX, Show, splitProps } from "solid-js";
import { IFormControl } from "solid-forms";
import { TextInput, TextInputProps } from "./core/text_input";

export interface TextInputFieldProps extends TextInputProps {
  control: IFormControl;
}

export function TextInputField(props: TextInputFieldProps) {
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
        disabled={p.control.isDisabled || p.control.isReadonly}
        {...customProps}
      />

      <Show when={p.control.isTouched && !p.control.isValid && p.control.errors}>
        <For each={Object.values(p.control.errors!)}>{(errorMsg: string) => <small>{errorMsg}</small>}</For>
      </Show>
    </div>
  );
}
