import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import "./Order.css";
import { dishesContext } from "../context/DishesContext";
import { useState } from "react";
import { authContex } from "../Auth/AuthContex";
import Header from "../Header/Header";

const Order = () => {
  const { order } = useContext(dishesContext);
  const { user } = useContext(authContex);
  const [quantity, setQuantity] = useState(1);
  const [inpValue, setInpValue] = useState("");
  const [number, setNumber] = useState("");
  const [flag, setFlag] = useState(false);
  const history = useHistory();

  let time = new Date(Date.now());
  let arr = [];
  arr.push(time.toString().split(" "));
  let newArr = arr[0].slice(1, 5).join(" ");

  const handleCountPluse = () => {
    if (quantity < 10) {
      setQuantity(quantity + 1);
    } else {
      setQuantity(quantity);
    }
  };

  const handleInpValue = (e) => {
    let obj = {
      ...inpValue,
      [e.target.name]: e.target.value,
    };

    if (obj.userNumber) {
      if (obj.userNumber.length > 12) {
        return;
      }
    }
    setInpValue(obj);
    if (obj.userNumber && obj.userNumber.length > 0) {
      setNumber(obj.userNumber);
    } else {
      setNumber("");
    }
  };

  const handleCountMinus = () => {
    if (quantity <= 1) {
      setQuantity(1);
    } else {
      setQuantity(quantity - 1);
    }
  };

  const handleFocus = (e) => {
    console.log(number);
    if (number.length === 0) {
      setNumber(996);
    }
  };

  const handleCheck = () => {
    if (inpValue.userName && inpValue.userNumber && inpValue.userAdres) {
      if (
        inpValue.userName === "" &&
        inpValue.userNumber === "" &&
        inpValue.userAdres === ""
      ) {
        setFlag(true);
        return;
      } else {
        let userObj = {
          userData: inpValue,
          order: order.title,
          time: newArr,
          price: order.price,
          totalPrice: order.price * quantity,
          quantity: quantity,
        };

        localStorage.setItem("userOrder", JSON.stringify(userObj));

        if (user.length > 0) {
          let obj = {
            user: user[0].login,
            id: user[0].id,
            userData: inpValue,
            order: order.title,
            time: newArr,
            price: order.price,
            totalPrice: order.price * quantity,
            quantity: quantity,
          };
          localStorage.setItem("order", JSON.stringify(obj));
        }
        setFlag(false);
        history.push("/creditcard");
      }
    } else {
      setFlag(true);
    }
  };

  return (
    <div>
      <Header />
      <div className="order">
        <div className="container">
          <div className="order_content">
            <Link to="/">
              <div className="order_exit-btn">
                <HighlightOffIcon
                  className="order_btn-exit"
                  fontSize="large"
                ></HighlightOffIcon>
              </div>
            </Link>
            <div className="order_content_row">
              <div className="order_content_col_left">
                <div>
                  <div
                    className="order_content_img"
                    style={{
                      background: `url(${order.image}) no-repeat`,
                    }}
                  ></div>
                </div>
                <div>
                  <div className="order_content_title order_text">
                    <span>Название :</span>
                    {order.title}
                  </div>
                  <div className="order_content_price order_text">
                    <span>Цена :</span>
                    {order.price * quantity} <span>сом</span>
                  </div>
                  <div className="order_counter">
                    <button
                      onClick={handleCountMinus}
                      className="order_counter_btn"
                    >
                      -
                    </button>
                    <div className="order_quantity_box">
                      <span className="order_counter_quantity">{quantity}</span>
                    </div>

                    <button
                      onClick={handleCountPluse}
                      className="order_counter_btn"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              <div className="order_content_col_right">
                <div className="user_data">
                  <p className="user_title_data">Заполните форму</p>
                  <div className="box_inp_data">
                    <input
                      value={inpValue.userName}
                      onChange={(e) => handleInpValue(e)}
                      name="userName"
                      placeholder="Укажите свое имя"
                      className="inp_data"
                      type="text"
                    />
                  </div>
                  <div className="box_inp_data">
                    <input
                      value={inpValue.userAdres}
                      onChange={(e) => handleInpValue(e)}
                      name="userAdres"
                      placeholder="Укажите адрес"
                      className="inp_data"
                      type="text"
                    />
                  </div>
                  <div className="box_inp_data">
                    <input
                      name="userNumber"
                      value={number}
                      onFocus={handleFocus}
                      onChange={(e) => handleInpValue(e)}
                      placeholder="укажите номер телефона"
                      className="inp_data"
                      type="number"
                    />
                  </div>
                  {flag ? (
                    <p className="text_error">Заполните форму полностю !</p>
                  ) : null}
                </div>
              </div>
            </div>
            <div onClick={handleCheck} className="oreder_box_btn_order">
              <button className="oreder_btn_order">Оплатить</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
