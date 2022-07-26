export default { title: "Application/Dashboard" };
import { css } from "solid-styled-components";
import "./styles.css";

export const Card = () => {
  return (
    <div
      class={css`
        display: flex;
        flex-direction: column;
        background-color: blue;
        gap: 10px;
      `}
    >
      <div>Header</div>
      <div
        class={css`
          backgroundcolor: red;
          display: grid;
          grid-template-columns: repeat(auto-fit, 100px);
          gap: 2rem 2rem;
        `}
      >
        <div
          class={css`
            width: 100px;
            height: 100px;
            border-radius: 15px;
            background-color: #faf7fa;
          `}
        ></div>
        <div
          class={css`
            width: 100px;
            height: 100px;
            border-radius: 15px;
            background-color: #faf7fa;
          `}
        ></div>
        <div
          class={css`
            width: 100px;
            height: 100px;
            border-radius: 15px;
            background-color: #faf7fa;
          `}
        ></div>
        <div
          class={css`
            width: 100px;
            height: 100px;
            border-radius: 15px;
            background-color: #faf7fa;
          `}
        ></div>
        <div
          class={css`
            width: 100px;
            height: 100px;
            border-radius: 15px;
            background-color: #faf7fa;
          `}
        ></div>
        <div
          class={css`
            width: 100px;
            height: 100px;
            border-radius: 15px;
            background-color: #faf7fa;
          `}
        ></div>
        <div
          class={css`
            width: 100px;
            height: 100px;
            border-radius: 15px;
            background-color: #faf7fa;
          `}
        ></div>
      </div>
      <div>Three</div>
    </div>
  );
};
