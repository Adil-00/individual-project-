import React from "react";
import { Link } from "react-router-dom";
import "./UserOrderPanle.css";

const UserOrderPanel = () => {
  return (
    <div className="personal_account">
      <Link className="personal_account_link" to="/userorder">
        <button className="personal_account_nav">Новые заказы</button>
      </Link>
      <Link className="personal_account_link" to="/done">
        <button className="personal_account_nav">Выполненые заказы</button>
      </Link>
    </div>
  );
};

export default UserOrderPanel;
