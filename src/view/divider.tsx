import React from "react";

export const HorizontalDivider: React.FC<{ addClass?: string[] }> = ({
  addClass,
}) => <div className={`notes-list-divider ${addClass?.join(" ")}`} />;
