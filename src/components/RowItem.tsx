import React from "react";
import { IRowItem } from "../utils/interfaces";
import { useRouter } from "next/navigation";
import Image from "next/image";
/*
link: string
    image: string
    title: string
*/
const RowItem = ({ image, link, title }: IRowItem) => {
  const { push } = useRouter();
  return (
    <div className="col">
      <Image width={150} height={150} alt="" src={`/asset/${image}.png`} />
      <button className="button2" onClick={() => push(link)} type="button">
        {title}
      </button>
    </div>
  );
};

export default RowItem;
