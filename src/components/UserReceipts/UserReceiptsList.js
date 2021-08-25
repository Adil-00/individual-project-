import React, { useContext } from "react";
import UserReceipts from "./UserReceipts";
import "./UserReceiptsList.css";
import { authContex } from "../Auth/AuthContex";
import PersonalAccount from "../PersonalAccount/PersonalAccount";
import Header from "../Header/Header";

const UserReceiptsList = () => {
  const { user } = useContext(authContex);
  return (
    <>
      <Header />
      <PersonalAccount />
      <div className="UserReceiptsList">
        <div className="container">
          <div className="UserReceiptsList_content">
            {user.length > 0 ? (
              user[0].cheque.length > 0 ? (
                user[0].cheque.map((item) => <UserReceipts item={item} />)
              ) : (
                <p className="likedList_empty_title">Пусто</p>
              )
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserReceiptsList;
