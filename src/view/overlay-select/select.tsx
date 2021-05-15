import { observer } from "mobx-react-lite";
import React from "react";
import { Presenter } from "../../presenter";

import "./select.css";

export const SelectOverlayComponent: React.FC<{
  pr: Presenter;
}> = observer(({ pr }) => {
  const n = pr.numSelected;
  if (n === 0) return null;
  const text = `${n} item${n > 1 ? "s" : ""} selected`;
  return <div className="select-overlay">{text}</div>;
});
