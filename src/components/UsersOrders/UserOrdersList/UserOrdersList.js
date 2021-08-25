import React, { useContext, useEffect } from "react";
import { userOrderContext } from "../../context/UserOrderContext";
import Header from "../../Header/Header";
import UserOrderCard from "../UserOrdersCard/UserOrderCard";
import UserOrderPanel from "../UsersOrderPanel/UserOrderPanel";
import "./UsersOrderList.css";

const UserOrdersList = () => {
  const { userOrder, handleGetUserOrder } = useContext(userOrderContext);

  useEffect(() => {
    handleGetUserOrder();
    console.log("yse");
  }, []);

  return (
    <>
      <Header />
      <UserOrderPanel />
      <div className="UserReceiptsList">
        <div className="container">
          <div className="UserReceiptsList_content">
            {userOrder.length ? (
              userOrder.length > 0 ? (
                userOrder.map((item) => <UserOrderCard item={item} />)
              ) : (
                <p className="likedList_empty_title">Пусто</p>
              )
            ) : (
              <p className="likedList_empty_title">Пусто</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserOrdersList;
