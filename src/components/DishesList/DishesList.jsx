import React from "react";
import { useContext } from "react";
import { dishesContext } from "../context/DishesContext";
import DishesCard from "../DishesCard/DishesCard";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";
import "./DishesList.css";
import { useState } from "react";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
    width: "80vw",
    height: "100vh",
    justifyContent: "center",
    alignItems: "center",
  },
  pagination: {
    "& > *": {
      marginTop: theme.spacing(2),
    },
    display: "flex",
    justifyContent: "center",
    paddingBottom: "10px",
  },
  DishesList: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  },
}));

const DishesList = () => {
  const { dishes, handleGetDishes, pagination } = useContext(dishesContext);
  const classes = useStyles();
  const history = useHistory();
  const [page, setPage] = useState(getPage());
  const params = useParams();
  useEffect(() => {
    handleGetDishes(history);
  }, []);

  useEffect(() => {
    setPage(getPage());
  }, [params]);
  function getPage(e, page) {
    const search = new URLSearchParams(history.location.search);
    if (!search.get("_page")) {
      return 1;
    }
    return search.get("_page");
  }

  const handlePage = (e, pageVal) => {
    const search = new URLSearchParams(history.location.search);
    search.set("_page", pageVal);
    history.push(`${history.location.pathname}?${search.toString()}`);
    handleGetDishes(history);
    setPage(pageVal);
  };

  return (
    <>
      <div className={classes.DishesList}>
        {dishes.length > 0 ? (
          dishes.map((item, id) => <DishesCard item={item} key={id} />)
        ) : (
          <div className={classes.root}>
            <CircularProgress />
          </div>
        )}
      </div>
      <div className={classes.pagination}>
        <Pagination
          page={+page}
          onChange={handlePage}
          count={pagination}
          variant="outlined"
          color="primary"
        />
      </div>
    </>
  );
};

export default DishesList;
