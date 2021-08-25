import React, { useEffect, useState } from "react";
import Title from "react-vanilla-tilt";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { useContext } from "react";
import { dishesContext } from "../context/DishesContext";
import { Link, useHistory } from "react-router-dom";
import { IconButton } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { authContex } from "../Auth/AuthContex";
import VisibilityIcon from "@material-ui/icons/Visibility";

const useStyles = makeStyles({
  root: {
    width: 345,
    boxShadow: "0 0 30px ",
    margin: "15px",
  },
  media: {
    height: "300px",
    // width: "340px",
    backgroundSize: "contain!important",
    backgroundPosition: "center!important",
  },
  structure: {
    height: "50px",
    overflow: "auto",
  },

  link: {
    textDecoration: "none",
    color: "black",
  },

  order: {
    textDecoration: "none",
    color: "black",
    fontSize: "18px",
  },

  icon: {
    display: "flex",
    justifyContent: "center",
  },

  span: { paddingRight: "5px" },
});

export default function DishesCard({ item }) {
  const {
    handleDeleteDishes,
    handleEditDishes,
    handleDeatial,
    handleOrder,
    handleLike,
  } = useContext(dishesContext);
  const { handleFavorite, handleCheckFavorite, ADMIN, user } =
    useContext(authContex);
  const classes = useStyles();
  const history = useHistory();
  const [flag, setFlag] = useState(false);

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
    console.log("yse");
  }, [user.length]);

  return (
    // <Card className={`${classes.root} card`}>
    <Title options={{ glare: true, "max-glare": 1 }}>
      <Link className={classes.link} to="/detail">
        <CardActionArea onClick={() => handleDeatial(item.id, history, user)}>
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
        {flag ? (
          <>
            <Link to="/edit">
              <Button
                onClick={() => handleEditDishes(item.id)}
                size="small"
                color="primary"
              >
                <EditIcon />
              </Button>
            </Link>
            <Button
              onClick={() => handleDeleteDishes(item.id, history)}
              size="small"
              color="primary"
            >
              <DeleteIcon />
            </Button>
          </>
        ) : (
          <>
            <IconButton>
              <span>{item.views.length > 0 ? item.views.length : null}</span>
              <VisibilityIcon />
            </IconButton>
            <IconButton>
              <Link
                to="/order"
                onClick={() => handleOrder(item.id)}
                className={classes.order}
              >
                Заказать
              </Link>
            </IconButton>
            {user.length > 0 ? (
              <IconButton
                color={handleCheckFavorite(item.id) ? "secondary" : "primary"}
                onClick={() => (
                  handleFavorite(item.id),
                  handleLike(item.id, user[0].id, history)
                )}
              >
                <span className={classes.span}>
                  {item.like.length > 0 ? item.like.length : null}
                </span>
                <FavoriteIcon />
              </IconButton>
            ) : (
              <IconButton color="primary">
                <span className={classes.span}>
                  {item.like.length > 0 ? item.like.length : null}
                </span>
                <FavoriteIcon />
              </IconButton>
            )}
          </>
        )}
      </CardActions>
    </Title>
    // </Card>
  );
}
