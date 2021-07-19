import React from "react";
import PropTypes from "prop-types";

import "../styles/components.scss";

function TabContent(props) {
  const { children } = props;

  return <div className="tabContent">{children}</div>;
}

TabContent.props = {
  children: PropTypes.node,
};

export default TabContent;
