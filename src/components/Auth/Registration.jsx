import axios from "axios";
import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { authContex } from "./AuthContex";
import "./Registration.css";
const Registration = () => {
  const [inpValue, setInpValue] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [flag, setFlag] = useState(false);
  const [answer, setAnswer] = useState(false);
  const { handleCheck } = useContext(authContex);
  const [errorLogin, setErrorLogin] = useState(false);
  const [emptinessLogin, setEmptinessLogin] = useState(false);
  const [emptinessPassord, setEmptinessPassord] = useState(false);
  const history = useHistory();

  const handleInpValue = (e) => {
    let obj = {
      ...inpValue,
      [e.target.dataset.name]: e.target.value,
      favorite: [],
      cheque: [],
    };

    setInpValue(obj);
  };

  const handleRegistration = async () => {
    if (!inpValue.login) {
      setEmptinessLogin(true);
      setErrorLogin(false);
      setEmptinessPassord(false);
      return;
    } else if (!inpValue.password) {
      console.log("yes");
      setEmptinessLogin(false);
      setEmptinessPassord(true);
      return;
    }

    if (inpValue.login || inpValue.password) {
      if (inpValue.login.length <= 0) {
        setEmptinessLogin(true);
        setErrorLogin(false);
        return;
      } else if (inpValue.password.length <= 0) {
        setEmptinessPassord(true);
        return;
      }
    }

    setEmptinessLogin(false);
    setEmptinessPassord(false);

    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!re.test(String(inpValue.login).toLowerCase())) {
      setErrorLogin(true);
      return;
    }
    setErrorLogin(false);

    if (inpValue.password === repeatPassword) {
      const data = await handleCheck(inpValue);
      setAnswer(data);
      if (!data) {
        history.goBack();
      }
      setFlag(false);

      return;
    } else {
      setFlag(true);
      return;
    }
  };
  console.log(answer);

  return (
    <div className="registration">
      <div className="container">
        <div className="registration_form">
          <p className="registration_title">Регистрация</p>
          <div className="registration_inp">
            <div className="reg-inp">
              <input
                onChange={handleInpValue}
                placeholder="Логин"
                data-name="login"
                className="reg-inp2"
                type="text"
                autocomplete="off"
              />
            </div>
            <div>
              {emptinessLogin ? (
                <p className="login_error_text">Поле не может быть пуста</p>
              ) : null}
              {errorLogin ? (
                <p className="login_error_text">Некорректный @Email</p>
              ) : null}
              {answer ? (
                <p className="reg-warning">Такой пользователь уже существует</p>
              ) : null}
            </div>
            <div className="reg-inp">
              <input
                onChange={handleInpValue}
                placeholder="Пароль"
                data-name="password"
                className="reg-inp2"
                type="password"
                autocomplete="off"
              />
            </div>
            {emptinessPassord ? (
              <p className="login_error_text">Поле не может быть пуста</p>
            ) : null}
            <div className="reg-inp">
              <input
                onChange={(e) => setRepeatPassword(e.target.value)}
                data-name="repeatPassword"
                placeholder="Повторите пароль"
                className="reg-inp2"
                type="password"
                autocomplete="off"
              />
            </div>
            {flag ? <p className="reg-warning">Пароль не совподает!</p> : null}
          </div>
          <div className="registration_btn">
            <button onClick={handleRegistration} className="reg-btn">
              Регистрация
            </button>
            <Link to="/">
              <button className="reg-btn">Отмена</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
