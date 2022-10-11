import {
  JSX,
  Component,
  batch,
  createEffect,
  createMemo,
  createSignal,
  createUniqueId,
  For,
  getOwner,
  runWithOwner,
  Show,
  splitProps,
  Switch,
  Match, JSXElement
} from "solid-js";
import {Dynamic} from 'solid-js/web';
import {ulid} from 'ulid'
import {BooleanInputField} from "./BooleanInputField";
import {Button} from "../button";
import {TextInputField} from "./TextInputField";
import { IoInformationCircle } from 'solid-icons/io'
import { AiFillEdit } from 'solid-icons/ai'

import {
  bindOwner,
  createFormArray,
  createFormControl,
  createFormGroup,
  IFormControl,
  IFormControlOptions,
  IFormGroup
} from "solid-forms";
import {
  closestCenter,
  createSortable,
  DragDropProvider,
  DragDropSensors,
  DragEventHandler,
  SortableProvider
} from "@thisbeyond/solid-dnd";
import {css} from "solid-styled-components";
import {getDefaultValue} from "../../utils/form";
import {SelectInputField} from "./SelectInputField";
import {A, D} from "@mobily/ts-belt";
import {
  FieldAttribute,
  Id,
  SelectField,
  TableField,
  TableFieldAttributes,
  FormMetaData,
  FormResult
} from "./Form";
import {klona} from "klona";
import {toTitle} from "case-switcher-js";
import {AiOutlineCloseCircle} from 'solid-icons/ai'
import {VsDebugStepOver} from 'solid-icons/vs'
import {DEBUG} from "../../utils/config";
import usePopper from "solid-popper";
import {JsonInput} from "./JsonInput";
const ModalInput = (props: {btnContent: JSXElement; children: JSXElement}) => {
  const [isVisible, setIsVisible] = createSignal(false);
  const [target, setTarget] = createSignal<HTMLDivElement>();
  const [popper, setPopper] = createSignal<HTMLDivElement>();
  usePopper(target, popper, {
    placement: "bottom",
  });
  return <><ui5-button ref={setTarget} design="Default" onClick={()=>setIsVisible(true)}>{props.btnContent}</ui5-button>
    <Show when={isVisible()}>
      <div ref={setPopper}>
        {props.children}
        <ui5-button design="Default" onClick={()=>setIsVisible(false)}>Close</ui5-button>
      </div>
    </Show>
  </>
}

export interface TableInputFieldProps {
  control: ReturnType<typeof createFormArray>;
  attributes: FieldAttribute[];
  defaultValue: "undefined" | "default";
  data: any[];
  defaultValueFn: (control: IFormGroup, key: string) => string;
  type?: string;
  component?: Component<any>;
  forms?: FormMetaData[];
  postSubmit?: (tableItemFormGroup: IFormGroup, values: FormResult) => void
  // all forms options:
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
      <Match when={props.meta.noInput}>
        <td
          class={css`
            max-width: 100px;
          `}
        >
          <div
            class={css`
              max-width: 100px;
              display: flex;
            `}
          >
            {props.defaultValueFn?.(props.control, props.meta.key)}
          </div>
        </td>
      </Match>
      <Match when={props.meta.options?.disabled}>
        <td
          class={css`
            max-width: 100px;
          `}
        >
          <div
            class={css`
              max-width: 100px;
              display: flex;
            `}
          >
            {props.defaultValueFn?.(props.control, props.meta.key)}
            {props.children}
          </div>
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
                    <AiOutlineCloseCircle/>
                  </button>
                </>
              }
            >
              <button type="button" onClick={props.onOverwriteClick}>
                <VsDebugStepOver/>
              </button>
            </Show>
          </div>
        </td>
      </Match>
    </Switch>
  );
}

