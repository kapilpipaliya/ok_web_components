import { createEffect, createSignal, For, JSX, Show, splitProps } from "solid-js";
import { createFormControl} from "solid-forms";
import { createAsyncOptions, Select } from "@thisbeyond/solid-select";
import './select.css'

interface Option {
  [key: string]: any;

  id: string;
}

type SelectParams = Parameters<typeof Select>[0];

export interface SelectInputFieldProps extends Omit<SelectParams, 'options'> {
  control: ReturnType<typeof createFormControl>;
  fetchOptions: (inputValue: string) => Promise<any[]>;
  valueKey: string;
}

export function SelectInputField(props: SelectInputFieldProps) {
  const [p, customProps] = splitProps(props, ["control", "fetchOptions", "valueKey"]);

  const selectOptionProps = createAsyncOptions(p.fetchOptions);

  // normalize fetched Options
  const [normalizedAttributeSelectOptions, setNormalizedAttributeSelectOptions] = createSignal({});

  createEffect(() => {
    if (selectOptionProps.options) {
      setNormalizedAttributeSelectOptions(
        selectOptionProps.options.reduce((acc, curr) => {
          acc[curr.id] = curr;
          return acc;
        }, {})
      );
    }
  });

  return (
    <div
      classList={{
        "is-invalid": !!p.control.errors,
        "is-touched": p.control.isTouched,
        "is-required": p.control.isRequired,
        "is-disabled": p.control.isDisabled,
      }}
    >
      <Select
        {...selectOptionProps}
        initialValue={p.control.value}
        onChange={(value) => p.control.setValue(value)}
        onBlur={() => p.control.markTouched(true)}
        disabled={p.control.isDisabled || p.control.isReadonly}
        optionToValue={(option: Option) => {
          return option.id; // ["id"]
        }}
        format={(optionOrValue, type) => {
          // value is displayed in the input; option is displayed in the list
          if (type === "option") {
            return optionOrValue["properties"]["id"];
          } else {
            if (optionOrValue) {
              return normalizedAttributeSelectOptions()[optionOrValue]["properties"][p.valueKey];
            } else {
              return optionOrValue;
            }
          }
        }}
        {...customProps}
      />
      <Show when={p.control.isTouched && !p.control.isValid}>
        <For each={Object.values(p.control.errors)}>{(errorMsg: string) => <small>{errorMsg}</small>}</For>
      </Show>
    </div>
  );
}
