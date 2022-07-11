import { Icon } from "solid-heroicons";
import { xCircle } from "solid-heroicons/solid";
import { For, Show } from "solid-js";

interface ErrorListProps {
  title: string;
  errors: string[];
  class?: string;
}
export const ErrorList = (props: ErrorListProps) => {
  return (
    <Show when={!!props.errors.length}>
      <div class={`rounded-md bg-red-50 p-4 mb-2 ${props.class || ""}`}>
        <div class="flex">
          <div class="flex-shrink-0">
            <Icon
              path={xCircle}
              class="h-5 w-5 text-red-400"
              aria-hidden="true"
            />
          </div>
          <div class="ml-3">
            <h3 class="text-sm font-medium text-red-800">{props.title}</h3>
            <div class="mt-2 text-sm text-red-700">
              <ul role="list" class="list-disc pl-5 space-y-1">
                <For each={props.errors}>{(error) => <li>{error}</li>}</For>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Show>
  );
};
