// Taken from https://tailwindui.com/components/application-ui/feedback/alerts
export const SuccessAlert = (message: string) => {
  return (
    <div class="rounded-md bg-green-50 p-4">
      <div class="flex">
        <div class="flex-shrink-0">
          <svg
            class="h-5 w-5 text-green-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <div class="ml-3">
          <div class="text-sm text-green-700">
            <p>{message}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
import { Icon } from "solid-heroicons";
import { xCircle } from "solid-heroicons/solid";
import { For, Show } from "solid-js";

interface ErrorListProps {
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
            <h3 class="text-sm font-medium text-red-800">Submit</h3>
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
