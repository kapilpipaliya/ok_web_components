import { Accessor, JSX, onCleanup, onMount, Setter, Show } from "solid-js";
import { Icon } from "solid-heroicons";
import { x } from "solid-heroicons/solid";

interface SideOverProps {
  visible: Accessor<boolean>;
  setIsVisible: Setter<boolean>;
  children: JSX.Element;
  title: string;
}
// https://tailwindui.com/components/application-ui/overlays/slide-overs
// With background overlay
export const SideOver = (props: SideOverProps) => {
  const handleEscape = (e: KeyboardEvent) => {
    if (e.code === "Escape") {
      props.setIsVisible(false);
    }
  };
  onMount(() => {
    document.body.addEventListener("keyup", handleEscape);
  });
  onCleanup(() => {
    document.body.removeEventListener("keyup", handleEscape);
  });
  return (
    <Show when={props.visible()}>
      <div
        class="relative z-10"
        aria-labelledby="slide-over-title"
        role="dialog"
        aria-modal="true"
      >
        {/*  Background backdrop, show/hide based on slide-over state.*/}
        <div class="fixed inset-0"></div>

        <div class="fixed inset-0 overflow-hidden">
          <div class="absolute inset-0 overflow-hidden disabled-overlay">
            <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              {/*
                Slide-over panel, show/hide based on slide-over state.

                Entering: "transform transition ease-in-out duration-500 sm:duration-700"
                  From: "translate-x-full"
                  To: "translate-x-0"
                Leaving: "transform transition ease-in-out duration-500 sm:duration-700"
                  From: "translate-x-0"
                  To: "translate-x-full"
             */}
              <div class="pointer-events-auto w-screen max-w-md">
                <div class="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                  <div class="px-4 sm:px-6">
                    <div class="flex items-start justify-between">
                      <h2
                        class="text-lg font-medium text-gray-900"
                        id="slide-over-title"
                      >
                        {props.title}
                      </h2>
                      <div class="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          class="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          onclick={() => props.setIsVisible(false)}
                        >
                          <span class="sr-only">Close panel</span>
                          <Icon path={x} class="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div class="relative mt-6 flex-1 px-4 sm:px-6">
                    {/*  Replace with your content*/}
                    <div class="absolute inset-0 px-4 sm:px-6">
                      {props.children}
                    </div>
                    {/*  /End replace*/}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Show>
  );
};
