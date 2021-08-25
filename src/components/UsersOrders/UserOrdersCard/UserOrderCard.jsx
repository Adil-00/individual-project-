import React from "react";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { useContext } from "react";
import { userOrderContext } from "../../context/UserOrderContext";
import "./UserOrderCard.css";

const UserOrderCard = ({ item }) => {
  const { handleUsersOrderDelete, handleDonePost } =
    useContext(userOrderContext);

  return (
    <div className="UserReceipts_cart">
      <div className="UserReceipts_cart_content">
        <div
          onClick={() => handleUsersOrderDelete(item.id)}
          className="check_btn"
        >
          {" "}
          <HighlightOffIcon
            className="delete_check_btn"
            fontSize="large"
          ></HighlightOffIcon>
        </div>
        <div className="user_receipts_row">название: {item.order}</div>
        <div className="user_receipts_row">колицество: {item.quantity}</div>
        <div className="user_receipts_row">цена: {item.price}сом</div>
        <div className="user_receipts_row">____________</div>
        <div className="user_receipts_row">
          имя заказчика: {item.userData.userName}
        </div>
        <div className="user_receipts_row">
          адрес: {item.userData.userAdres}
        </div>
        <div className="user_receipts_row">
          номер телефона: +{item.userData.userNumber}
        </div>
        <div className="user_receipts_row">дата: {item.time}</div>
        <div className="user_receipts_row">____________</div>
        <div className="user_receipts_row">
          общая цена: {item.totalPrice}сом
        </div>
        <div onClick={() => handleDonePost(item.id)} className="done">
          <button>выполнено</button>
        </div>
      </div>
    </div>
  );
};

export default UserOrderCard;
