import { JSX, batch, createEffect, createMemo, createSignal, createUniqueId, For, getOwner, runWithOwner, Show, splitProps, Switch, Match } from "solid-js";
import { TextInput } from "./core/text_input";
import { BooleanInputField } from "./boolean_input_field";
import { Button } from "../button";
import { TextInputField } from "./text_input_field";

import { bindOwner, createFormArray, createFormControl, createFormGroup, IFormControl, IFormControlOptions, IFormGroup } from "solid-forms";
import { closestCenter, createSortable, DragDropProvider, DragDropSensors, DragEventHandler, SortableProvider } from "@thisbeyond/solid-dnd";
import { css } from "solid-styled-components";
import { getDefaultValue } from "../../utils/form";
import { SelectInputField } from "./select_input_field";
import {FieldAttribute, Id, SelectField, TableField, FormToIdMap, TableFieldAttributes} from "./Form";
import { klona } from "klona";
import { toTitle } from "case-switcher-js";

export interface TableInputFieldProps {
  control: ReturnType<typeof createFormArray>;
  attributes: FieldAttribute[];
  defaultValue: "undefined" | "default";
  data: any[];
  defaultValueFn: (control: IFormGroup, key: string) => string;
  // all forms options:
  formToIdMap: FormToIdMap;
  formValues: IFormGroup;
}

function OverWriteableCell(props: {
  meta: TableFieldAttributes;
  defaultValueFn: (control: IFormGroup, key: string) => string;
  control: IFormGroup;
  onClearOverWriteClick: () => void;
  onOverwriteClick: () => void;
  children?: JSX.Element;
}) {
  return (
    <Switch>
      <Match when={props.meta.options?.disabled}>
        <td
          class={css`
            max-width: 100px;
          `}
        >
          {props.children}
        </td>
      </Match>
      <Match when={props.meta.noOverWrite}>
        <td
          class={css`
            max-width: 100px;
          `}
        >
          {props.children}
        </td>
      </Match>
      <Match when={props.meta.key}>
        <td>
          <div
            class={css`
              max-width: 100px;
              display: flex;
            `}
          >
            {props.defaultValueFn?.(props.control, props.meta.key)}
            <Show
              when={props.control.controls[props.meta.key].value === undefined}
              fallback={
                <>
                  {props.children}
                  <button type="button" onClick={props.onClearOverWriteClick}>
                    x
                  </button>
                </>
              }
            >
              <button type="button" onClick={props.onOverwriteClick}>
                O
              </button>
            </Show>
          </div>
        </td>
      </Match>
    </Switch>
  );
}

