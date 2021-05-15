import React from "react";

import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";

import "./button.css";

type ButtonType = "primary" | "normal";

interface RoundButtonProps {
  type: ButtonType;
  icon: IconDefinition;
  onClick: () => void;
}

const deriveClass = (type: ButtonType) =>
  type === "primary" ? "button-primary" : "button-normal";

export const RoundButton: React.FC<RoundButtonProps> = (p) => (
  <button
    className={`button ${deriveClass(p.type)}`}
    onClick={() => p.onClick()}
  >
    <Icon className="button-icon" icon={p.icon} />
  </button>
);
