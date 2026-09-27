import { useEffect } from "react";

import { AiOutlineSelect } from "react-icons/ai";
import { BsPencilFill } from "react-icons/bs";
import { FaEraser } from "react-icons/fa";

import { useOptions, useSetSelection } from "@/common/recoil/options";

const ModePicker = () => {
  const [options, setOptions] = useOptions();
  const { clearSelection } = useSetSelection();

  useEffect(() => {
    clearSelection();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options.mode]);

  return (
    <>
      <button
        type="button"
        aria-label="Draw mode"
        title="Draw mode"
        aria-pressed={options.mode === "draw"}
        className={`btn-icon text-xl ${
          options.mode === "draw" && "bg-green-400"
        }`}
        onClick={() => {
          setOptions((prev) => ({
            ...prev,
            mode: "draw",
          }));
        }}
      >
        <BsPencilFill />
      </button>

      <button
        type="button"
        aria-label="Eraser mode"
        title="Eraser mode"
        aria-pressed={options.mode === "eraser"}
        className={`btn-icon text-xl ${
          options.mode === "eraser" && "bg-green-400"
        }`}
        onClick={() => {
          setOptions((prev) => ({
            ...prev,
            mode: "eraser",
          }));
        }}
      >
        <FaEraser />
      </button>

      <button
        type="button"
        aria-label="Select mode"
        title="Select mode"
        aria-pressed={options.mode === "select"}
        className={`btn-icon text-2xl ${
          options.mode === "select" && "bg-green-400"
        }`}
        onClick={() => {
          setOptions((prev) => ({
            ...prev,
            mode: "select",
          }));
        }}
      >
        <AiOutlineSelect />
      </button>
    </>
  );
};

export default ModePicker;
