import { For, JSX, Show, splitProps } from "solid-js";
import { IFormControl } from "solid-forms";
import { TextInput, TextInputProps } from "./core/text_input";
import { Checkbox } from "./core/checkbox";
import {TextArea, TextAreaProps} from "./core/text_area";

export interface TextInputField extends TextAreaProps {
  control: IFormControl;
}

export function TextAreaField(props: TextInputField) {
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
      <TextArea
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
}
