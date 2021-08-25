import React from "react";
import Title from "react-vanilla-tilt";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { useContext } from "react";
import { dishesContext } from "../context/DishesContext";
import { Link, useHistory } from "react-router-dom";
import { IconButton } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { authContex } from "../Auth/AuthContex";

const useStyles = makeStyles({
  root: {
    // maxWidth: "300px",
    width: "350px!important",
    boxShadow: "0 0 30px ",
    margin: "15px",
  },
  media: {
    height: "300px",
    width: "300px",
    backgroundSize: "contain!important",
    backgroundPosition: "center!important",
  },

  link: {
    textDecoration: "none",
    color: "black",
  },

  icon: {
    display: "flex",
    padding: "0",
    justifyContent: "center",
  },

  order: {
    textDecoration: "none",
    color: "black",
    fontSize: "18px",
  },
});

const Liked = ({ item }) => {
  const { handleDeleteDishes, handleEditDishes, handleDeatial, handleOrder } =
    useContext(dishesContext);
  const { handleFavorite, handleCheckFavorite } = useContext(authContex);
  const history = useHistory();
  const classes = useStyles();

  return (
    <div>
      <Title className={classes.root}>
        <Link className={classes.link} to="/detail">
          <CardActionArea onClick={() => handleDeatial(item.id)}>
            <div
              className={classes.media}
              style={{ background: `url(${item.image}) no-repeat` }}
            ></div>
            <CardContent>
              <div>
                <Typography gutterBottom variant="h5" component="h2">
                  Название :{item.title}
                </Typography>
              </div>
              <div>
                <Typography variant="body2" color="textSecondary" component="p">
                  Цена :{item.price}сом
                </Typography>
              </div>
            </CardContent>
          </CardActionArea>
        </Link>
        <CardActions className={classes.icon}>
          <IconButton>
            <Link
              to="/order"
              onClick={() => handleOrder(item.id)}
              className={classes.order}
            >
              Заказать
            </Link>
          </IconButton>
          <IconButton
            color={handleCheckFavorite(item.id) ? "secondary" : "primary"}
            onClick={() => handleFavorite(item.id)}
          >
            <FavoriteIcon />
          </IconButton>
        </CardActions>
      </Title>
    </div>
  );
};

export default Liked;
