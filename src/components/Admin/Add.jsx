import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Box, TextField } from "@material-ui/core";
import { useState } from "react";
import { useContext } from "react";
import { dishesContext } from "../context/DishesContext";
import { Link, useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
    backgroundSize: "cover!important",
    backgroundPosition: "center!important",
    margin: "0 auto",
    height: "100vh",
    justifyContent: "center",
    alignItems: "center",
  },

  paper: {
    width: "50%",
    height: "80%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  box: {
    width: "50vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  inp: {
    margin: "1vh",
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
  },
  btn: {
    width: "100%",
    display: "flex",
    justifyContent: "space-evenly",
  },

  btn2: {
    padding: "10px",
    marginTop: "30px",
    borderRadius: "15px",
    border: "1px solid black",
    backgroundColor: "#efe1d5",
    cursor: "pointer",
    boxShadow: "0 0 30px black",
  },
}));

export default function Add() {
  const classes = useStyles();
  const [inpvalue, setInpValue] = useState("");
  const history = useHistory();
  const { handlePostDishes } = useContext(dishesContext);

  const handleValueInp = (e) => {
    let obj = {
      ...inpvalue,
      [e.target.name]: e.target.value,
      commit: [],
      like: [],
    };

    setInpValue(obj);
  };

  return (
    <div
      style={{
        background:
          "url(https://kartinkin.com/uploads/posts/2021-07/1625485488_20-kartinkin-com-p-sushi-rolli-fon-krasivie-foni-20.jpg) no-repeat",
      }}
      className={classes.root}
    >
      <Paper className={classes.paper} variant="outlined">
        <Box className={classes.box}>
          <div className={classes.inp}>
            <span className={classes.span}>Название :</span>
            <TextField
              required
              id="standard-required"
              name="title"
              onChange={handleValueInp}
            />
          </div>
          <div className={classes.inp}>
            <span className={classes.span}>Категория :</span>
            <TextField
              required
              id="standard-required"
              name="category"
              onChange={handleValueInp}
            />
          </div>
          <div className={classes.inp}>
            <span className={classes.span}>Вес :</span>
            <TextField
              type="number"
              required
              id="standard-required"
              name="weight"
              onChange={handleValueInp}
            />
          </div>
          <div className={classes.inp}>
            <span className={classes.span}>Цена :</span>
            <TextField
              type="number"
              required
              id="standard-required"
              name="price"
              onChange={handleValueInp}
            />
          </div>
          <div className={classes.inp}>
            <span className={classes.span}>Каллорий :</span>
            <TextField
              type="number"
              required
              id="standard-required"
              name="calories"
              onChange={handleValueInp}
            />
          </div>
          <div className={classes.inp}>
            <span className={classes.span}>Состав :</span>
            <TextField
              required
              id="standard-required"
              name="structure"
              onChange={handleValueInp}
            />
          </div>
          <div className={classes.inp}>
            <span className={classes.span}>Фото :</span>
            <TextField
              required
              id="standard-required"
              name="image"
              onChange={handleValueInp}
            />
          </div>

          <div className={classes.btn}>
            <Link to="/">
              <button
                className={classes.btn2}
                onClick={() => handlePostDishes(inpvalue, history)}
              >
                Добавить
              </button>
            </Link>
            <Link to="/">
              <button className={classes.btn2}>Отменить</button>
            </Link>
          </div>
        </Box>
      </Paper>
    </div>
  );
}
