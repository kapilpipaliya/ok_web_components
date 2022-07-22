export default { title: "Application/Select" };
import { Select } from "../components/input/core/select";

export const SelectTest = () => {
  const args = {
    options: [
      { text: "<b>sample</b>", value: "sample" },
      { text: "sample2", value: "sample2" },
      {
        text: "sample3",
        value: "sample3",
        innerHtml: () => (
          <span>
            <b>Bold Span</b>
          </span>
        ),
      },
    ],
  };
  return (
    <>
      <Select options={args.options} multiSelect={true} />
    </>
  );
};
