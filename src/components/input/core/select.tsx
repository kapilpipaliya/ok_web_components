import { createSignal, For, JSX, JSXElement, Match, onCleanup, onMount, Show, Switch } from "solid-js";
import "./select.css";
import { css } from "solid-styled-components";
import { createStore, produce } from "solid-js/store";

export type SelectOption = {
  text: string;
  value: string | number;
  innerHtml?: () => JSXElement | undefined;
  selected?: boolean;
  hide?: boolean;
};

export interface SlimSelectProps {
  id?: string;
  //   expectedOptionsHeightInPx?: number | undefined;
  options: SelectOption[];
  multiSelect?: boolean;
  setValueHandler?: (value: SelectOption | SelectOption[]) => void;
  disabled?: boolean;
  addable?: boolean;
  doNotCloseOnScrollOut?: boolean;
  configOption?: { showOptionsBelow?: boolean };
  onKeyUp?: JSX.EventHandlerUnion<HTMLElement, KeyboardEvent>;
  customOptionValueValidator?: (value: string) => string;
  handleKeyDown?: (event: KeyboardEvent, value: SelectOption | SelectOption[]) => void;
}

export const Select = (args: SlimSelectProps) => {
  const [getOptions, setOptions] = createStore({
    options: [] as SelectOption[],
  });
  const [display, setDisplay] = createSignal(false);

  const [searchKeyword, setSearchKeyword] = createSignal({ searchKeyword: "" });

  // perfect
  const toggleDisplay = () => {
    setDisplay((prev) => !prev);

    if (display()) {
      document.getElementById("slim_select_search_box")?.focus();
    }
  };

  /*const onOptionChange = (option) => {
    if (args?.fetchOptions?.onChange) {
      args.fetchOptions.onChange({
        id: args.fieldId,
        option,
      });
    }
  };*/

  // perfect
  const addCustomOption = (option: { text: string; value: string }) => {
    setOptions(
      "options",
      produce((options: SelectOption[]) => {
        options.push({
          selected: true,
          text: option.text,
          value: option.value,
          hide: false,
          innerHtml: () => "",
        });
      })
    );

    //onOptionChange(option);
    clearFilter();
    triggerSelection();

    /*if (args.onKeyUpSelect) {
      args.onKeyUpSelect({
        code: "Enter",
        target: {
          value: option,
        },
      });
    }*/
  };

  const addOption = (option: SelectOption) => {
    setOptions(
      "options",
      produce((options: SelectOption[]) =>
        options.push({
          selected: option.selected || false,
          text: option.text,
          value: option.value,
          hide: false,
          innerHtml: option.innerHtml,
        })
      )
    );
  };

  // perfect
  const getSelectedValue = () => {
    const selectedOptions = getOptions.options.filter((option) => option.selected === true);
    const value = selectedOptions.map((selectedOption) => {
      return {
        value: selectedOption.value,
        text: selectedOption.text,
      };
    });

    if (args.multiSelect === true) {
      return value;
    } else {
      return value[0];
    }
  };

  // perfect
  const triggerSelection = () => {
    if (args.setValueHandler) {
      return args.setValueHandler(getSelectedValue());
    }
  };

  // perfect
  const clearFilter = () => {
    setOptions(
      "options",
      produce((options: SelectOption[]) => options.forEach((option) => (option.hide = false)))
    );
  };

  // perfect
  const selectValue = (newOption: { text: string; value: string }, event: MouseEvent) => {
    if (args.multiSelect) {
      setOptions(
        "options",

        (option) => option.value === newOption.value,

        produce((option) => (option.selected = true))
      );
    } else {
      setOptions(
        "options",

        produce((options: SelectOption[]) => {
          options.map((option) => {
            if (option.value === newOption.value) {
              option.selected = true;
            } else {
              option.selected = false;
            }
          });
        })
      );
    }
    clearFilter();
    triggerSelection();
  };

  // perfect
  const deSelectValue = (newOption: { text: string; value: string }, event: MouseEvent) => {
    setOptions(
      "options",

      (option) => option.value === newOption.value,

      produce((option) => (option.selected = false))
    );
    clearFilter();
    triggerSelection();
  };

  // perfect
  const handleOptionClick = (event: MouseEvent) => {
    event.stopPropagation();

    toggleDisplay();
  };

  // perfect
  const preventPropagate = (event: MouseEvent) => {
    event.stopPropagation();
  };

  // perfect
  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.code === "Escape") {
      setDisplay(false);
    }
  };

  // perfect
  let slimOptions: HTMLDivElement;
  const closeOptions = (e) => {
    if (slimOptions) {
      const outCheck = 0;
      const rect = slimOptions.getBoundingClientRect();
      if (
        !args.doNotCloseOnScrollOut &&
        (e.clientX - rect.left < outCheck || e.clientY - rect.top < outCheck || rect.right - e.clientX < outCheck || rect.bottom - e.clientY < outCheck)
      ) {
        setOptions("options", {}, (option) => ({ hide: false }));
        setDisplay(false);
      }
    }
  };

  // perfect
  const removeSelectedOption = () => {
    setOptions(
      "options",

      produce((options: SelectOption[]) => options.forEach((option) => (option.selected = false)))
    );
  };

  // perfect
  const clearSelection = (e: MouseEvent) => {
    setDisplay(false);

    setOptions(
      "options",

      produce((options: SelectOption[]) => options.forEach((option) => (option.selected = false)))
    );

    e.stopPropagation();
    triggerSelection();
  };

  // perfect
  const handleKeyDown = (event: KeyboardEvent) => {
    if (args.handleKeyDown) {
      const value = getSelectedValue();
      args.handleKeyDown(event, value);
    }
  };

  // perfect
  const setSearchKeywordOnChange = (event) => {
    setSearchKeyword({ searchKeyword: event.target.value || "" });
  };

  // perfect
  const filterKeyword = (event: InputEvent) => {
    const keyword = ((event.target as HTMLInputElement).value || "").toLowerCase();

    setOptions("options", {}, (option) => ({
      hide: !((option.text || "").toLowerCase().includes(keyword) || (`${option.value}` || "").toLowerCase().includes(keyword)),
    }));
  };

  // perfect
  args.options?.forEach((option: SelectOption) => {
    addOption(option);
  });

  // Below, logic handles close on pressing escape key anywhere on the screen
  let listener;
  onMount(() => {
    listener = document.body.addEventListener("keyup", handleKeyPress);
  });

  onCleanup(() => {
    document.body.removeEventListener("keyup", listener);
  });

  const onClickOutSide = (el, accessor) => {
    const onClick = (e) => !el.contains(e.target) && accessor()?.();
    document.body.addEventListener("click", onClick);
    onCleanup(() => document.body.removeEventListener("click", onClick));
  };

  return (
    <>
      <div
        // @ts-ignore
        use:onClickOutSide={() => setDisplay(false)}
        class={css`
          //ss_main;
        `}
        disabled={args.disabled}
        tabindex={0}
        onKeyDown={handleKeyDown}
        onClick={handleOptionClick}
      >
        <div
          classList={{
            ss_multi_selected: true,
            ss_disabled: args.disabled,
          }}
        >
          <div
            class={css`
              //ss_values;
            `}
            onkeyup={args.onKeyUp}
          >
            <For each={getOptions.options}>
              {(option) => (
                <Show when={option.selected === true}>
                  <div
                    class={css`
                      //ss_value;
                    `}
                  >
                    <span
                      class={css`
                        //ss_values_text;
                      `}
                    >
                      {option.text}
                    </span>
                    <span
                      class={css`
                        //ss_value_delete;
                      `}
                      onClick={[deSelectValue, option]}
                    >
                      x
                    </span>
                  </div>
                </Show>
              )}
            </For>
          </div>
          <div
            class={css`
              //ss_add;
            `}
            onclick={clearSelection}
          >
            <span classList={{ ss_plus: true, ss_cross: true }}></span>
          </div>
        </div>

        <Show when={display() === true}>
          <div ref={slimOptions} classList={{ ss_content: true, ss_open: true }} onmouseout={closeOptions}>
            <div
              class={css`
                //ss_search;
              `}
            >
              <input
                type="search"
                id="slim_select_search_box"
                placeholder="Search"
                tabindex="0"
                aria-label="Search"
                onClick={preventPropagate}
                onChange={setSearchKeywordOnChange}
                onInput={filterKeyword}
                autocapitalize="off"
                autocomplete="off"
              />
              <Show when={args.addable}>
                <div
                  class={css`
                    //ss_addable;
                  `}
                  onClick={() => {
                    if (!args.multiSelect) {
                      removeSelectedOption();
                    }

                    let value = searchKeyword().searchKeyword;

                    if (args.customOptionValueValidator) {
                      value = args.customOptionValueValidator(value);
                    }

                    if (value) {
                      addCustomOption({
                        text: value,
                        value: value,
                      });
                    }
                  }}
                >
                  <svg
                    aria-hidden="true"
                    class={css`
                      //w-3 h-3 text-primary;
                    `}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                  >
                    <path
                      fill="currentColor"
                      d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"
                    ></path>
                  </svg>
                </div>
              </Show>
            </div>
            <div
              class={css`
                //ss_list" role="listbox;
              `}
            >
              <For each={getOptions.options}>
                {(option, i) => (
                  <div
                    class={css`
                      //ss_value;
                    `}
                  >
                    <div
                      classList={{
                        ss_option: true,
                        ss_hide: option?.hide,
                        ss_disabled: option.selected,
                        ss_option_selected: option.selected,
                      }}
                      role="option"
                      onClick={[selectValue, option]}
                    >
                      <Switch fallback={option.text}>
                        <Match when={option.innerHtml}>
                          <p>{option.innerHtml()}</p>
                        </Match>
                      </Switch>
                    </div>
                  </div>
                )}
              </For>
            </div>
          </div>
        </Show>
      </div>
    </>
  );
};
