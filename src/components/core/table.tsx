export default { title: "Application/Tables" };
import { createEffect, createSignal, For } from "solid-js";
import { TableProps } from "../../models/table";
import clsx from "clsx";

export const TableWithStickyHeader = (props: TableProps) => {
  return (
    <div class="px-4 sm:px-6 lg:px-8">
      <div class="mt-8 flex flex-col">
        <div class="my-2 -mx-4 sm:mx-6 lg:mx-8">
          <div class="inline-block min-w-full py-2 align-middle">
            <div class="shadow-sm ring-1 ring-black ring-opacity-5">
              <table
                class="min-w-full border-separate"
                style={{ borderSpacing: 0 }}
              >
                <thead class="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      class="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      class="sticky top-0 z-10 hidden border-b border-gray-300 bg-gray-50 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:table-cell"
                    >
                      Title
                    </th>
                    <th
                      scope="col"
                      class="sticky top-0 z-10 hidden border-b border-gray-300 bg-gray-50 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter lg:table-cell"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      class="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
                    >
                      Role
                    </th>
                    <th
                      scope="col"
                      class="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-3.5 pr-4 pl-3 backdrop-blur backdrop-filter sm:pr-6 lg:pr-8"
                    >
                      <span class="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white">
                  <For each={props.data} fallback={<div>Loading...</div>}>
                    {(person, i) => {
                      return (
                        <tr>
                          <td
                            class={clsx(
                              true ? "border-b border-gray-200" : "",
                              "whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8"
                            )}
                          >
                            {person.name}
                          </td>
                          <td
                            class={clsx(
                              true ? "border-b border-gray-200" : "",
                              "whitespace-nowrap px-3 py-4 text-sm text-gray-500 hidden sm:table-cell"
                            )}
                          >
                            {person.title}
                          </td>
                          <td
                            class={clsx(
                              true ? "border-b border-gray-200" : "",
                              "whitespace-nowrap px-3 py-4 text-sm text-gray-500 hidden lg:table-cell"
                            )}
                          >
                            {person.email}
                          </td>
                          <td
                            class={clsx(
                              true ? "border-b border-gray-200" : "",
                              "whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                            )}
                          >
                            {person.role}
                          </td>
                          <td
                            class={clsx(
                              true ? "border-b border-gray-200" : "",
                              "relative whitespace-nowrap py-4 pr-4 pl-3 text-right text-sm font-medium sm:pr-6 lg:pr-8"
                            )}
                          >
                            <a
                              href="#"
                              class="text-indigo-600 hover:text-indigo-900"
                            >
                              Edit<span class="sr-only">, {person.name}</span>
                            </a>
                          </td>
                        </tr>
                      );
                    }}
                  </For>
                </tbody>
              </table>
            </div>
          </div>
          solid-heroiconssolid-heroicons
        </div>
      </div>
    </div>
  );
};
