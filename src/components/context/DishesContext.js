import axios from "axios";
import React, { useContext, useEffect, useReducer } from "react";
import { authContex } from "../Auth/AuthContex";
import { API } from "../Helpers/constans";
import { v4 as uuidv4 } from "uuid";
export const dishesContext = React.createContext();

const INIT_STATE = {
  dishes: [],
  editDishes: [],
  pagination: 1,
  detail: [],
  order: [],
  like: [],
  guest: null,
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "GET_DISHES":
      return {
        ...state,
        dishes: action.payload.data,
        pagination: Math.ceil(action.payload.headers["x-total-count"] / 1),
      };
    case "GET_EDIT_DISHES":
      return { ...state, editDishes: action.payload };
    case "GET_DETAIL_DISHES":
      return { ...state, detail: action.payload };
    case "GET_ORDER_DISHES":
      return { ...state, order: action.payload };
    case "GET_LIKE_DISHES":
      return { ...state, like: action.payload };
    case "GUEST":
      return { ...state, guest: action.payload };
    default:
      return state;
  }
};
const DishesContextProvider = ({ children }) => {
  const [state, dispach] = useReducer(reducer, INIT_STATE);

  const handleGetDishes = async (history) => {
    const search = new URLSearchParams(history.location.search);
    search.set("_limit", 1);
    history.push(`${history.location.pathname}?${search.toString()}`);

    let data = await axios(`${API}/dishes${window.location.search}`);

    dispach({
      type: "GET_DISHES",
      payload: data,
    });
  };

  const handlePostDishes = async (obj, history) => {
    await axios.post(`${API}/dishes`, obj);

    handleGetDishes(history);
  };

  const handleEditDishes = async (id) => {
    let { data } = await axios(`${API}/dishes/${id}`);

    dispach({
      type: "GET_EDIT_DISHES",
      payload: data,
    });
  };

  const handleSaveEditDishes = async (newObj, id, history) => {
    await axios.patch(`${API}/dishes/${id}`, newObj);

    handleGetDishes(history);
  };

  const handleDeleteDishes = async (id, history) => {
    await axios.delete(`${API}/dishes/${id}`);

    handleGetDishes(history);
  };

  const handleDeatial = async (id, history, user) => {
    const { data } = await axios(`${API}/dishes/${id}`);

    if (user.length > 0) {
      let newArr1 = data.views.filter((item) => item.id === user[0].id);

      if (newArr1.length > 0) {
      } else {
        data.views.push({ id: user[0].id });
        handleSaveEditDishes(data, id, history);
      }
    } else {
      let newArr3 = data.views.filter((item) => item.id === state.guest.id);

      if (newArr3.length > 0) {
      } else {
        data.views.push({ id: state.guest.id });
        handleSaveEditDishes(data, id, history);
      }
    }

    dispach({
      type: "GET_DETAIL_DISHES",
      payload: data,
    });
  };

  const getGuest = () => {
    if (!localStorage.getItem("guest")) {
      localStorage.setItem("guest", JSON.stringify({ id: uuidv4() }));
    }

    dispach({
      type: "GUEST",
      payload: JSON.parse(localStorage.getItem("guest")),
    });
  };

  console.log(state.detail);

  const handleOrder = async (id) => {
    const { data } = await axios(`${API}/dishes/${id}`);

    dispach({
      type: "GET_ORDER_DISHES",
      payload: data,
    });
  };

  const handleLike = async (dishesId, userId, history) => {
    const { data } = await axios(`${API}/dishes/${dishesId}`);

    let newArr = data.like.filter((item) => item.id === userId);

    if (newArr.length > 0) {
      let newArr = data.like.filter((item) => item.id !== userId);

      data.like = newArr;

      handleSaveEditDishes(data, data.id, history);

      handleGetDishes(history);

      return;
    } else {
      const obj = {
        id: userId,
      };

      data.like.push(obj);

      handleSaveEditDishes(data, data.id, history);

      handleGetDishes(history);

      return;
    }
  };

  return (
    <dishesContext.Provider
      value={{
        dishes: state.dishes,
        editDishes: state.editDishes,
        pagination: state.pagination,
        detail: state.detail,
        order: state.order,
        like: state.like.length,
        handleGetDishes,
        handlePostDishes,
        handleEditDishes,
        handleSaveEditDishes,
        handleDeleteDishes,
        handleDeatial,
        handleOrder,
        handleLike,
        getGuest,
      }}
    >
      {children}
    </dishesContext.Provider>
  );
};

export default DishesContextProvider;
