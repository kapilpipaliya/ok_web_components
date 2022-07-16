import { For, JSX, Show, splitProps } from "solid-js";
import { IFormControl } from "solid-forms";
import { TextInput, TextInputProps } from "./core/text_input";
import { Checkbox } from "./core/checkbox";


export interface TextInputField
  extends TextInputProps,
    JSX.InputHTMLAttributes<HTMLInputElement> {
  control: IFormControl;
}

export function TextInputField(props: TextInputField) {
  const [p, customProps] = splitProps(props, ["control"]);

  const Text = () => (
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
  );
  const Bool = () => (
    <Checkbox
      checked={p.control.value}
      oninput={(e) => {
        p.control.setValue(e.currentTarget.checked);
      }}
      onblur={() => p.control.markTouched(true)}
      required={p.control.isRequired}
      disabled={p.control.isDisabled}
      {...customProps}
    />
  );
  return (
    <div
      classList={{
        "is-invalid": !!p.control.errors,
        "is-touched": p.control.isTouched,
        "is-required": p.control.isRequired,
        "is-disabled": p.control.isDisabled,
      }}
    >
      <Show when={props.type === "checkbox"} fallback={<Text />}>
        <Bool />
      </Show>

      <Show when={p.control.isTouched && !p.control.isValid}>
        <For each={Object.values(p.control.errors)}>
          {(errorMsg: string) => <small>{errorMsg}</small>}
        </For>
      </Show>
    </div>
  );
}
