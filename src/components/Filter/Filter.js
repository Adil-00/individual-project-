import { IconButton, TextField } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import DishesList from "../DishesList/DishesList";
import { makeStyles } from "@material-ui/core/styles";
import NavigationPanel from "../NavigationPanel/NavigationPanel";
import SearchIcon from "@material-ui/icons/Search";
import "./Filter.css";
import { Link, useHistory } from "react-router-dom";
import { dishesContext } from "../context/DishesContext";
import AddIcon from "@material-ui/icons/Add";
import Header from "../Header/Header";
import { authContex } from "../Auth/AuthContex";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "25px",
  },
  box: {
    display: "flex",
    alignItems: "center",
    background: "rgb(0, 0, 0, 0.5)",
    borderRadius: "40px",
    padding: "10px",
  },

  add: {
    background: "rgb(0, 0, 0, 0.5)",
    border: "1px solid black",
    boxShadow: "0 0 50px white",
    margin: "25px",
    color: "white",
  },

  btn: {
    color: "white",
  },
}));

const Filter = () => {
  const classes = useStyles();
  const history = useHistory();
  const [value, setValue] = useState("");
  const [flag, setFlag] = useState(false);
  const { handleGetDishes } = useContext(dishesContext);
  const { user, ADMIN } = useContext(authContex);

  const handleSearch = (e) => {
    let search = new URLSearchParams(history.location.search);
    search.set("q", e.target.value);
    search.set("_page", 1);
    history.push(`${history.location.pathname}?${search.toString()}`);
    handleGetDishes(history);
    setValue(e.target.value);
  };

  useEffect(async () => {
    let search = new URLSearchParams(history.location.search);
    search.set("q", "");
    history.push(`${history.location.pathname}?${search.toString()}`);
    handleGetDishes(history);
  }, []);

  useEffect(() => {
    if (user.length > 0) {
      if (user[0].login === ADMIN) {
        setFlag(true);
      } else {
        setFlag(false);
      }
    } else {
      setFlag(false);
    }
  }, [user.length]);

  return (
    <>
      <Header />
      <NavigationPanel />
      <div className="filter">
        <div className={classes.root}>
          <div>
            {flag ? (
              <Link to="/add">
                <IconButton className={classes.add}>
                  <AddIcon />
                </IconButton>
              </Link>
            ) : null}
          </div>

          <div className={`${classes.box} box`}>
            <input
              value={value}
              onChange={handleSearch}
              className="inp"
              placeholder="Поиск"
            />
            <IconButton className={classes.btn}>
              <SearchIcon />
            </IconButton>
          </div>
        </div>
        <div className="container">
          <DishesList />
        </div>
      </div>
    </>
  );
};

export default Filter;
