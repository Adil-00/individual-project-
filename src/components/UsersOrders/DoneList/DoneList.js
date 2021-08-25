import React, { useContext, useEffect } from "react";
import { userOrderContext } from "../../context/UserOrderContext";
import Header from "../../Header/Header";
import DoneCard from "../DoneCard/DoneCard";
import UserOrderPanel from "../UsersOrderPanel/UserOrderPanel";
import "./DoneList.css";
const DoneList = () => {
  const { done, handleGetDone } = useContext(userOrderContext);

  useEffect(() => {
    handleGetDone();
  }, []);

  return (
    <>
      <Header />
      <UserOrderPanel />
      <div className="UserReceiptsList">
        <div className="container">
          <div className="UserReceiptsList_content">
            {done.length > 0 ? (
              done.map((item) => <DoneCard item={item} />)
            ) : (
              <p className="likedList_empty_title">Пусто</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DoneList;
