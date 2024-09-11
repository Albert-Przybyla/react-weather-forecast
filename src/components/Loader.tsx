import React from "react";
import "./Loader.css";

interface Props {
  show: boolean;
}
const Loader = ({ show }: Props) => {
  return (
    <>
      {show && (
        <div className="loader-bg">
          <div className="loader"></div>
        </div>
      )}
    </>
  );
};

export default Loader;
