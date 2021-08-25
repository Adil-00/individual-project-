import { Button, Typography } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import { Link, useHistory } from "react-router-dom";
import CreditCardTwoToneIcon from "@material-ui/icons/CreditCardTwoTone";
import "./CreditCard.css";
import { Alert } from "@material-ui/lab";
import { authContex } from "../Auth/AuthContex";
import { userOrderContext } from "../context/UserOrderContext";

const CreditCard = () => {
  const [focus, setFocus] = useState("");
  const [handler, setHandler] = useState(false);
  const { handleCheque } = useContext(authContex);
  const { handleUsersOrderPost } = useContext(userOrderContext);
  const history = useHistory();
  const [inpValue, setInpValue] = useState({
    number: "",
    cvc: "",
    expiry: "",
    name: "",
  });

  function handleInpValue(e) {
    if (e.target.name === "number") {
      if (e.target.value.toString().length > 16) {
        return;
      }
    }
    if (e.target.name === "cvc") {
      if (e.target.value.toString().length > 3) {
        return;
      }
    }
    if (e.target.name === "expiry") {
      if (e.target.value.toString().length > 4) {
        return;
      }
    }

    let obj = {
      ...inpValue,
      [e.target.name]: e.target.value,
    };
    setInpValue(obj);
  }

  useEffect(() => {
    handleValidInputs();
  }, [inpValue]);

  function handleValidInputs() {
    if (
      inpValue.number.length === 16 &&
      inpValue.cvc.length === 3 &&
      inpValue.expiry.length === 4 &&
      inpValue.name.length > 0
    ) {
      setHandler(true);
    } else {
      setHandler(false);
    }
  }

  const handlePayment = async () => {
    handleUsersOrderPost();

    if (localStorage.getItem("order")) {
      let data = await JSON.parse(localStorage.getItem("order"));

      handleCheque(data, data.id);
      history.push("/payment");
    } else {
      history.push("/payment");
    }
  };

  return (
    <div className="creditCard">
      <div className="container">
        <div className="creditCard_content">
          <div className="creditCard_content_row">
            <div className="creditCard_content_col">
              <Typography
                style={{
                  display: "flex",
                  justifyContent: "center",
                  color: "white",
                }}
                variant="h2"
                gutterBottom
              ></Typography>
              <Cards
                number={inpValue.number}
                name={inpValue.name}
                expiry={inpValue.expiry}
                cvc={inpValue.cvc}
                focused={focus}
              />
              <form className="credit-form">
                <div className="credit_inp_box">
                  <input
                    type="number"
                    name="number"
                    placeholder="Card Number"
                    value={inpValue.number}
                    maxLength="16"
                    onChange={handleInpValue}
                    onFocus={(e) => setFocus(e.target.name)}
                  />
                </div>
                <div className="credit_inp_box">
                  <input
                    type="text"
                    name="name"
                    placeholder="Card Holder Name"
                    value={inpValue.name}
                    onChange={handleInpValue}
                    onFocus={(e) => setFocus(e.target.name)}
                  />
                </div>
                <div className="credit_inp_box">
                  <input
                    type="tel"
                    name="expiry"
                    placeholder="MM/YY Expiry"
                    value={inpValue.expiry}
                    maxLength="4"
                    onChange={handleInpValue}
                    onFocus={(e) => setFocus(e.target.name)}
                  />
                </div>
                <div className="credit_inp_box">
                  <input
                    type="tel"
                    name="cvc"
                    placeholder="CVC"
                    value={inpValue.cvc}
                    maxLength="3"
                    onChange={handleInpValue}
                    onFocus={(e) => setFocus(e.target.name)}
                  />
                </div>
              </form>
              {handler ? (
                <div
                  onClick={handlePayment}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: "2vh",
                  }}
                >
                  <Button
                    endIcon={<CreditCardTwoToneIcon />}
                    variant="contained"
                    color="secondary"
                  >
                    Оплатить
                  </Button>
                </div>
              ) : (
                <div className="credit-form" style={{ marginBottom: "2vh" }}>
                  <Alert severity="error">Заполните все поля</Alert>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditCard;
