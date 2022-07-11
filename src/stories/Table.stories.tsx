export default { title: "Application/Dashboard" };
import { Story } from "@storybook/html";
import { createSignal, For } from "solid-js";
import { Table } from "../components/table";

import { TableProps } from "../models/table";
import { people } from "../utils/exampleData";

const TableTemplate = (args: TableProps) => {
  return <Table {...args} />;
};

export const ExampleTable = TableTemplate.bind({});

ExampleTable.args = {
  data: people,
};
