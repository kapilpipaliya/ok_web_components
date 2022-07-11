import { createUniqueId, JSX, Show, splitProps } from "solid-js";
import "./TrivalentSwitch.css";

interface TrivalentSwitchProps
  extends Omit<JSX.InputHTMLAttributes<HTMLInputElement>, "value"> {
  value?: boolean;
  setValue?: (value: boolean | undefined) => void;
  label: string;
  description?: string;
  error?: string;
}

export const TrivalentSwitch = (props: TrivalentSwitchProps) => {
  const handleCheckboxClick = () => {
    // e.preventDefault(); // dont use e.preventDefault(), otherwise checkbox visual appearance will not change.
    if (props.value === false) {
      props.setValue?.(undefined);
    } else if (props.value === undefined) {
      props.setValue?.(true);
    } else {
      props.setValue?.(false);
    }
    if (!props.setValue) {
      console.warn("Props.setValue must be passed to change the value.");
    }
  };

  const [p, customProps] = splitProps(props, [
    "label",
    "description",
    "value",
    "error",
  ]);
  const uniqueId = createUniqueId();
  return (
    <>
      <label class="cursor-pointer flex items-center justify-between mb-2">
        <div class="text-sm">
          <span class="font-medium text-gray-700">{p.label}</span>
          <p id={`${uniqueId}-description`} class="text-gray-500">
            {p.description}
          </p>
          <Show when={p.error}>
            <p class="mt-2 text-sm text-red-600">{p.error}</p>
          </Show>
        </div>
        <input
          checked={props.value === true}
          // @ts-ignore
          indeterminate={props.value === undefined}
          {...customProps}
          type="checkbox"
          class="custom-toggle custom-toggle-accent"
          onclick={handleCheckboxClick}
        />
      </label>
    </>
  );
};
