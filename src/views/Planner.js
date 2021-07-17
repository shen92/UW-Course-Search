import React, { useState, useEffect } from "react";

import { TabContent, Sidebar, CourseArea } from "../components";

function Planner(props) {
  const { cart } = props;

  const getTotalCredits = () => {
    return cart.length < 2
      ? cart.length === 1
        ? cart[0].credits
        : 0
      : cart.reduce((curr, next) => curr.credits + next.credits);
  };

  return (
    <TabContent>
      <div
        style={{
          height: "100%",
          padding: 8,
          display: "flex",
          flexDirection: "row",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: cart.length > 0 ? "flex-start" : "center",
            overflow: "auto",
            border: "1px solid #dee2e6",
            borderRadius: 5,
          }}
        >
          <div
            className="tabTitle"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            My Course Cart
          </div>
          <div
            style={{
              margin: "4px 0px 12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {`Total Credits: ${getTotalCredits()}`}
          </div>
          <div
            style={{
              flex: 1,
              width: "75%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: cart.length > 0 ? "flex-start" : "center",
              overflow: "auto",
              margin: "auto",
            }}
          >
            {cart.length > 0 ? (
              cart.map((course) => <></>)
            ) : (
              <div style={{ fontSize: 18, color: "darkgray" }}>
                Your cart is empty.
              </div>
            )}
          </div>
        </div>
        <div
          style={{
            flex: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: cart.length > 0 ? "flex-start" : "center",
            overflow: "auto",
            border: "1px solid #dee2e6",
            borderRadius: 5,
            marginLeft: 8,
          }}
        ></div>
      </div>
    </TabContent>
  );
}

export default Planner;
