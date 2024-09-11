import React from "react";

interface Props {
  name?: string;
}

const DirectInfo = ({ name }: Props) => {
  return <div className="h-[200px] ">{name ? <h1>{name}</h1> : <h1>Wyszukaj lokalizacje</h1>}</div>;
};

export default DirectInfo;
