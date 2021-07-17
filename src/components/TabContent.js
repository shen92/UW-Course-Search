import React from "react";

import "../styles/components.scss";

function TabContent(props) {
  const { children } = props;

  return <div className="tabContent">{children}</div>;
}

export default TabContent;
