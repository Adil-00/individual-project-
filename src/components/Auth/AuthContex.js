import axios from "axios";
import React, { useEffect, useReducer, useState } from "react";
import { ADMIN, API, PERSONAL } from "../Helpers/constans";
export const authContex = React.createContext();
const INIT_STATE = {
  user: [],
  check: false,
  ADMIN: ADMIN,
  PERSONAL: PERSONAL,
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "GET_USER":
      return { ...state, user: action.payload, check: true };
    case "OUT_USER":
      return { ...state, user: action.payload, check: false };
    default:
      return state;
  }
};

const AuthContexProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);
  const [emailFlag, setEmailFlag] = useState(false);

  useEffect(() => {
    if (state.user.length > 0) {
      setEmailFlag(true);
    } else {
      setEmailFlag(false);
    }
  }, [state.user]);

  const handleGetUser = async (user) => {
    const { data } = await axios(`${API}/users`);
    if (!user) {
      return;
    }

    let newData = data.filter((item) => {
      if (item.login === user.login && item.password === user.password) {
        return item;
      }
    });

    if (newData.length > 0) {
      localStorage.setItem("user", JSON.stringify(newData));
      dispatch({
        type: "GET_USER",
        payload: newData,
      });
    } else {
      return;
    }
  };

  console.log(state.user);

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("user"))) {
      localStorage.setItem("user", JSON.stringify([]));
    } else {
      const data = JSON.parse(localStorage.getItem("user"));
      dispatch({
        type: "GET_USER",
        payload: data,
      });
    }
  }, []);

  const handleCheck = async (user) => {
    const { data } = await axios(`${API}/users`);

    let newArr = data.filter((item) => item.login === user.login);

    if (newArr.length > 0) {
      return true;
    } else {
      handlePostUser(user);
      return false;
    }
  };

  const handlePostUser = async (user) => {
    await axios.post(`${API}/users`, user);

    handleGetUser(user);
  };

  const handleOut = () => {
    dispatch({
      type: "OUT_USER",
      payload: [],
    });
    localStorage.clear();
  };

  const handleCheque = async (cheque, id) => {
    let { data } = await axios(`${API}/users/${id}`);

    let obj = {
      ...cheque,
      id: cheque.id + Date.now(),
    };

    data.cheque.push(obj);

    await axios.patch(`${API}/users/${id}`, data);

    handleOut();
    handleGetUser(data);
  };

  const handleFavorite = async (id) => {
    const dishes = await axios(`${API}/dishes/${id}`);

    let newArr = state.user[0].favorite.filter((item) => item.id === id);

    if (newArr.length > 0) {
      state.user[0].favorite = state.user[0].favorite.filter(
        (item) => item.id !== id
      );

      await axios.patch(`${API}/users/${state.user[0].id}`, state.user[0]);

      const { data } = await axios(`${API}/users/${state.user[0].id}`);

      handleGetUser(data);
      console.log("товар удален из избранных");
      return;
    } else {
      state.user[0].favorite.push(dishes.data);

      await axios.patch(`${API}/users/${state.user[0].id}`, state.user[0]);

      const { data } = await axios(`${API}/users/${state.user[0].id}`);

      handleGetUser(data);
      console.log("товар добавлен в избранные");
      return;
    }
  };

  const handleCheckFavorite = (id) => {
    if (state.user.length > 0) {
      let newArr = state.user[0].favorite.filter((item) => item.id === id);

      return newArr.length > 0 ? true : false;
    }
  };

  const handleDeleteReceipts = async (id) => {
    let newArr = state.user[0].cheque.filter((item) => item.id !== id);

    state.user[0].cheque = newArr;

    await axios.patch(`${API}/users/${state.user[0].id}`, state.user[0]);

    const { data } = await axios(`${API}/users/${state.user[0].id}`);

    handleGetUser(data);
  };

  return (
    <authContex.Provider
      value={{
        user: state.user,
        check: state.check,
        emailFlag: emailFlag,
        ADMIN: state.ADMIN,
        PERSONAL: state.PERSONAL,
        setEmailFlag: setEmailFlag,
        handleGetUser,
        handlePostUser,
        handleOut,
        handleCheck,
        handleCheque,
        handleFavorite,
        handleCheckFavorite,
        handleDeleteReceipts,
      }}
    >
      {children}
    </authContex.Provider>
  );
};

export default AuthContexProvider;
