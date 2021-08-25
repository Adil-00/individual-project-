import React, { useContext } from "react";
import { authContex } from "../Auth/AuthContex";
import Filter from "../Filter/Filter";
import UserOrdersList from "../UsersOrders/UserOrdersList/UserOrdersList";
import "./Home.css";
const Home = () => {
  const { user, PERSONAL } = useContext(authContex);

  return (
    <>
      {user.length > 0 ? (
        user[0].login === PERSONAL ? (
          <UserOrdersList />
        ) : (
          <Filter />
        )
      ) : (
        <Filter />
      )}
    </>
  );
};

export default Home;
