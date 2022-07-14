import { JSX, splitProps, createUniqueId, Show } from "solid-js";

import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  InputLeftAddon,
  InputRightAddon,
  InputGroup
} from "@hope-ui/solid"

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
    <FormControl
      label={p.label}
      id={uniqueId}
      help={p.help}
      error={p.error}
      required={customProps.required}
    >
      <FormLabel for={uniqueId}>{p.label}</FormLabel>
      <div class="relative rounded-md shadow-sm">
        <Show when={p.prefix}>
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span class="text-gray-500 sm:text-sm"> {p.prefix} </span>
          </div>
        </Show>

        <InputGroup size="md" variant="outline">
          <Show when={p.prefix}>
            <InputLeftAddon>{p.prefix}</InputLeftAddon>
          </Show>
          <Input
            type="text"
            name={p.label}
            id={uniqueId}
            {...customProps}
          />
          <Show when={p.suffix}>
            <InputRightAddon>{p.suffix}</InputRightAddon>
          </Show>
          <Show
            when={p.error}
            fallback={
              <FormHelperText>
                {p.help}
              </FormHelperText>
            }
          >
            <FormErrorMessage>{p.error}</FormErrorMessage>
          </Show>

        </InputGroup>
      </div>
    </FormControl>
  );
};
