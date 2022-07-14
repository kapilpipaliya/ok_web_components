import { createUniqueId, JSX, Show, splitProps } from "solid-js";
import { 
  CheckboxPrimitive,
  CheckboxPrimitiveIndicator,
  Checkbox as UICheckbox, 
  CheckboxGroup,
  HStack,
  VStack,
  Text,
  Center
} from "@hope-ui/solid"

export interface CheckboxProps
  extends JSX.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  description?: string;
  error?: string;
}

export const Checkbox = (props: CheckboxProps) => {
  const [p, customProps] = splitProps(props, ["label", "description", "error", "checked"]);
  const uniqueId = createUniqueId();
  return (

   
                  // <CheckboxPrimitiveIndicator>
                    <UICheckbox display="block" boxSize="$4"  />
                  // </CheckboxPrimitiveIndicator>
               
    // <div class="relative flex items-start">
    //   <div class="flex items-center h-5">
    //     <input
    //       {...customProps}
    //       id={uniqueId}
    //       // aria-describedby="comments-description"
    //       name={uniqueId}
    //       type="checkbox"
    //       class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
    //     />
    //   </div>
    //   <div class="ml-3 text-sm">
    //     <label html-for={uniqueId} class="font-medium text-gray-700">
    //       {p.label}
    //     </label>
    //     <p id={`${uniqueId}-description`} class="text-gray-500">
    //       {p.description}
    //     </p>
    //     <Show when={p.error}>
    //       <p class="mt-2 text-sm text-red-600">{p.error}</p>
    //     </Show>
    //   </div>
    // </div>
  );
};