// duplicate:
const ServerFormAttributeType = {
  String: "string",
  Dynamic: "dynamic",
  Boolean: "boolean",
  Integer: "integer",
  Decimal: "decimal",
  Object: "object",
};
const tableAttributes = (attributes: FieldAttribute[]) => {
  return [
    // _id is important, used for sorting
    {
      key: "_id",
      type: ServerFormAttributeType.String,
      default: (formValues, control, id: string) => id || ulid(),
      hidden: true
    },
    {key: "id", type: ServerFormAttributeType.String, default: (formValues, control, id: string) => id, hidden: true},
    {key: "start", type: ServerFormAttributeType.String, hidden: true},
    {key: "end", type: ServerFormAttributeType.String, hidden: true},
    {key: "label", type: ServerFormAttributeType.String, hidden: true},
    {
      key: "properties",
      type: ServerFormAttributeType.Object,
      attributes
    },
  ]
}

export function TableInputField(props: TableInputFieldProps) {
  const [p, customProps] = splitProps(props, ["control", "attributes", "defaultValue", "formValues"]);

  const [sortedIds, setSortedKeys] = createSignal([]);

  const owner = getOwner();

  function newRow(attributes: FieldAttribute[], obj?: { [key: string]: any }, id?: string) {
    const groupConstructor = attributes.reduce((acc, meta) => {
      runWithOwner(owner, () => {
        if (meta.type === "table") {
          acc[meta.key] = createFormArray([]);
        }
        if (meta.key === "properties") {
          acc[meta.key] = newRow(meta.attributes, obj?.[meta.key], id);
        } else {
          if (meta.default) {
            acc[meta.key] = createFormControl(obj?.[meta.key] === undefined ? meta.default(p.formValues, p.control, id) : obj[meta.key], meta.options);
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

  const attributes = tableAttributes(p.attributes);
  const addNew = bindOwner(() => {
    batch(function () {
      const groupControl = newRow(attributes);
      props.control.push(groupControl);
      setSortedKeys((prev) => [...prev, groupControl.controls._id.value]);
    });
  });

  if (props.data) {
    const clonedData = props.data.map((att) => {
      const value = D.selectKeys(att, attributes.map(attr => attr.key));
      return newRow(attributes, klona(value), att.id);
    });
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

    const DisplayProperties = (p: { attributes: FieldAttribute[], control: IFormGroup }) => {
      const setValue = (id: string, value: any) => {
        p.control.controls[id].setValue(value);
      };
      const clearControl = (id: string) => {
        p.control.controls[id].setValue(undefined);
      };
      const clearSelectControl = (id: string) => {
        p.control.controls[id].setValue(null);
      };
      return <For each={p.attributes}>
        {(meta) => (
          <Switch>
            <Match when={meta.hidden}>
              <></>
            </Match>
            <Match when={meta.key === "properties"}>
              <DisplayProperties attributes={meta.attributes} control={p.control.controls['properties'] as IFormGroup}/>
            </Match>
            <Match when={meta.type === "string"}>
              <OverWriteableCell
                meta={meta}
                defaultValueFn={props.defaultValueFn}
                control={p.control}
                onClearOverWriteClick={() => clearControl(meta.key)}
                onOverwriteClick={() => setValue(meta.key, "")}
              >
                <TextInputField label="" control={p.control.controls[meta.key] as IFormControl} type={"text"}/>
              </OverWriteableCell>
            </Match>
            <Match when={meta.type === "select"}>
              <OverWriteableCell
                meta={meta}
                defaultValueFn={props.defaultValueFn}
                control={p.control}
                onClearOverWriteClick={() => clearControl(meta.key)}
                onOverwriteClick={() => clearSelectControl(meta.key)}
              >
                <SelectInputField
                  control={p.control.controls[meta.key] as IFormControl}
                  valueKey={(meta as SelectField).valueKey}
                  fetchOptions={async (inputValue: string) => (meta as SelectField).fetchOptions(props.formValues, p.control, inputValue)}
                />
              </OverWriteableCell>
            </Match>
            <Match when={meta.type === "boolean"}>
              <OverWriteableCell
                meta={meta}
                defaultValueFn={props.defaultValueFn}
                control={p.control}
                onClearOverWriteClick={() => clearControl(meta.key)}
                onOverwriteClick={() => setValue(meta.key, false)}
              >
                <BooleanInputField label="" control={p.control.controls[meta.key] as IFormControl}/>
              </OverWriteableCell>
            </Match>
            <Match when={meta.type === "object"}>
              <td>
                <OverWriteableCell
                  meta={meta}
                  defaultValueFn={props.defaultValueFn}
                  control={p.control}
                  onClearOverWriteClick={() => clearControl(meta.key)}
                  onOverwriteClick={() => setValue(meta.key, false)}
                >
                  <ModalInput btnContent={<AiFillEdit />}>
                    <JsonInput control={p.control.controls[meta.key] as IFormControl}/>
                  </ModalInput>
                </OverWriteableCell>
              </td>
            </Match>

          </Switch>
        )}
      </For>
    }

    return (
      <Show when={control()}>
        {/* @ts-ignore */}
        <tr use:sortable class="" classList={{"opacity-25": sortable.isActiveDraggable}}>
          <td>{/* <DynGlyph x="swap_vert" class="hidden group-hover:block" /> */}</td>
          <DisplayProperties attributes={attributes} control={control()}/>
          <td>
            <button type="button" onclick={(_) => props.control.removeControl(control())} title="Delete Row">
              <AiOutlineCloseCircle/>
            </button>
          </td>
        </tr>
      </Show>
    );
  };
  const SortableRowForm = (p: { metaId: string }) => {
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
        <div use:sortable class="border rounded-2 border-gray-300 p-2"
             classList={{"opacity-25": sortable.isActiveDraggable}}>
          <Dynamic component={props.component!} forms={props.forms!}
                   postSubmit={(values: FormResult) => props.postSubmit(control(), values)}
                   id={(control().controls['end'] as IFormControl).value || "new"}/>
          <div>
            <button type="button" onclick={(_) => props.control.removeControl(control())} title="Delete Row">
              <AiOutlineCloseCircle/>
            </button>
          </div>
        </div>
      </Show>
    );
  };

  const [activeDragItem, setActiveDragItem] = createSignal<number | string | null>(null);
  const ids = () => sortedIds();
  const onDragStart: DragEventHandler = ({draggable}) => {
    setActiveDragItem(draggable.id);
  };
  const onDragEnd: DragEventHandler = ({draggable, droppable}) => {
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

  if (props.type === "form") {
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
          <div>
            <ui5-button design="Default" onclick={addNew}>Add New</ui5-button>
          </div>
          <div>
            {/* @ts-ignore */}
            <DragDropProvider onDragStart={onDragStart} onDragEnd={onDragEnd}
                              collisionDetectionAlgorithm={closestCenter}>
              <DragDropSensors/>
              {/* @ts-ignore */}
              <SortableProvider ids={ids()}>
                <div class="flex flex-col gap-2">
                  <For each={sortedIds()} fallback={<div>No Attributes</div>}>
                    {(_id) => <SortableRowForm metaId={_id}/>}
                  </For>
                </div>
              </SortableProvider>
            </DragDropProvider>
          </div>
          {DEBUG && JSON.stringify(props.control.value)}
        </div>

        <Show when={p.control.isTouched && !p.control.isValid}>
          <For each={Object.values(p.control.errors)}>{(errorMsg: string) => <small>{errorMsg}</small>}</For>
        </Show>
      </div>
    );
  }

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
          <Button text={"Add New"} onclick={addNew}/>
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
            <DragDropProvider onDragStart={onDragStart} onDragEnd={onDragEnd}
                              collisionDetectionAlgorithm={closestCenter}>
              <DragDropSensors/>
              {/* @ts-ignore */}
              <SortableProvider ids={ids()}>
                <For each={sortedIds()} fallback={<div>No Attributes</div>}>
                  {(_id) => <SortableRow metaId={_id}/>}
                </For>
              </SortableProvider>
            </DragDropProvider>
            </tbody>
          </table>
        </div>
        {DEBUG && JSON.stringify(props.control.value)}
      </div>

      <Show when={p.control.isTouched && !p.control.isValid}>
        <For each={Object.values(p.control.errors)}>{(errorMsg: string) => <small>{errorMsg}</small>}</For>
      </Show>
    </div>
  );
}
