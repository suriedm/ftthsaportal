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
          <h4 className="amount">R{amount}</h4>
        </div>
      </div>
      <div className="description">
        <ul>
          {list.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <button className="button4" onClick={() => push(link)} type="button">
        SIGN UP NOW
      </button>
    </div>
  );
};