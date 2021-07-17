import React from "react";

import { TabContent, CartItem } from "../components";

import "../styles/components.scss";

function Cart(props) {
  const { cart, setCart } = props;

  const getTotalCredits = () => {
    return cart.length < 2
      ? cart.length === 1
        ? cart[0].credits
        : 0
      : cart.reduce((curr, next) => curr.credits + next.credits);
  };

  console.log(cart);

  return (
    <TabContent>
      <div
        style={{
          height: "100%",
          padding: 8,
          display: "flex",
          flexDirection: "column",
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
            cart.map((course) => (
              <CartItem
                key={course.number}
                course={course}
                cart={cart}
                setCart={setCart}
              />
            ))
          ) : (
            <div style={{ fontSize: 18, color: "darkgray" }}>
              Your cart is empty.
            </div>
          )}
        </div>
      </div>
    </TabContent>
  );
}

export default Cart;
