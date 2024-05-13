import React from "react";
import { IFibrePlan } from "../utils/interfaces";
import { useRouter } from "next/navigation";

export const FibrePlan = ({ link, size, list, amount }: IFibrePlan) => {
  const { push } = useRouter();
  return (
    <div className="business box">
      <h2 className="title">{size}</h2>
      <div className="view">
        <div className="cost">
          <h4 className="amount">{amount}</h4>
        </div>
      </div>
      <div className="description">
        <ul>
          {list.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="button4">
        <button onClick={() => push(link)} type="submit">
          <h4 style={{ paddingTop: "9px" }}>SIGN UP NOW</h4>
        </button>
      </div>
    </div>
  );
};