export function TableInputField(props: TableInputFieldProps) {
  const [p, customProps] = splitProps(props, ["control", "attributes", "defaultValue", "formToIdMap", "formValues"]);

  const [sortedIds, setSortedKeys] = createSignal([]);

  const owner = getOwner();

  function newRow(obj?: { [key: string]: any }, id?: string) {
    const groupConstructor = p.attributes.reduce((acc, meta) => {
      runWithOwner(owner, () => {
        if (meta.type === "table") {
          acc[meta.key] = createFormArray([]);
        } else {
          if (meta.default) {
            acc[meta.key] = createFormControl(obj?.[meta.key] ?? meta.default(p.formToIdMap, p.formValues, p.control, id), meta.options);
          } else if (p.defaultValue === "undefined") {
            acc[meta.key] = createFormControl(obj?.[meta.key], meta.options);
          } else if (p.defaultValue === "default") {
            acc[meta.key] = createFormControl(getDefaultValue(meta.type), meta.options);
          }
        }
      });
      return acc;
    }, {} as { [key: string]: IFormControl | ReturnType<typeof createFormArray> });

    return createFormGroup(groupConstructor);
  }

  const addNew = bindOwner(() => {
    batch(function () {
      const groupControl = newRow();
      props.control.push(groupControl);
      setSortedKeys((prev) => [...prev, groupControl.controls._id.value]);
    });
  });

  if (props.data) {
    const clonedData = props.data.map((att) => newRow(klona(att.properties), att.id));
    // batch not work here:
    runWithOwner(owner, () => {
      clonedData.forEach((attribute) => {
        props.control.push(attribute);
      });
    });
    setSortedKeys((props.control.controls as ReadonlyArray<IFormGroup>).map((a) => a.controls._id.value));
  }

  // Todo dont allow duplicate value in the select field
  const SortableRow = (p: { metaId: string }) => {
    const sortable = createSortable(p.metaId);

    const control = createMemo(() => (props.control.controls as ReadonlyArray<IFormGroup>).find((control) => control.controls._id.value === p.metaId));

    const setValue = (id: string, value: any) => {
      control().controls[id].setValue(value);
    };
    const clearControl = (id: string) => {
      control().controls[id].setValue(undefined);
    };
    const clearSelectControl = (id: string) => {
      control().controls[id].setValue(null);
    };

    return (
      <Show when={control()}>
        {/* @ts-ignore */}
        <tr use:sortable class="" classList={{ "opacity-25": sortable.isActiveDraggable }}>
          <td>{/* <DynGlyph x="swap_vert" class="hidden group-hover:block" /> */}</td>

          <For each={props.attributes}>
            {(meta) => (
              <Switch>
                <Match when={meta.hidden}>
                  <></>
                </Match>
                <Match when={meta.type === "string"}>
                  <OverWriteableCell
                    meta={meta}
                    defaultValueFn={props.defaultValueFn}
                    control={control()}
                    onClearOverWriteClick={() => clearControl(meta.key)}
                    onOverwriteClick={() => setValue(meta.key, "")}
                  >
                    <TextInputField label="" control={control().controls[meta.key] as IFormControl} type={"text"} />
                  </OverWriteableCell>
                </Match>
                <Match when={meta.type === "select"}>
                  <OverWriteableCell
                    meta={meta}
                    defaultValueFn={props.defaultValueFn}
                    control={control()}
                    onClearOverWriteClick={() => clearControl(meta.key)}
                    onOverwriteClick={() => clearSelectControl(meta.key)}
                  >
                    <SelectInputField
                      control={control().controls[meta.key] as IFormControl}
                      valueKey={(meta as SelectField).valueKey}
                      fetchOptions={async (inputValue: string) => (meta as SelectField).fetchOptions(props.formToIdMap, props.formValues, control(), inputValue)}
                    />
                  </OverWriteableCell>
                </Match>
                <Match when={meta.type === "boolean"}>
                  <OverWriteableCell
                    meta={meta}
                    defaultValueFn={props.defaultValueFn}
                    control={control()}
                    onClearOverWriteClick={() => clearControl(meta.key)}
                    onOverwriteClick={() => setValue(meta.key, false)}
                  >
                    <BooleanInputField label="" control={control().controls[meta.key] as IFormControl} />
                  </OverWriteableCell>
                </Match>
                <Match when={meta.type === "object"}>
                  <td>TODO</td>
                </Match>
              </Switch>
            )}
          </For>
          <td>
            <button type="button" onclick={(_) => props.control.removeControl(control())} title="Delete Row">
              x
            </button>
          </td>
        </tr>
      </Show>
    );
  };

  const [activeDragItem, setActiveDragItem] = createSignal<number | string | null>(null);
  const ids = () => sortedIds();
  const onDragStart: DragEventHandler = ({ draggable }) => {
    setActiveDragItem(draggable.id);
  };
  const onDragEnd: DragEventHandler = ({ draggable, droppable }) => {
    if (draggable && droppable) {
      const currentItems = ids();
      const fromIndex = currentItems.indexOf(draggable.id as string);
      const toIndex = currentItems.indexOf(droppable.id as string);
      if (fromIndex !== toIndex) {
        const updatedItems = currentItems.slice();
        updatedItems.splice(toIndex, 0, ...updatedItems.splice(fromIndex, 1));
        setSortedKeys(updatedItems);
        // runWithOwner(owner, () => {
        batch(() => {
          // Cannot mutate a Store directly
          // props.control.controls.splice(toIndex, 0, ...props.control.controls.splice(fromIndex, 1));
          updatedItems.forEach((_id, index) => {
            const control = (props.control.controls as ReadonlyArray<IFormGroup>).find((control) => control.controls._id.value === _id);
            control.controls.pos.setValue(index + 1);
          });
        });
        // });
      }
    }
    setActiveDragItem(null);
  };

  return (
    <div
      classList={{
        "is-invalid": !!p.control.errors,
        "is-touched": p.control.isTouched,
        "is-required": p.control.isRequired,
        "is-disabled": p.control.isDisabled,
      }}
    >
      <div>
        {/* <SectionHeaderWithAction border-b={false}> */}
        {/* <h3 >Layout Editor</h3> */}
        {/* </SectionHeaderWithAction> */}
        <div>
          <Button text={"Add New"} onclick={addNew} />
        </div>
        <div
          class={css`
            table,
            th,
            td {
              border: 1px solid rgba(0, 0, 0, 0.1);
              border-collapse: collapse;
            }
          `}
        >
          <table>
            <thead>
              <tr>
                <th></th>
                <For each={props.attributes}>
                  {(attribute) => (
                    <Show when={!attribute.hidden}>
                      <th>{toTitle(attribute.label || attribute.key)}</th>
                    </Show>
                  )}
                </For>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* @ts-ignore */}
              <DragDropProvider onDragStart={onDragStart} onDragEnd={onDragEnd} collisionDetectionAlgorithm={closestCenter}>
                <DragDropSensors />
                {/* @ts-ignore */}
                <SortableProvider ids={ids()}>
                  <For each={sortedIds()} fallback={<div>No Attributes</div>}>
                    {(_id) => <SortableRow metaId={_id} />}
                  </For>
                </SortableProvider>
              </DragDropProvider>
            </tbody>
          </table>
        </div>
        {JSON.stringify(props.control.value)}
      </div>

      <Show when={p.control.isTouched && !p.control.isValid}>
        <For each={Object.values(p.control.errors)}>{(errorMsg: string) => <small>{errorMsg}</small>}</For>
      </Show>
    </div>
  );
}
