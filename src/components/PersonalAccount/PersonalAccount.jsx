import React from "react";
import { Link } from "react-router-dom";
import "./PersonalAccount.css";

const PersonalAccount = () => {
  return (
    <div className="personal_account">
      <Link className="personal_account_link" to="/liked">
        <button className="personal_account_nav">Понравившийся</button>
      </Link>
      <Link className="personal_account_link" to="/receipts">
        <button className="personal_account_nav">Мои заказы</button>
      </Link>
    </div>
  );
};

export default PersonalAccount;
