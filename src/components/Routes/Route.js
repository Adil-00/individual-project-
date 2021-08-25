import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Add from "../Admin/Add";
import Edit from "../Admin/Edit";
import AuthContexProvider from "../Auth/AuthContex";
import Login from "../Auth/Login";
import Registration from "../Auth/Registration";
import DishesContextProvider from "../context/DishesContext";
import UserOrderProvider from "../context/UserOrderContext";
import CreditCard from "../CreditCard/CreditCard";
import Detail from "../Detail/Detail";
import Footer from "../Footer/Footer";
import Home from "../Home/Home";
import LikedList from "../Liked/LikedList";
import Order from "../Order/Order";
import Payment from "../Payment/Payment";
import UserReceiptsList from "../UserReceipts/UserReceiptsList";
import DoneList from "../UsersOrders/DoneList/DoneList";
import UserOrdersList from "../UsersOrders/UserOrdersList/UserOrdersList";

const Routes = () => {
  return (
    <UserOrderProvider>
      <BrowserRouter>
        <DishesContextProvider>
          <AuthContexProvider>
            <Switch>
              <Route exact path="/userorder" component={UserOrdersList} />
              <Route exact path="/done" component={DoneList} />
              <Route exact path="/receipts" component={UserReceiptsList} />
              <Route exact path="/liked" component={LikedList} />
              <Route exact path="/payment" component={Payment} />
              <Route exact path="/creditcard" component={CreditCard} />
              <Route exact path="/order" component={Order} />
              <Route exact path="/add" component={Add} />
              <Route exact path="/edit" component={Edit} />
              <Route exact path="/" component={Home} />
              <Route exact path="/registration" component={Registration} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/detail" component={Detail} />
            </Switch>
            <Footer />
          </AuthContexProvider>
        </DishesContextProvider>
      </BrowserRouter>
    </UserOrderProvider>
  );
};

export default Routes;
