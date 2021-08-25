import axios from "axios";
import React, { useReducer } from "react";
import { API } from "../Helpers/constans";
export const userOrderContext = React.createContext();

const INIT_STATE = {
  userOrder: [],
  done: [],
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "GET_USER_ORDER":
      return { ...state, userOrder: action.payload };
    case "GET_DONE":
      return { ...state, done: action.payload };
    default:
      return state;
  }
};

const UserOrderProvider = ({ children }) => {
  const [state, dispach] = useReducer(reducer, INIT_STATE);

  const handleGetUserOrder = async () => {
    let { data } = await axios(`${API}/userOrder`);

    dispach({
      type: "GET_USER_ORDER",
      payload: data,
    });
  };

  const handleUsersOrderPost = async () => {
    let userOrder = JSON.parse(localStorage.getItem("userOrder"));

    await axios.post(`${API}/userOrder`, userOrder);

    handleGetUserOrder();
  };

  const handleUsersOrderDelete = async (id) => {
    await axios.delete(`${API}/userOrder/${id}`);

    handleGetUserOrder();
  };

  const handleGetDone = async () => {
    let { data } = await axios(`${API}/done`);

    dispach({
      type: "GET_DONE",
      payload: data,
    });
  };

  const handleDonePost = async (id) => {
    let { data } = await axios(`${API}/userOrder/${id}`);

    await axios.post(`${API}/done`, data);

    handleGetDone();

    handleUsersOrderDelete(id);
  };

  const handleDoneDelete = async (id) => {
    await axios.delete(`${API}/done/${id}`);

    handleGetDone();
  };

  return (
    <userOrderContext.Provider
      value={{
        userOrder: state.userOrder,
        done: state.done,
        handleGetUserOrder,
        handleUsersOrderPost,
        handleUsersOrderDelete,
        handleGetDone,
        handleDonePost,
        handleDoneDelete,
      }}
    >
      {children}
    </userOrderContext.Provider>
  );
};

export default UserOrderProvider;
