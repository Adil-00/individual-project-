import { React, useEffect } from "react";
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

const Edit = () => {
  const { editDishes, handleSaveEditDishes } = useContext(dishesContext);
  const classes = useStyles();
  const [inpvalue, setInpValue] = useState("");
  const history = useHistory();

  useEffect(() => {
    setInpValue(editDishes);
  }, [editDishes]);

  const handleValueInp = (e) => {
    let obj = {
      ...inpvalue,
      [e.target.name]: e.target.value,
    };

    setInpValue(obj);
  };

  console.log(inpvalue);
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
              value={inpvalue.title}
              required
              id="standard-required"
              name="title"
              onChange={handleValueInp}
            />
          </div>
          <div className={classes.inp}>
            <span className={classes.span}>Категория :</span>
            <TextField
              value={inpvalue.category}
              required
              id="standard-required"
              name="category"
              onChange={handleValueInp}
            />
          </div>
          <div className={classes.inp}>
            <span className={classes.span}>Вес :</span>
            <TextField
              value={inpvalue.weight}
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
              value={inpvalue.price}
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
              value={inpvalue.calories}
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
              value={inpvalue.structure}
              required
              id="standard-required"
              name="structure"
              onChange={handleValueInp}
            />
          </div>
          <div className={classes.inp}>
            <span className={classes.span}>Фото :</span>
            <TextField
              value={inpvalue.image}
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
                onClick={() =>
                  handleSaveEditDishes(inpvalue, inpvalue.id, history)
                }
              >
                Изменить
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
};

export default Edit;
