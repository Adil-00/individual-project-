import React, { useContext } from "react";
import Liked from "./Liked.jsx";
import { authContex } from "../Auth/AuthContex";
import "./LikedList.css";
import Header from "../Header/Header.jsx";
import PersonalAccount from "../PersonalAccount/PersonalAccount.jsx";

const LikedList = () => {
  const { user } = useContext(authContex);
  return (
    <>
      <Header />
      <PersonalAccount />
      <div className="likedList">
        <div className="container">
          <div className="liked_contend">
            {user.length > 0 ? (
              user[0].favorite.length > 0 ? (
                user[0].favorite.map((item) => <Liked item={item} />)
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

export default LikedList;
