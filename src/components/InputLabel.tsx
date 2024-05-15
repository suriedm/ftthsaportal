import React from "react";

const InputLabel = ({ id, label }: { id: string; label: string }) => {
  return (
    <label
      style={{
        color: "#263547",
        fontSize: "18px",
        fontWeight: "bold",
        fontFamily: "sans-serif",
      }}
      htmlFor={id}
    >
      {label}
    </label>
  );
};

export default InputLabel;
