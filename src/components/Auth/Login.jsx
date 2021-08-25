import React, { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { authContex } from "./AuthContex";
import "./login.css";
const Login = () => {
  const history = useHistory();
  const [inpValue, setInpValue] = useState("");
  const [flag, setFlag] = useState(true);
  const [errorLogin, setErrorLogin] = useState(false);
  const [emptinessLogin, setEmptinessLogin] = useState(false);
  const [emptinessPassord, setEmptinessPassord] = useState(false);
  const { handleGetUser, check, setEmailFlag, handleOut } =
    useContext(authContex);

  const handleInpValue = (e) => {
    let obj = {
      ...inpValue,
      [e.target.dataset.name]: e.target.value,
    };

    setInpValue(obj);
  };

  useEffect(() => {
    handleGetUser(inpValue);
  }, [inpValue]);

  const handleEntrance = () => {
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

    if (check) {
      setEmailFlag(true);
      history.goBack();
    } else {
      setFlag(check);
    }
  };

  return (
    <div className="login">
      <div className="container">
        <div className="login_form">
          {flag ? (
            <p className="login_title">Вход</p>
          ) : (
            <p className="login_title">Пользователь не найден</p>
          )}
          <div className="login_inp">
            <div className="log-inp">
              <input
                onChange={handleInpValue}
                value={inpValue.login}
                placeholder="Логин"
                data-name="login"
                className="log-inp2"
                type="email"
                autocomplete="off"
              />
            </div>
            {emptinessLogin ? (
              <p className="login_error_text">Поле не может быть пуста</p>
            ) : null}
            {errorLogin ? (
              <p className="login_error_text">Некорректный @Email</p>
            ) : null}
            <div className="log-inp">
              <input
                onChange={handleInpValue}
                value={inpValue.password}
                placeholder="Пароль"
                data-name="password"
                className="log-inp2"
                type="password"
                autocomplete="off"
              />
            </div>
            {emptinessPassord ? (
              <p className="login_error_text">Поле не может быть пуста</p>
            ) : null}
          </div>
          <div className="login_btn">
            <button onClick={handleEntrance} className="log-btn">
              Войти
            </button>
            <Link to="/">
              <button onClick={() => handleOut()} className="log-btn">
                Отмена
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
