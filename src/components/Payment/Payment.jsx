import React from "react";
import { Link, useHistory } from "react-router-dom";
import "./Payment.css";

const Payment = () => {
  const history = useHistory();

  return (
    <div className="Payment">
      <div className="container">
        <div className="Payment_content">
          <div className="payment_text">
            <div className="payment_logo"></div>
            <div className="payment_slogan">
              <div className="payment_title">Спасибо</div>
              <div className="payment_desc">Ваш заказ принят!</div>
            </div>
            <Link style={{ textDecoration: "none" }} to="/">
              <div className="payment_btn">
                <button className="payment-btn">ок</button>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
